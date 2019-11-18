/**
 * External dependencies
 */
import fx from 'money';
import c from 'currency.js';
import _ from 'lodash';

/**
 * Internal dependencies
 */
import data from './conversion-rates.js';
// import getStore from './create-store';
import { getAccountById, getCurrencyById, getRecordById, getDefaultAccount } from '../selectors/index.js';
import { EXPENSE, INCOME, TRANSFER } from '../constants/Records.js';

// const { store } = getStore();

export function getAmountAsString( { amountInAccountCurrency, typeId } ) {
	return getAmountSign( typeId ) + amountInAccountCurrency.toString();
}

export function getAmountSign( typeId ) {
	switch ( typeId ) {
		case EXPENSE:
			return '-';
		case INCOME:
			return '+';
		case TRANSFER:
			return '';
		default:
			throw	new Error( 'typeID does not exist' );
	}
}

export function getRecordAmountWithCurrency( { amount, currencyId, typeId }, currencies ) {
	const currency = currencies[ currencyId ];
	return `${ getAmountSign( typeId ) + amount.toString() } ${ currency.code }`;
}

export function getRecordAmount( record ) {
	return c( getAmountAsString( record ) );
}

// TODO: Set a expected currency, e.g. in which to convert
// Now it's just a sum of all `amountInAccountCurrency`, instead we should convert them into some base currency
export function getTotalSpent( records ) {
	// console.log( 'getTotalSpent' );

	return records.reduce( ( acc, record ) => {
		const amount = getRecordAmount( record );
		return acc.add( amount );
	}, c( 0 ) ).value;
}

/**
 * Calculates the total sum of of records in specified currency
 * Useful when need to figure out intermediate sum, e.g. for daily expense.
 *
 * @param {Object} state redux state
 * @param {Array} records Records array
 * @param {number} currencyId currency id
 * @return {number} sum of provided records balances in specified currency
 */
export function getTotalSpentInCurrency( state, records, currencyId ) {
	const toCurrency = getCurrencyById( state, currencyId );

	return records.reduce( ( acc, record ) => {
		const amount = record.amountInAccountCurrency;
		const fromCurrency = getCurrencyById( state, record.currencyId );
		const convertedAmount = convertAmount( amount, { from: fromCurrency.code, to: toCurrency.code } );
		return acc.add( convertedAmount );
	}, c( 0 ) ).value;
}

/**
 * Calculates the total sum of accounts in default account currency
 *
 * @param {Object} state redux state
 * @param {Object} accounts object of accounts indexed by their id
 *
 * @return {number} total sum of accounts in default currency
 */
export function getAccountsTotalsInCurrency( state, accounts ) {
	const defaultAccount = getDefaultAccount( state );
	const defaultCurrency = getCurrencyById( state, defaultAccount.currencyId );

	return Object.values( accounts ).reduce( ( acc, account ) => {
		const balance = account.balance;
		const fromCurrency = getCurrencyById( state, account.currencyId );
		const convertedAmount = convertAmount( balance, { from: fromCurrency.code, to: defaultCurrency.code } );

		return acc.add( convertedAmount );
	}, c( 0 ) ).value;
}

function convertAmount( amount, { from = 'USD', to = 'EUR' } = {} ) {
	fx.base = data.base;
	fx.rates = data.rates;

	const convertedAmount = fx.convert( amount, { from, to } );
	console.log( `Converting ${ amount } ${ from }, to: ${ to }: ${ convertedAmount }` );
	return convertedAmount;
}

/**
 * Converts record amount into record's account currency
	* @param {Object} state Redux state, or part of it which should include accounts, currencies and records
	* @param {Object} record Record object from redux state
	* @return {number} converted amount
 */
