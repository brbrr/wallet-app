/**
 * External dependencies
 */
import fx from 'money';

/**
 * Internal dependencies
 */
import data from './conversion-rates.js';
import store from './createStore';
import { getAccountById, getCurrencyById } from '../selectors/index.js';

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
			return -1 * amount;
		default:
			return amount;
	}
}

export function getTotalSpent( records ) {
	fx.base = data.base;
	fx.rates = data.rates;
	// {
	// 	EUR: 0.745101, // eg. 1 USD === 0.745101 EUR
	// 	GBP: 0.647710, // etc...
	// 	HKD: 7.781919,
	// 	USD: 1, // always include the base rate (1:1)

	// /* etc */
	// };

	// fx.convert( 12.99, { from: 'GBP', to: 'HKD' } );

	console.log( records[ 1 ] );

	console.log( '######' );
	console.log( Object.keys( store ).length );
	const state = store.getState();

	// console.log( state );

	return records.reduce( ( acc, record ) => {
		const recordAccount = getAccountById( state, record.accountId );
		const toCurrency = getCurrencyById( state, recordAccount.currencyId );
		const fromCurrency = getCurrencyById( state, record.currencyId );

		// const amount = convertAmount( record.amount, { from: fromCurrency.code, to: toCurrency.code } );
		const amount = convertAmount( record.amount, { from: fromCurrency.code, to: 'UAH' } );
		return acc += amount;
	}, 0 ).toFixed( 2 );
}

function convertAmount( amount, { from = 'USD', to = 'EUR' } = {} ) {
	fx.base = data.base;
	fx.rates = data.rates;
	return fx.convert( amount, { from, to } );
}

export function getTotalSpent2( records ) {
	fx.base = data.base;
	fx.rates = data.rates;
	fx.convert( 12.99, { from: 'GBP', to: 'HKD' } );

	return records.reduce( ( acc, record ) => acc += getRecordAmount( record ), 0 );
}
