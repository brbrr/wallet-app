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
import { getRecordById, getAccountById } from '../../selectors';
fx.base = data.base;
fx.rates = data.rates;
let state;

describe( 'Currency utils', () => {
	describe( 'getUpdatedAccountBalance', () => {
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
					},
				},
			};
		} );

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
			const newRecord = {
				id: 1,
				amount: 53.2,
				accountId: 1,
				currencyId: 2,
				typeId: 0,
			};

			const newRecordAmount = -1 * fx.convert( newRecord.amount, { from: 'UAH', to: 'USD' } );
			const oldRecordAmount = -1 * fx.convert( getRecordById( state, 1 ).amount, { from: 'UAH', to: 'USD' } );
			const expectedBalance = c( getAccountById( state, 1 ).balance ).subtract( oldRecordAmount ).add( newRecordAmount );

			const balance = getUpdatedAccountBalance( state, newRecord );
			expect( balance ).toEqual( expectedBalance );
		} );

		it.skip( 'returns the correct amount for updated expense with changed currencyId', () => {
			console.log( 'NOT IMPLEMENTED' );
			// the case when updating existing record and changing both amount and currency
		} );
	} );
} );
