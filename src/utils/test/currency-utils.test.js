/**
 * External dependencies
 */
import fx from 'money';
import c from 'currency.js';

/**
 * Internal dependencies
 */
import { getTxUpdateDirective, getRecordAmount, convertRecordAmountToAccountCurrency, InvalidTransactionError } from '..';
import data from '../conversion-rates';
import { getRecordById, getAccountById } from '../../selectors';
fx.base = data.base;
fx.rates = data.rates;
import { state } from './fixtures';
import { TRANSFER, EXPENSE } from '../../constants/Records';

describe( 'Currency utils', () => {
	describe( 'getTxUpdateDirective', () => {
		describe( 'For new expense', () => {
			it( 'returns the correct amount with matching currencyId', () => {
				const record = {
					amount: 34.5,
					amountInAccountCurrency: 34.5,
					accountId: 1,
					currencyId: 1,
					typeId: EXPENSE,
				};

				const expectedDirective = { [ record.accountId ]: getRecordAmount( record ) };
				const directive = getTxUpdateDirective( state, record );

				expect( directive ).toEqual( expectedDirective );
			} );

			it( 'returns the correct amount with different currencyId', () => {
				const record = {
					amount: 22,
					amountInAccountCurrency: 0.81,
					accountId: 1,
					currencyId: 2,
					typeId: EXPENSE,
				};

				const expectedDirective = { [ record.accountId ]: getRecordAmount( record ) };
				const directive = getTxUpdateDirective( state, record );

				expect( directive ).toEqual( expectedDirective );
			} );
		} );

		describe( 'For existing expense', () => {
			it( 'returns the correct amount with matching currencyId', () => {
				const newRecord = {
					id: 1,
					amount: 53.2,
					amountInAccountCurrency: 53.2,
					accountId: 1,
					currencyId: 1,
					typeId: EXPENSE,
				};

				const existingRecord = {
					id: 1,
					amount: 22,
					amountInAccountCurrency: 22,
					accountId: 1,
					currencyId: 1,
					typeId: EXPENSE,
				};

				// Inject updated existing record
				const updatedState = { ...state, records: { ...state.records, byId: { ...state.records.byId, 1: existingRecord } } };

				const directive = getTxUpdateDirective( updatedState, newRecord );
				assertMatchingAccountUpdateDirectives( directive, newRecord, updatedState );
			} );

			it( 'returns the correct amount with different currencyId', () => {
				// ( record.currencyId !== existingRecord.currencyId ) || // record currency have changed
				// 1: {
				// 	id: 1,
				// 	amount: 22, // UAH in USD account > ~ 0.81 USD
				// 	accountId: 1, // USD
				// 	currencyId: 2, // UAH
				// 	typeId: EXPENSE,
				// },
				const newRecord = {
					id: 1,
					amount: 53.2,
					amountInAccountCurrency: 53.2,
					accountId: 1,
					currencyId: 1,
					typeId: EXPENSE,
				};

				const directive = getTxUpdateDirective( state, newRecord );

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
				// 	typeId: EXPENSE,
				// },

				const newRecord = {
					id: 1,
					amount: 22,
					amountInAccountCurrency: 22,
					accountId: 2, // UAH
					currencyId: 2, // UAH
					typeId: EXPENSE,
				};

				const directive = getTxUpdateDirective( state, newRecord );
				assertMatchingAccountUpdateDirectives( directive, newRecord );
			} );

			it( 'returns the correct amount with changed currencyId and account', () => {
				// the case when updating existing record and changing both account and currency
				// id: 1,
				// amount: 22,
				// amountInAccountCurrency: 0.81,
				// accountId: 1,
				// currencyId: 2,
				// typeId: EXPENSE,

				const newRecord = {
					id: 1,
					amount: 22,
					amountInAccountCurrency: 597.19,
					accountId: 2,
					currencyId: 1,
					typeId: EXPENSE,
				};

				const directive = getTxUpdateDirective( state, newRecord );
				assertMatchingAccountUpdateDirectives( directive, newRecord );
			} );

			// it( 'converts from expense to income', () => {} );
			// it( 'converts from income to expense', () => {} );
		} );

		it( 'do stuff', () => {
			// ( account.currencyId !== record.currencyId ) // record currency haven't changed, but switched to other account with differnet account currency
		} );

		// describe( 'For new income', () => {

		// } );

		// describe( 'For updated income', () => {

		// } );

		describe( 'For new transfer', () => {
			it( 'from USD account to "Out of wallet" returns correct amount', () => {
				const transferRecord = {
					amount: 34.5,
					amountInAccountCurrency: 34.5,
					accountId: 1,
					toAccountId: state.accounts.serviceAccountId,
					currencyId: 1,
					typeId: TRANSFER,
				};

				const expectedDirective = {
					[ transferRecord.accountId ]: c( -1 ).multiply( getRecordAmount( transferRecord ) ),
				};

				const directive = getTxUpdateDirective( state, transferRecord );

				expect( directive ).toEqual( expectedDirective );
			} );

			it( 'from USD account to UAH account returns correct amount', () => {
				const transferRecord = {
					amount: 34.5,
					amountInAccountCurrency: 34.5,
					accountId: 1,
					toAccountId: 2,
					currencyId: 1,
					typeId: TRANSFER,
				};

				const hackyRecord = Object.assign( {}, transferRecord, { accountId: transferRecord.toAccountId } );
				const newRecordAmount = c( convertRecordAmountToAccountCurrency( state, hackyRecord ) );

				const expectedDirective = {
					[ transferRecord.accountId ]: c( -1 ).multiply( getRecordAmount( transferRecord ) ),
					[ transferRecord.toAccountId ]: newRecordAmount,
				};

				const directive = getTxUpdateDirective( state, transferRecord );
				expect( directive ).toEqual( expectedDirective );
			} );

			it( 'from EUR in USD account to UAH account returns correct amount', () => {
				const transferRecord = {
					amount: 34.5,
					amountInAccountCurrency: 34.5,
					accountId: 1,
					toAccountId: 2,
					currencyId: 3,
					typeId: TRANSFER,
				};

				const hackyRecord = Object.assign( {}, transferRecord, { accountId: transferRecord.toAccountId } );
				const newRecordAmount = c( convertRecordAmountToAccountCurrency( state, hackyRecord ) );

				const expectedDirective = {
					[ transferRecord.accountId ]: c( -1 ).multiply( getRecordAmount( transferRecord ) ),
					[ transferRecord.toAccountId ]: newRecordAmount,
				};

				const directive = getTxUpdateDirective( state, transferRecord );
				expect( directive ).toEqual( expectedDirective );
			} );
		} );

		describe( 'For existing transfer', () => {
			// changed amount
			// changed fromAccount
			// changed toAccount (from out to a real one)
			// changed currency
			//
			it( 'when changing amount AND toAccount from USD account to "Out of wallet" returns correct amount', () => {
				// Existing record:
				// id: 2,
				// amount: 34.5, // EUR
				// amountInAccountCurrency: 38.76, // USD
				// accountId: 1, // USD
				// toAccountId: 2, // UAH
				// currencyId: 3, // EUR
				// typeId: TRANSFER,

				const transferRecord = {
					id: 2,
					amount: 40,
					amountInAccountCurrency: 40,
					accountId: 1, // USD
					toAccountId: state.accounts.serviceAccountId,
					currencyId: 1, // USD
					typeId: TRANSFER,
				};

				const oldRecord = getRecordById( state, transferRecord.id );

				const hackyRecord = Object.assign( {}, oldRecord, { accountId: oldRecord.toAccountId } );
				const newRecordAmount = c( convertRecordAmountToAccountCurrency( state, hackyRecord ) );

				const expectedDirective = {
					// revert
					// [ oldRecord.accountId ]: getRecordAmount( oldRecord ),
					// [ oldRecord.toAccountId ]: c( -1 ).multiply(newRecordAmount),
					// // update
					// [ transferRecord.accountId ]: c( -1 ).multiply( getRecordAmount( transferRecord ) ),
					// [ transferRecord.toAccountId ]: newRecordAmount2,
					// consolidated
					[ oldRecord.toAccountId ]: c( -1 ).multiply( newRecordAmount ),
					[ transferRecord.accountId ]: getRecordAmount( oldRecord ).add( c( -1 ).multiply( getRecordAmount( transferRecord ) ) ),
				};

				const directive = getTxUpdateDirective( state, transferRecord );
				expect( directive ).toEqual( expectedDirective );
			} );

			it( 'throws when from account and to account are the same', () => {
				const transferRecord = {
					id: 2,
					amount: 40,
					amountInAccountCurrency: 1219.87, // 40 EUR in UAH
					accountId: 2, // UAH
					toAccountId: 2, // UAH
					currencyId: 3,
					typeId: TRANSFER,
				};

				expect( () => getTxUpdateDirective( state, transferRecord ) ).toThrow( InvalidTransactionError );
			} );

			it( 'when changing amount AND account from USD account to UAH account returns correct amount', () => {
				// Existing record:
				// id: 2,
				// amount: 34.5,
				// amountInAccountCurrency: 38.76,
				// accountId: 1, // USD
				// toAccountId: 2, // UAH
				// currencyId: 3, // EUR
				// typeId: TRANSFER,

				const transferRecord = {
					id: 2,
					amount: 40,
					amountInAccountCurrency: 40,
					accountId: 3, // EUR
					toAccountId: 2, // UAH
					currencyId: 3,
					typeId: TRANSFER,
				};

				const oldRecord = getRecordById( state, transferRecord.id );

				const hackyRecord = Object.assign( {}, oldRecord, { accountId: oldRecord.toAccountId } );
				const newRecordAmount = c( convertRecordAmountToAccountCurrency( state, hackyRecord ) );

				const hackyRecord2 = Object.assign( {}, transferRecord, { accountId: transferRecord.toAccountId } );
				const newRecordAmount2 = c( convertRecordAmountToAccountCurrency( state, hackyRecord2 ) );

				const expectedDirective = {
					// revert
					// [ oldRecord.accountId ]: getRecordAmount( oldRecord ),
					// [ oldRecord.toAccountId ]: c( -1 ).multiply(newRecordAmount),
					// // update
					// [ transferRecord.accountId ]: c( -1 ).multiply( getRecordAmount( transferRecord ) ),
					// [ transferRecord.toAccountId ]: newRecordAmount2,
					// consolidated
					[ oldRecord.accountId ]: getRecordAmount( oldRecord ),
					[ transferRecord.accountId ]: c( -1 ).multiply( getRecordAmount( transferRecord ) ),
					[ transferRecord.toAccountId ]: c( -1 ).multiply( newRecordAmount ).add( newRecordAmount2 ),
				};

				const directive = getTxUpdateDirective( state, transferRecord );
				expect( directive ).toEqual( expectedDirective );
			} );
		} );

		describe( 'When switching TX types', () => {
			describe( 'from EXPENSE to TRANSFER', () => {
				it( 'out of wallet', () => {
					// Existing record:
					// id: 1,
					// amount: 22, // UAH in USD account > ~ 0.81 USD
					// amountInAccountCurrency: 0.81,
					// accountId: 1, // USD
					// currencyId: 2, // UAH
					// typeId: EXPENSE,

					const transferRecord = {
						id: 1,
						amount: 22, // UAH in USD account > ~ 0.81 USD
						amountInAccountCurrency: 0.81,
						accountId: 1, // USD
						currencyId: 2, // UAH
						toAccountId: state.accounts.serviceAccountId,
						typeId: TRANSFER,
					};

					const existingRecord = getRecordById( state, transferRecord.id );

					// const hackyRecord = Object.assign( {}, existingRecord, { accountId: existingRecord.toAccountId } );
					// const updatedRecordAmount = c( convertRecordAmountToAccountCurrency( state, hackyRecord ) );

					const expectedDirective = {
						// revert
						// because it's an expense, so we need to (-1) * (-amount)
						// [ existingRecord.accountId ]: -1 * (-0.81)
						// [ existingRecord.accountId ]: c( -1 ).multiply( getRecordAmount( existingRecord ) ),
						// update
						// [ transferRecord.accountId ]: -1 * (0.81)
						// [ transferRecord.accountId ]: c( -1 ).multiply( getRecordAmount( transferRecord ) ),
						//
						// ( if toAccountId !== state.accounts.serviceAccountId)
						// [ transferRecord.toAccountId ]: newRecordAmount2,
						// consolidated
						// [ existingRecord.accountId ]: c( -1 ).multiply( getRecordAmount( existingRecord ) ),

						[ transferRecord.accountId ]: c( -1 ).multiply( getRecordAmount( existingRecord ) ).add( c( -1 ).multiply( getRecordAmount( transferRecord ) ) ),
						// [ existingRecord.toAccountId ]: c( -1 ).multiply( updatedRecordAmount ),
						// [ transferRecord.accountId ]: getRecordAmount( existingRecord ).add( c( -1 ).multiply( getRecordAmount( transferRecord ) ) ),
					};

					const directive = getTxUpdateDirective( state, transferRecord );
					expect( directive ).toEqual( expectedDirective );
				} );

				it( 'to EUR account', () => {
					// Existing record:
					// id: 1,
					// amount: 22, // UAH in USD account > ~ 0.81 USD
					// amountInAccountCurrency: 0.81,
					// accountId: 1, // USD
					// currencyId: 2, // UAH
					// typeId: EXPENSE,

					const transferRecord = {
						id: 1,
						amount: 22, // UAH in USD account > ~ 0.81 USD
						amountInAccountCurrency: 0.81,
						accountId: 1, // USD
						currencyId: 2, // UAH
						toAccountId: 3,
						typeId: TRANSFER,
					};

					const existingRecord = getRecordById( state, transferRecord.id );

					const hackyRecord = Object.assign( {}, transferRecord, { accountId: transferRecord.toAccountId } );
					const updatedRecordAmount = c( convertRecordAmountToAccountCurrency( state, hackyRecord ) );

					const expectedDirective = {
						// revert
						// because it's an expense, so we need to (-1) * (-amount)
						// [ existingRecord.accountId ]: c( -1 ).multiply( getRecordAmount( existingRecord ) ),
						// update
						// [ transferRecord.accountId ]: c( -1 ).multiply( getRecordAmount( transferRecord ) ),
						// [ transferRecord.toAccountId ]: newRecordAmount,
						// consolidated
						// [ transferRecord.accountId ]: c( -1 ).multiply( getRecordAmount( existingRecord ) ).add( c( -1 ).multiply( getRecordAmount( transferRecord ) ) ),
						// [ existingRecord.toAccountId ]: c( -1 ).multiply( updatedRecordAmount ),

						[ transferRecord.accountId ]: c( -1 ).multiply( getRecordAmount( existingRecord ) ).add( c( -1 ).multiply( getRecordAmount( transferRecord ) ) ),
						[ transferRecord.toAccountId ]: updatedRecordAmount,
					};

					const directive = getTxUpdateDirective( state, transferRecord );
					expect( directive ).toEqual( expectedDirective );
				} );

				it( 'to UAH account while changing amount and currencies', () => {
					// Existing record:
					// id: 1,
					// amount: 22, // UAH in USD account > ~ 0.81 USD
					// amountInAccountCurrency: 0.81,
					// accountId: 1, // USD
					// currencyId: 2, // UAH
					// typeId: EXPENSE,

					const transferRecord = {
						id: 1,
						amount: 20, // 20 EUR in UAH
						amountInAccountCurrency: 609.93,
						accountId: 2, // UAH
						currencyId: 3, // EUR
						toAccountId: 3,
						typeId: TRANSFER,
					};

					const existingRecord = getRecordById( state, transferRecord.id );

					const hackyRecord = Object.assign( {}, transferRecord, { accountId: transferRecord.toAccountId } );
					const updatedRecordAmount = c( convertRecordAmountToAccountCurrency( state, hackyRecord ) );

					const expectedDirective = {
						// revert
						// because it's an expense, so we need to (-1) * (-amount)
						// [ existingRecord.accountId ]: c( -1 ).multiply( getRecordAmount( existingRecord ) ),
						// update
						// [ transferRecord.accountId ]: c( -1 ).multiply( getRecordAmount( transferRecord ) ),
						// [ transferRecord.toAccountId ]: updatedRecordAmount,
						// consolidated

						[ existingRecord.accountId ]: c( -1 ).multiply( getRecordAmount( existingRecord ) ),
						[ transferRecord.accountId ]: c( -1 ).multiply( getRecordAmount( transferRecord ) ),
						[ transferRecord.toAccountId ]: updatedRecordAmount,
					};

					const directive = getTxUpdateDirective( state, transferRecord );
					expect( directive ).toEqual( expectedDirective );
				} );
			} );

			describe( 'from TRANSFER to EXPENSE', () => {
				it( 'out of wallet', () => {
					// Existing record:
					// id: 3,
					// amount: 34.5, // EUR in USD account
					// amountInAccountCurrency: 38.76,
					// accountId: 1, // USD
					// toAccountId: state.accounts.serviceAccountId,
					// currencyId: 3, // EUR
					// typeId: TRANSFER,

					const expenseRecord = {
						id: 3,
						amount: 34.5, // EUR in USD account
						amountInAccountCurrency: 38.76,
						accountId: 1, // USD
						currencyId: 3, // EUR
						typeId: EXPENSE,
					};

					const existingRecord = getRecordById( state, expenseRecord.id );
					const expectedDirective = {
						// revert
						// because it's a transfer, so we need to add amount back
						// [ existingRecord.accountId ]: getRecordAmount( existingRecord ),

						// update
						// [ expenseRecord.accountId ]: getRecordAmount( transferRecord ),

						// consolidated
						[ existingRecord.accountId ]: getRecordAmount( existingRecord ).add( getRecordAmount( expenseRecord ) ),
					};

					const directive = getTxUpdateDirective( state, expenseRecord );
					expect( directive ).toEqual( expectedDirective );
				} );

				it( 'from EUR account', () => {
					// Existing record:
					// id: 4,
					// amount: 34.5,
					// amountInAccountCurrency: 38.76,
					// accountId: 1, // USD
					// toAccountId: 3,
					// currencyId: 3, // EUR
					// typeId: TRANSFER,

					const expenseRecord = {
						id: 4,
						amount: 34.5, // EUR in USD account
						amountInAccountCurrency: 38.76,
						accountId: 1, // USD
						currencyId: 3, // EUR
						typeId: EXPENSE,
					};

					const existingRecord = getRecordById( state, expenseRecord.id );

					const hackyRecord = Object.assign( {}, existingRecord, { accountId: existingRecord.toAccountId } );
					const updatedRecordAmount = c( convertRecordAmountToAccountCurrency( state, hackyRecord ) );

					const expectedDirective = {
						// revert
						// because it's a transfer, so we need to add amount back
						// [ existingRecord.accountId ]: getRecordAmount( existingRecord ),
						// [ existingRecord.toAccountId ]: c( -1 ).multiply(updatedRecordAmount),

						// update
						// [ expenseRecord.accountId ]: getRecordAmount( expenseRecord ),

						// consolidated
						[ existingRecord.accountId ]: getRecordAmount( existingRecord ).add( getRecordAmount( expenseRecord ) ),
						[ existingRecord.toAccountId ]: c( -1 ).multiply( updatedRecordAmount ),

					};

					const directive = getTxUpdateDirective( state, expenseRecord );
					expect( directive ).toEqual( expectedDirective );
				} );

				it( 'to UAH account while changing amount and currencies', () => {
					// Existing record:
					// id: 4,
					// amount: 34.5,
					// amountInAccountCurrency: 38.76,
					// accountId: 1, // USD
					// toAccountId: 3,
					// currencyId: 3, // EUR
					// typeId: TRANSFER,

					const expenseRecord = {
						id: 4,
						amount: 34.5, // USD in UAH account
						amountInAccountCurrency: 936.5,
						accountId: 2, // UAH
						currencyId: 1, // USD
						typeId: EXPENSE,
					};

					const existingRecord = getRecordById( state, expenseRecord.id );

					const hackyRecord = Object.assign( {}, existingRecord, { accountId: existingRecord.toAccountId } );
					const updatedRecordAmount = c( convertRecordAmountToAccountCurrency( state, hackyRecord ) );

					const expectedDirective = {
						// revert
						// [ existingRecord.accountId ]: getRecordAmount( existingRecord ),
						// [ existingRecord.toAccountId ]: c( -1 ).multiply(updatedRecordAmount),
						// update
						// [ expenseRecord.accountId ]: getRecordAmount( expenseRecord ),
						// consolidated
						[ existingRecord.accountId ]: getRecordAmount( existingRecord ),
						[ existingRecord.toAccountId ]: c( -1 ).multiply( updatedRecordAmount ),
						[ expenseRecord.accountId ]: getRecordAmount( expenseRecord ),
					};

					const directive = getTxUpdateDirective( state, expenseRecord );
					expect( directive ).toEqual( expectedDirective );
				} );
			} );
		} );
	} );
} );

function assertMatchingAccountUpdateDirectives( updateDirective, newRecord, testState = state ) {
	const oldRecord = getRecordById( testState, newRecord.id );
	const oldAccount = getAccountById( testState, oldRecord.accountId );
	const newAccount = getAccountById( testState, newRecord.accountId );

	// (-1) because this is a "revert" tx
	const oldRecordAmount = c( -1 ).multiply( getRecordAmount( oldRecord ) );
	const newRecordAmount = getRecordAmount( newRecord );

	let expectedDirective;

	if ( oldAccount === newAccount ) {
		expectedDirective = { [ oldAccount.id ]: c( oldRecordAmount ).add( newRecordAmount ) };
	} else {
		expectedDirective = { [ oldAccount.id ]: oldRecordAmount, [ newAccount.id ]: newRecordAmount };
	}

	console.log( '!!!!=== ', 'updateDirective: ', updateDirective, 'expectedDirective: ', expectedDirective );

	expect( updateDirective ).toEqual( expectedDirective );
}
