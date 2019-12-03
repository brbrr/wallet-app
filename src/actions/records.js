/**
 * External dependencies
 */
import c from 'currency.js';
import _ from 'lodash';

/**
 * Internal dependencies
 */
import { getTxUpdateDirective, getAccountsUpdateDirective } from '../utils';
import { getAccountById } from '../selectors';
import { updateAccountBalance, updateAccountBalanceDirective } from './accounts';

export const ADD_NEW_RECORD = 'ADD_NEW_RECORD';
export const UPDATE_RECORD = 'UPDATE_RECORD';
export const DELETE_RECORD = 'DELETE_RECORD';

export function addNewRecord( record ) {
	return { type: ADD_NEW_RECORD, record };
}

export function updateRecord( record ) {
	return { type: UPDATE_RECORD, record };
}

export function deleteRecord( record ) {
	return { type: DELETE_RECORD, record };
}

export function insertRecordAndUpdateAccounts( recordAction, record ) {
	return ( dispatch, getState ) => {
		// WHY???? this should be called _before_ updating the account and after record got assigned an id
		// Sine we rely on `record.id` to figure if the record is new.
		// also, we need to have state _before_ tx, to correctly calculate directive
		const updateDirective = getAccountsUpdateDirective( getState(), record );
		const newUpdateDirective = getTxUpdateDirective( getState(), record );

		dispatch( recordAction( record ) );

		Object.entries( newUpdateDirective ).forEach( ( [ accId, modifier ] ) => {
			const account = getAccountById( getState(), accId );
			const newAccBalance = c( account.balance ).add( modifier ).value;

			if ( newAccBalance !== updateDirective[ accId ] ) {
				console.error(
					`old: ${ updateDirective[ accId ] }, new: ${ newAccBalance };
isEqual: ${ _.isEqual( updateDirective, newUpdateDirective ) };
oldDirective: ${ JSON.stringify( updateDirective ) };
newDirective: ${ JSON.stringify( newUpdateDirective ) }`
				);

				throw new Error( `OUCH: old updateDirective is different from new one. check logs` );
			}

			dispatch( updateAccountBalance( account, newAccBalance, record.createdAt ) );

			const directive = { accId: account.id, updateValue: modifier.value, createdAt: record.createdAt };
			dispatch( updateAccountBalanceDirective( directive ) );
		} );
	};
}
