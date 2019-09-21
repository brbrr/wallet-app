/**
 * External dependencies
 */
import fx from 'money';
import c from 'currency.js';

/**
 * Internal dependencies
 */
import { getAccountsUpdateDirective } from '..';
import data from '../conversion-rates';
import { getRecordById, getAccountById, getCurrencyById } from '../../selectors';
fx.base = data.base;
fx.rates = data.rates;
let state;

describe( 'Currency utils', () => {
	beforeEach( () => {
		state = {
			records: {
				byId: {
					1: {
						id: 1,
						amount: 22, // UAH in USD account > ~ 0.81 USD
						amountInAccountCurrency: 0.81,
						accountId: 1, // USD
						currencyId: 2, // UAH
						typeId: 0,
					},
				},
			},
			accounts: {
				byId: {
					1: {
						id: 1,
						balance: 10,
						currencyId: 1,
					},
					2: {
						id: 2,
						balance: 20,
						currencyId: 2,
					},
				},
			},
			currencies: {
				byId: {
					1: {
						id: 1,
						code: 'USD',
					},
					2: {
						id: 2,
						code: 'UAH',
					},
					3: {
						id: 3,
						code: 'EUR',
					},
				},
			},
		};
	} );
	describe( 'getAccountsUpdateDirective', () => {
		describe( 'For new expense', () => {
			it( 'returns the correct amount with matching currencyId', () => {
				const record = {
					amount: 34.5,
					accountId: 1,
					currencyId: 1,
					typeId: 0,
				};

				// const expectedBalance = -24.5;
				const account = getAccountById( state, record.accountId );
				const expectedDirective = { [ account.id ]: c( account.balance ).subtract( record.amount ).value };

				const directive = getAccountsUpdateDirective( state, record );
				expect( directive ).toEqual( expectedDirective );
			} );

			it( 'returns the correct amount with different currencyId', () => {
				const record = {
					amount: '22',
					accountId: 1,
					currencyId: 2,
					typeId: 0,
				};

				const account = getAccountById( state, record.accountId );
				const expectedAmount = -1 * fx.convert( record.amount, { from: 'UAH', to: 'USD' } );
				const expectedDirective = { [ account.id ]: c( account.balance ).add( expectedAmount ).value };

				const directive = getAccountsUpdateDirective( state, record );
				expect( directive ).toEqual( expectedDirective );
			} );
		} );

		describe( 'For updated expense', () => {
			it( 'returns the correct amount with matching currencyId', () => {
				const newRecord = {
					id: 1,
					amount: 53.2,
					amountInAccountCurrency: 53.2,
					accountId: 1,
					currencyId: 1,
					typeId: 0,
				};

				const existingRecord = {
					id: 1,
					amount: 22,
					amountInAccountCurrency: 22,
					accountId: 1,
					currencyId: 1,
					typeId: 0,
				};

				// Inject updated existing record
				state = { ...state, records: { ...state.records, byId: { ...state.records.byId, 1: existingRecord } } };

				const directive = getAccountsUpdateDirective( state, newRecord );
				assertMatchingAccountUpdateDirectives( directive, newRecord );
			} );

			it( 'returns the correct amount with different currencyId', () => {
				// ( record.currencyId !== existingRecord.currencyId ) || // record currency have changed
				// 1: {
				// 	id: 1,
				// 	amount: 22, // UAH in USD account > ~ 0.81 USD
				// 	accountId: 1, // USD
				// 	currencyId: 2, // UAH
				// 	typeId: 0,
				// },
				const newRecord = {
					id: 1,
					amount: 53.2,
					amountInAccountCurrency: 53.2,
					accountId: 1,
					currencyId: 1,
					typeId: 0,
				};

				const directive = getAccountsUpdateDirective( state, newRecord );
				assertMatchingAccountUpdateDirectives( directive, newRecord );
			} );

			it( 'returns the correct amount when account is changed from USD to UAH', () => {
				// We should return 22 UAH back to the USD account, and subtract 22 UAH from UAH account
				// which means the TX should look like this:
				// - initial TX: USD.balance + toUSD( record.amount )
				// - revert: USD.balance - toUSD( -record.amount ): 10 + 0.81 = 10.81;
				// - update: UAH.balance + toUAH( -record.amount ): UAH: 20 - 22 = -2;
				// 1: {
				// 	id: 1,
				// 	amount: 22,
				// 	accountId: 1, // USD
				// 	currencyId: 2, // UAH
				// 	typeId: 0,
				// },

				const newRecord = {
					id: 1,
					amount: 22,
					amountInAccountCurrency: 22,
					accountId: 2, // UAH
					currencyId: 2, // UAH
					typeId: 0,
				};

				const directive = getAccountsUpdateDirective( state, newRecord );

				assertMatchingAccountUpdateDirectives( directive, newRecord );
			} );

			it( 'returns the correct amount with changed currencyId and account', () => {
				// the case when updating existing record and changing both account and currency
				// id: 1,
				// amount: 22,
				// amountInAccountCurrency: 0.81,
				// accountId: 1,
				// currencyId: 2,
				// typeId: 0,

				const newRecord = {
					id: 1,
					amount: 22,
					amountInAccountCurrency: 597.19,
					accountId: 2,
					currencyId: 1,
					typeId: 0,
				};

				const directive = getAccountsUpdateDirective( state, newRecord );
				assertMatchingAccountUpdateDirectives( directive, newRecord );
			} );

			// it( 'converts from expense to income', () => {} );
			// it( 'converts from income to expense', () => {} );
		} );

		it( 'do stuff', () => {
			// ( account.currencyId !== record.currencyId ) // record currency haven't changed, but switched to other account with differnet account currency
		} );
	} );
} );

function assertMatchingAccountUpdateDirectives( updateDirective, newRecord ) {
	const oldRecord = getRecordById( state, newRecord.id );
	const oldAccount = getAccountById( state, oldRecord.accountId );
	const newAccount = getAccountById( state, newRecord.accountId );
	const oldRecordCurrency = getCurrencyById( state, oldRecord.currencyId );
	const newRecordCurrency = getCurrencyById( state, newRecord.currencyId );
	const oldAccountCurrency = getCurrencyById( state, oldAccount.currencyId );
	const newAccountCurrency = getCurrencyById( state, newAccount.currencyId );

	// console.log( newRecord.amount, { from: newRecordCurrency.code, to: newAccountCurrency.code } );
	// console.log( oldRecord.amount, { from: oldRecordCurrency.code, to: oldAccountCurrency.code } );

	const newRecordAmount = -1 * fx.convert( newRecord.amount, { from: newRecordCurrency.code, to: newAccountCurrency.code } );
	const oldRecordAmount = -1 * fx.convert( oldRecord.amount, { from: oldRecordCurrency.code, to: oldAccountCurrency.code } );

	let expectedDirective = { [ oldAccount.id ]: c( newAccount.balance ).subtract( oldRecordAmount ).add( newRecordAmount ).value };

	if ( oldAccount !== newAccount ) {
		const fromAccountNewBalance = c( oldAccount.balance ).subtract( oldRecordAmount ).value;
		const toAccountNewBalance = c( newAccount.balance ).add( newRecordAmount ).value;

		expectedDirective = { [ oldAccount.id ]: fromAccountNewBalance, [ newAccount.id ]: toAccountNewBalance };
	}

	console.log( '!!!!=== ', updateDirective, expectedDirective );

	expect( updateDirective ).toEqual( expectedDirective );
}