export function convertRecordAmountToAccountCurrency( state, record ) {
	const account = getAccountById( state, record.accountId );
	const toCurrency = getCurrencyById( state, account.currencyId );
	const fromCurrency = getCurrencyById( state, record.currencyId );
	if ( toCurrency === fromCurrency ) {
		return record.amount;
	}

	// TODO: BUG: base currency affects same currency conversion. Maybe just skip conversion?
	return convertAmount( record.amount, { from: fromCurrency.code, to: toCurrency.code } );
}

/**
 * Calculate an amount on which account balance should be updated.
 * There are few cases such as:
 * - new expense - when balance get decreased
 * - updated expense - when balance get updated with positive or negative diff amount
 * - new/updated income - when balance get increased
 * - maybe some other cases?
 *
 * @param {Object} state Redux state
 * @param {Object} record record object from Redux state
 *
 * @return {Object} Object map where keys are account id's and values are updated account balances
 */
export function getAccountsUpdateDirective( state, record ) {
	if ( ! record.amountInAccountCurrency ) {
		throw new Error( 'Record object does not include `amountInAccountCurrency` property' );
	}
	const isTransfer = !! record.toAccountId;

	if ( isTransfer ) {
		return getAccountBalanceDirectiveForTransfer( state, record );
	}

	const isExistingRecord = !! record.id;
	if ( isExistingRecord ) {
		return getAccountsUpdateDirectiveForUpdatedRecord( state, record );
	}

	return getAccountsUpdateDirectiveForNewRecord( state, record );
}

function getAccountsUpdateDirectiveForNewRecord( state, record ) {
	const account = getAccountById( state, record.accountId );
	let recordAmount = getRecordAmount( record );

	if ( record.typeId === TRANSFER ) {
		recordAmount = c( -1 ).multiply( recordAmount );
	}

	return { [ account.id ]: c( account.balance ).add( recordAmount ).value };
}

function getAccountsUpdateDirectiveForUpdatedRecord( state, record ) {
	const account = getAccountById( state, record.accountId );

	const existingRecord = getRecordById( state, record.id );
	const existingAccount = getAccountById( state, existingRecord.accountId );

	const existingRecordAmount = getRecordAmount( existingRecord );
	const recordAmount = getRecordAmount( record );

	let accountBalance = c( account.balance );
	// Return value for redux update action(s)
	const directive = {};
	// If accounts changed, we would need to subtract from the _old_ account
	if ( ! isEqualAccounts( record, existingRecord ) ) {
		const fromAccountBalance = c( existingAccount.balance ).subtract( existingRecordAmount );

		directive[ existingRecord.accountId ] = fromAccountBalance.value;
	} else {
		accountBalance = c( accountBalance ).subtract( existingRecordAmount );
	}

	directive[ account.id ] = c( accountBalance ).add( recordAmount ).value;

	return directive;
}

function getAccountBalanceDirectiveForTransfer( state, record ) {
	// const recordAmount = record.amount;
	const toAccount = getAccountById( state, record.toAccountId );

	// It's an "Out of Wallet" id, which means we should just deduct the amount from the "from" account
	if ( toAccount.id === state.accounts.serviceAccountId ) {
		console.log( 'XXXX', getAccountsUpdateDirectiveForNewRecord( state, record ) );

		return getAccountsUpdateDirectiveForNewRecord( state, record );
	}

	const fromAccount = getAccountById( state, record.accountId );

	// record amount in fromAccount currency
	const recordAmountInFromAccount = convertRecordAmountToAccountCurrency( state, record );
	// record amount in toAccount currency
	const recordAmountInToAccount = convertRecordAmountToAccountCurrency( state, Object.assign( {}, record, { accountId: record.toAccountId } ) );

	return {
		[ fromAccount.id ]: c( fromAccount.balance ).subtract( recordAmountInFromAccount ).value,
		[ toAccount.id ]: c( toAccount.balance ).add( recordAmountInToAccount ).value,
	};
}

export function getUpdatedAccountBalanceAfterDeletedRecord( state, recordId ) {
	const record = getRecordById( state, recordId );
	const account = getAccountById( state, record.accountId );

	const recordAmount = getRecordAmount( record );
	const accountBalance = c( account.balance );

	return accountBalance.subtract( recordAmount ).value;
}

