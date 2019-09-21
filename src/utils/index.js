/**
 * External dependencies
 */
import fx from 'money';
import c from 'currency.js';

/**
 * Internal dependencies
 */
import data from './conversion-rates.js';
import store from './create-store';
import { getAccountById, getCurrencyById, getRecordById, getDefaultAccount } from '../selectors/index.js';

export function getRecordAmountWithCurrency( { currencyId, amount, typeId }, currencies ) {
	const currency = currencies[ currencyId ];
	switch ( typeId ) {
		case 0:
			return `-${ amount } ${ currency.code }`;
		default:
			return `${ amount } ${ currency.code }`;
	}
}

export function getRecordAmount( { amount, typeId } ) {
	switch ( typeId ) {
		case 0:
			return c( -1 ).multiply( Math.abs( amount ) );
		default:
			return amount;
	}
}

// TODO: Set a expected currency, e.g. in which to convert
// Now it's just a sum of all `amountInAccountCurrency`, instead we should convert them into some base currency
export function getTotalSpent( records ) {
	// console.log( 'getTotalSpent' );

	return records.reduce( ( acc, record ) => {
		const amount = record.amountInAccountCurrency;
		return acc.add( amount );
	}, c( 0 ) ).value;
}

/**
 * Calculates the total sum of of records in specified currency
 * Useful when need to figure out intermediate sum, e.g. for daily expense.
 *
 * @param {Array} records Records array
 * @param {number} currencyId currency id
 * @return {number} sum of provided records balances in specified currency
 */
export function getTotalSpentInCurrency( records, currencyId ) {
	const state = store.getState();
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
 * @param {Object} accounts object of accounts indexed by their id
 * @return {number} total sum of accounts in default currency
 */
export function getAccountsTotalsInCurrency( accounts ) {
	const state = store.getState();
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
	const isExistingRecord = !! record.id;

	if ( isExistingRecord ) {
		return getAccountsUpdateDirectiveForUpdatedRecord( state, record );
	}

	return getAccountsUpdateDirectiveForNewRecord( state, record );
}

function getAccountsUpdateDirectiveForNewRecord( state, record ) {
	let recordAmount = record.amount;
	const account = getAccountById( state, record.accountId );

	if ( ! isEqualCurrencies( account, record ) ) {
		recordAmount = convertRecordAmountToAccountCurrency( state, record );
	}
	recordAmount = getRecordAmount( { amount: recordAmount, typeId: record.typeId } );

	return { [ account.id ]: c( account.balance ).add( recordAmount ).value };
}

function getAccountsUpdateDirectiveForUpdatedRecord( state, record ) {
	const account = getAccountById( state, record.accountId );

	const existingRecord = getRecordById( state, record.id );
	const existingAccount = getAccountById( state, existingRecord.accountId );

	const existingRecordAmount = getRecordAmount( { amount: existingRecord.amountInAccountCurrency, typeId: existingRecord.typeId } );
	const recordAmount = getRecordAmount( { amount: record.amountInAccountCurrency, typeId: record.typeId } );

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

export function getUpdatedAccountBalanceAfterDeletedRecord( state, recordId ) {
	const record = getRecordById( state, recordId );
	const account = getAccountById( state, record.accountId );

	const recordAmount = getRecordAmount( { amount: record.amountInAccountCurrency, typeId: record.typeId } );
	const accountBalance = c( account.balance );

	return accountBalance.subtract( recordAmount ).value;
}

function isEqualAccounts( firstRecord, secondRecord ) {
	return firstRecord.accountId === secondRecord.accountId;
}

function isEqualCurrencies( firstObj, secondObj ) {
	return firstObj.currencyId === secondObj.currencyId;
}
