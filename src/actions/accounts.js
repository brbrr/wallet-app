/**
 * Internal dependencies
 */
import { getMaxId } from '../utils/reducerHelper';
import { addBalanceTrendEntry } from '.';
/**
 * External dependencies
 */
import moment from 'moment';

export const ADD_NEW_ACCOUNT = 'ADD_NEW_ACCOUNT';
export const UPDATE_ACCOUNT = 'UPDATE_ACCOUNT';
export const UPDATE_ACCOUNT_BALANCE = 'UPDATE_ACCOUNT_BALANCE';
export const UPDATE_ACCOUNTS_ORDER = 'UPDATE_ACCOUNTS_ORDER';

export function addNewAccount( account ) {
	// return { type: ADD_NEW_ACCOUNT, account };
	return ( dispatch, getState ) => {
		const id = getMaxId( getState().accounts.allIds ) + 1;
		const acc = Object.assign( {}, account, {
			id,
			createdAt: account.createdAt || moment().valueOf(),
			updatedAt: account.updatedAt || moment().valueOf(),
		} );
		dispatch( { type: ADD_NEW_ACCOUNT, account: acc } );
		dispatch( updateAccountBalance( acc, acc.balance ) );
	};
}

export function updateAccount( account ) {
	// return { type: UPDATE_ACCOUNT, account };
	return ( dispatch ) => {
		const acc = Object.assign( {}, account, { updatedAt: moment().valueOf() } );

		dispatch( { type: UPDATE_ACCOUNT, acc } );
		dispatch( updateAccountBalance( acc, acc.balance ) );
	};
}

/**
 * Date value represents the date to which this update should be linked.
 * - for record add/update it should be the record creation date, which should be passed explicitly
 * - for account add/update it should be the account update date, which is handled by stats-middleware
 *
 * @param {Object} account account object
 * @param {number} newBalance new updated account balance
 * @param {number} date to which date we should count this update
 *
 * @return { Object} redux action
 */
export function updateAccountBalance( account, newBalance, date ) {
	return ( dispatch ) => {
		dispatch( { type: UPDATE_ACCOUNT_BALANCE, account, newBalance, date } );
		const entryDate = date ? moment( date ) : moment( account.updatedAt );

		const entry = Object.assign( {}, account, { balance: newBalance, statDate: entryDate.format( 'YYYY-MM-DD' ) } );
		dispatch( addBalanceTrendEntry( entry ) );
	};
	// return { type: UPDATE_ACCOUNT_BALANCE, account, newBalance, date };
}

export function updateAccountsOrder( newOrder ) {
	return { type: UPDATE_ACCOUNTS_ORDER, newOrder };
}

function addNewAccount2( account ) {
	return { type: ADD_NEW_ACCOUNT, account };
}

function updateAccount2( account ) {
	return { type: UPDATE_ACCOUNT, account };
}

function getMeta() {
	return { createdAt: Date.now() };
}
