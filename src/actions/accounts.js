/**
 * External dependencies
 */
import moment from 'moment';

/**
 * Internal dependencies
 */
import { getNewId } from '../utils/reducerHelper';
import { getAccountById } from '../selectors';

export const ADD_NEW_ACCOUNT = 'ADD_NEW_ACCOUNT';
export const UPDATE_ACCOUNT = 'UPDATE_ACCOUNT';
export const UPDATE_ACCOUNT_BALANCE = 'UPDATE_ACCOUNT_BALANCE';
export const UPDATE_ACCOUNT_BALANCE_DIRECTIVE = 'UPDATE_ACCOUNT_BALANCE_DIRECTIVE';
export const UPDATE_ACCOUNTS_ORDER = 'UPDATE_ACCOUNTS_ORDER';
export const ADD_ACCOUNT_SNAPSHOTS = 'ADD_ACCOUNT_SNAPSHOTS';

export function addNewAccount( account ) {
	return ( dispatch, getState ) => {
		const id = getNewId( getState().accounts.allIds );
		const acc = Object.assign( {}, account, {
			id,
			createdAt: account.createdAt || moment().valueOf(),
			updatedAt: account.updatedAt || moment().valueOf(),
		} );
		dispatch( { type: ADD_NEW_ACCOUNT, account: acc } );
		dispatch( updateAccountBalance( acc, acc.balance, acc.createdAt ) );

		const directive = { accId: id, updateValue: parseFloat( acc.balance ), createdAt: acc.createdAt, statDate: moment( acc.createdAt ).format( 'YYYY-MM-DD' ) };
		dispatch( updateAccountBalanceDirective( directive ) );
	};
}

export function updateAccount( account ) {
	return ( dispatch, getState ) => {
		const acc = Object.assign( {}, account, { updatedAt: moment().valueOf() } );

		dispatch( { type: UPDATE_ACCOUNT, account: acc } );
		dispatch( updateAccountBalance( acc, acc.balance, acc.updatedAt ) );

		// TODO: Ugly way to figure out the account update directive
		// We could track updateDirectives in redux and link it to account. so every account object will be populated with related directives. not sure if it worth it.
		const prevAccSnapshot = getAccountById( getState(), acc.id );
		const updateValue = parseFloat( acc.balance ) - parseFloat( prevAccSnapshot.balance );
		const directive = { accId: acc.id, updateValue, createdAt: acc.updatedAt, statDate: moment( acc.updatedAt ).format( 'YYYY-MM-DD' ) };
		dispatch( updateAccountBalanceDirective( directive ) );
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
	return { type: UPDATE_ACCOUNT_BALANCE, account, newBalance, date };
}

export function updateAccountBalanceDirective( directive ) {
	return { type: UPDATE_ACCOUNT_BALANCE_DIRECTIVE, directive };
}

export function updateAccountsOrder( newOrder ) {
	return { type: UPDATE_ACCOUNTS_ORDER, newOrder };
}

export function addAccountSnapshots( snapshots, id ) {
	return { type: ADD_ACCOUNT_SNAPSHOTS, snapshots, id };
}