function isEqualAccounts( firstRecord, secondRecord ) {
	return firstRecord.accountId === secondRecord.accountId;
}

export function getTxUpdateDirective( state, record ) {
	if ( ! record.amountInAccountCurrency ) {
		throw new Error( 'Record object does not include `amountInAccountCurrency` property' );
	}

	const isTransfer = !! record.toAccountId;
	const isExistingRecord = !! record.id;
	const directives = [];

	if ( isExistingRecord ) {
		const existingRecord = getRecordById( state, record.id );
		const revertDirective = getTxRevertDirective( state, existingRecord );
		directives.push( revertDirective );
	}

	if ( isTransfer ) {
		const toTransferDirective = getTxDirectiveForTransfer( state, record );
		directives.push( toTransferDirective );
	} else {
		const newTxDirective = getNewTxDirective( record );
		directives.push( newTxDirective );
	}

	return consolidateDirectives( directives );
}

function getNewTxDirective( record ) {
	// correct TX sign is handled by `getRecordAmount`
	const recordAmount = getRecordAmount( record );
	return { [ record.accountId ]: recordAmount };
}

/**
 * The result should be directive which commands how to revert passed record
 * EXPENSE: we should add back
 * INCOME: we should substract
 * TRANSFER: we should update 2 accounts
 * @param {Object} state
 * @param {Object} record
 *
 * @return {Object} directive
 */
function getTxRevertDirective( state, record ) {
	const isNewRecord = ! record.id;
	const isTransfer = !! record.toAccountId;

	if ( isNewRecord ) {
		return null;
	}

	if ( isTransfer ) {
		// const hackyRecord = Object.assign( {}, record, { accountId: record.toAccountId } );
		// const toAccountRecordAmount = c( -1 ).multiply( convertRecordAmountToAccountCurrency( state, hackyRecord ) );
		// const f = getTxDirectiveForTransfer( state, record, -1 );

		// const d = {
		// 	[ record.accountId ]: recordAmount,
		// 	[ record.toAccountId ]: toAccountRecordAmount,
		// };

		return getTxDirectiveForTransfer( state, record, -1 );
	}

	const recordAmount = getRecordAmount( record );
	return { [ record.accountId ]: c( -1 ).multiply( recordAmount ) };
}

function getTxDirectiveForTransfer( state, record, sign = 1 ) {
	if ( record.accountId === record.toAccountId ) {
		throw new InvalidTransactionError( 'From account and to account are the same' );
	}
	const directive = {};

	// fromAccount
	const newTxDirective = c( -1 ).multiply( sign ).multiply( getRecordAmount( record ) );
	directive[ record.accountId ] = newTxDirective;

	// toAccount
	if ( record.toAccountId !== -99 ) {
	//FIXME: This is a hacky way to force `convertRecordAmountToAccountCurrency` to use `toAccountId` for amount calculations.
		const hackyRecord = Object.assign( {}, record, { accountId: record.toAccountId } );
		const recordAmount = c( convertRecordAmountToAccountCurrency( state, hackyRecord ) );
		directive[ record.toAccountId ] = c( sign ).multiply( recordAmount );
	}

	return directive;
}

function consolidateDirectives( directivesArray ) {
	console.log( 'consolidateDirectives: ', JSON.stringify( directivesArray ) );

	return _.mergeWith( ...directivesArray, ( objValue, srcValue ) => objValue ? objValue.add( srcValue ) : srcValue );
}

export class InvalidTransactionError extends Error {
	constructor( message ) {
		super( message );
		// Ensure the name of this error is the same as the class name
		this.name = this.constructor.name;
		// This clips the constructor invocation from the stack trace.
		// It's not absolutely essential, but it does make the stack trace a little nicer.
		//  @see Node.js reference (bottom)
		Error.captureStackTrace( this, this.constructor );
	}
}
