/**
 * External dependencies
 */
import c from 'currency.js';
/**
 * Internal dependencies
 */
import { getTxUpdateDirective } from '../utils';
import { getAccountById } from '../selectors';
import { updateAccountBalance } from './accounts';

export const ADD_NEW_RECORD = 'ADD_NEW_RECORD';
export const UPDATE_RECORD = 'UPDATE_RECORD';
export const DELETE_RECORD = 'DELETE_RECORD';

export function createNewRecord( record ) {
	return { type: ADD_NEW_RECORD, record };
}

export function updateRecord( record ) {
	return { type: UPDATE_RECORD, record };
}

export function deleteRecord( record ) {
	return { type: DELETE_RECORD, record };
}

export function createNewRecordAndUpdateAccounts( record ) {
	return function action( dispatch, getState ) {
		// const state = getState();
		dispatch( createNewRecord( record ) );

		// const updateDirective = getAccountsUpdateDirective( this.props, record );
		const newUpdateDirective = getTxUpdateDirective( getState(), record );

		Object.entries( newUpdateDirective ).forEach( ( [ accId, modifier ] ) => {
			const account = getAccountById( getState(), accId );
			const newAccBalance = c( account.balance ).add( modifier ).value;

			dispatch( updateAccountBalance( account, newAccBalance ) );
		} );
	};
}
