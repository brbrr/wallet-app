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
import { getAccountById, getCurrencyById, getRecordById } from '../selectors/index.js';

export function getRecordAmountWithCurrency( { currencyId, amount, typeId }, currencies ) {
	const currency = currencies[ currencyId ];
	switch ( typeId ) {
		case 0:
			return `-${ currency.code }${ amount }`;
		default:
			return `${ currency.code }${ amount }`;
	}
}

export function getRecordAmount( { amount, typeId } ) {
	switch ( typeId ) {
		case 0:
			return c( -1 ).multiply( amount );
		default:
			return amount;
	}
}

// TODO: Set a expected currency, e.g. in which to convert
export function getTotalSpent( records ) {
	const state = store.getState();

	return records.reduce( ( acc, record ) => {
		const account = getAccountById( state, record.accountId );
		// const toCurrency = getCurrencyById( state, recordAccount.currencyId );
		// const fromCurrency = getCurrencyById( state, record.currencyId );

		// const amount = convertAmount( record.amount, { from: fromCurrency.code, to: toCurrency.code } );
		// const amount = convertAmount( record.amount, { from: fromCurrency.code, to: 'UAH' } );
		// const amount = convertRecordAmountToAccountCurrency( state, record );
		let amount = record.amount;
		if ( account.currencyId !== record.currencyId ) {
			amount = convertRecordAmountToAccountCurrency( state, record );
		}
		return acc.add( amount );
	}, c( 0 ) ).value;
}

function convertAmount( amount, { from = 'USD', to = 'EUR' } = {} ) {
	fx.base = data.base;
	fx.rates = data.rates;
	return fx.convert( amount, { from, to } );
}

function convertRecordAmountToAccountCurrency( state, record ) {
	const account = getAccountById( state, record.accountId );
	const toCurrency = getCurrencyById( state, account.currencyId );
	const fromCurrency = getCurrencyById( state, record.currencyId );
	console.log( record.amount, { from: fromCurrency.code, to: toCurrency.code } );

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
 * @return {string} string representation of update account balance
 */
export function getUpdatedAccountBalance( state, record ) {
	// currencies not match, need to convert
	let recordAmount = record.amount;
	const account = getAccountById( state, record.accountId );

	const isExistingRecord = !! record.id;

	/**
	 * 1. initialBalance + converted(-22) = 10
	 * 2. initialBalance = 10 - converted(-22)
	 * 3. initialBalance + converted(53.2) = X
	 */

	if ( isExistingRecord ) {
		const existingRecord = getRecordById( state, record.id );
		let existingRecordAmount = existingRecord.amount;

		// If record currency differs from account currency
		if (
			(
				( record.currencyId === existingRecord.currencyId ) &&
				( account.currencyId !== record.currencyId )
			) ||
			( record.currencyId !== existingRecord.currencyId )
		) {
			existingRecordAmount = convertRecordAmountToAccountCurrency( state, existingRecord );
		}

		account.balance = c( account.balance ).subtract( getRecordAmount( { amount: existingRecordAmount, typeId: existingRecord.typeId } ) );
		/**
		 * Er: -23; new r: -34; initial balance: 12
		 * 1: 12 + (-23) = -11
		 * 2: -11 - ( -23 ) = 12
		 * 3: 12 + ( - 34 ) = - 22
		 */
	}

	if ( account.currencyId !== record.currencyId ) {
		recordAmount = convertRecordAmountToAccountCurrency( state, record );
	}
	recordAmount = getRecordAmount( { amount: recordAmount, typeId: record.typeId } );
	return c( account.balance ).add( recordAmount );
}
