/**
 * External dependencies
 */
import fx from 'money';
import c from 'currency.js';

/**
 * Internal dependencies
 */
import { getUpdatedAccountBalance } from '..';
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
						amount: 22,
						accountId: 1,
						currencyId: 2,
						typeId: 0,
					},
				},
			},
			accounts: {
				byId: {
					1: {
						balance: 10,
						currencyId: 1,
					},
					2: {
						balance: 20,
						currencyId: 3,
					},
				},
			},
			currencies: {
				byId: {
					1: {
						code: 'USD',
					},
					2: {
						code: 'UAH',
					},
					3: {
						code: 'EUR',
					},
				},
			},
		};
	} );
	describe( 'getUpdatedAccountBalance', () => {
		it( 'returns the correct amount for new expense with matching currencyId', () => {
			const record = {
				amount: 34.5,
				accountId: 1,
				currencyId: 1,
				typeId: 0,
			};

			// const expectedBalance = -24.5;
			const expectedBalance = c( getAccountById( state, 1 ).balance ).subtract( record.amount );

			const balance = getUpdatedAccountBalance( state, record );
			expect( balance ).toEqual( expectedBalance );
		} );

		it( 'returns the correct amount for new expense with different currencyId', () => {
			const record = {
				amount: '22',
				accountId: 1,
				currencyId: 2,
				typeId: 0,
			};

			const expectedAmount = -1 * fx.convert( record.amount, { from: 'UAH', to: 'USD' } );
			const expectedBalance = c( getAccountById( state, 1 ).balance ).add( expectedAmount );

			const balance = getUpdatedAccountBalance( state, record );
			expect( balance ).toEqual( expectedBalance );
		} );

		it( 'returns the correct amount for updated expense with matching currencyId', () => {
			const newRecord = {
				id: 1,
				amount: 53.2,
				accountId: 1,
				currencyId: 1,
				typeId: 0,
			};

			const existingRecord = {
				id: 1,
				amount: 22,
				accountId: 1,
				currencyId: 1,
				typeId: 0,
			};

			// Inject updated existing record
			state = { ...state, records: { ...state.records, byId: { ...state.records.byId, 1: existingRecord } } };
			const expectedBalance = c( getAccountById( state, 1 ).balance ).add( existingRecord.amount ).subtract( newRecord.amount );

			const balance = getUpdatedAccountBalance( state, newRecord );
			expect( balance ).toEqual( expectedBalance );
		} );

		it( 'returns the correct amount for updated expense with different currencyId', () => {
			// ( record.currencyId !== existingRecord.currencyId ) || // record currency have changed
			const newRecord = {
				id: 1,
				amount: 53.2,
				accountId: 1,
				currencyId: 1,
				typeId: 0,
			};

			const newRecordAmount = -1 * newRecord.amount;
			const oldRecordAmount = -1 * fx.convert( getRecordById( state, 1 ).amount, { from: 'UAH', to: 'USD' } );
			const expectedBalance = c( getAccountById( state, 1 ).balance ).subtract( oldRecordAmount ).add( newRecordAmount );

			const balance = getUpdatedAccountBalance( state, newRecord );
			expect( balance ).toEqual( expectedBalance );
		} );

		it( 'returns the correct amount for updated expense when account is changed', () => {
			const newRecord = {
				id: 1,
				amount: 22,
				accountId: 2,
				currencyId: 2,
				typeId: 0,
			};

			const newRecordAmount = -1 * fx.convert( newRecord.amount, { from: 'UAH', to: 'EUR' } );
			const oldRecordAmount = -1 * fx.convert( getRecordById( state, 1 ).amount, { from: 'UAH', to: 'USD' } );
			const expectedBalance = c( getAccountById( state, 2 ).balance ).subtract( oldRecordAmount ).add( newRecordAmount );

			const balance = getUpdatedAccountBalance( state, newRecord );
			expect( balance ).toEqual( expectedBalance );
		} );

		it( 'returns the correct amount for updated expense with changed currencyId and account', () => {
			// the case when updating existing record and changing both account and currency
			// id: 1,
			// amount: 22,
			// accountId: 1,
			// currencyId: 2,
			// typeId: 0,
			const newRecord = {
				id: 1,
				amount: 22,
				accountId: 2,
				currencyId: 1,
				typeId: 0,
			};

			const oldRecordAmount = -1 * fx.convert( getRecordById( state, newRecord.id ).amount, { from: 'UAH', to: 'USD' } );
			const newRecordAmount = -1 * fx.convert( newRecord.amount, { from: 'USD', to: 'EUR' } );
			const balance = getUpdatedAccountBalance( state, newRecord );
			const expectedBalance = c( getAccountById( state, newRecord.accountId ).balance ).subtract( oldRecordAmount ).add( newRecordAmount );

			expect( balance ).toEqual( expectedBalance );
		} );

		it( 'do stuff', () => {
			// ( account.currencyId !== record.currencyId ) // record currency haven't changed, but switched to other account with differnet account currency
		} );
	} );

	describe( '', () => {

	} );
} );

function assertMatchingBalances( balance, newRecord ) {
	const oldRecord = getRecordById( state, newRecord.id );
	const oldAccount = getAccountById( state, oldRecord.accountId );
	const newAccount = getAccountById( state, newRecord.accountId );
	const oldRecordCurrency = getCurrencyById( state, oldRecord.currencyId );
	const newRecordCurrency = getCurrencyById( state, newRecord.currencyId );
	const oldAccountCurrency = getCurrencyById( state, oldAccount.currencyId );
	const newAccountCurrency = getCurrencyById( state, newAccount.currencyId );

	const newRecordAmount = -1 * fx.convert( newRecord.amount, { from: newRecordCurrency.code, to: newAccountCurrency.code } );
	const oldRecordAmount = -1 * fx.convert( oldRecord.amount, { from: oldRecordCurrency.code, to: oldAccountCurrency.code } );
	const expectedBalance = c( getAccountById( state, newRecord.accountId ).balance ).subtract( oldRecordAmount ).add( newRecordAmount );

	expect( balance ).toEqual( expectedBalance );
}
