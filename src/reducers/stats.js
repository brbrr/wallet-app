/**
 * Internal dependencies
 */
import { ADD_NEW_ACCOUNT, UPDATE_ACCOUNT, UPDATE_ACCOUNT_BALANCE } from '../actions/accounts';
import { ADD_BALANCE_TREND_ENTRY, BACKFILL_MISSING_ENTRIES } from '../actions';

const initialState = {};
/**
 *
 * {
 *  '2019-01-01': {
 * 		1: { accObject },
 * 		3: { accObject }
 * }
 * }
 */

export function balanceTrend33( state = initialState, action ) {
	const { account, newBalance, type } = action;
	switch ( type ) {
		case UPDATE_ACCOUNT_BALANCE:
			const date = new Date( action.date );
			const statDate = date.toISOString().split( 'T' )[ 0 ];
			// account.balance = newBalance;
			const acc = Object.assign( {}, account, { balance: newBalance, statDate } );

			return {
				...state,
				[ acc.id ]: { ...state[ acc.id ], [ acc.statDate ]: acc },
			};
		default:
			return state;
	}
}

export function balanceTrend( state = initialState, action ) {
	const { entry, type } = action;
	switch ( type ) {
		case ADD_BALANCE_TREND_ENTRY:

			return {
				...state,
				[ entry.id ]: { ...state[ entry.id ], [ entry.statDate ]: entry },
			};

		case BACKFILL_MISSING_ENTRIES:
			const obj = {};
			Object.entries( action.entries ).forEach( ( [ date, e ] ) => {
				if ( state[ action.id ] && state[ action.id ][ date ] ) {
					// console.log( state[ action.id ] );

					// console.log( 'LOLOLO BACKFILL_MISSING_ENTRIES entry already in state', [ date, e, state[ action.id ][ date ] ] );
					// throw 'LOLOLO BACKFILL_MISSING_ENTRIES entry already in state';
				}
				obj[ date ] = e;
			} );

			return {
				...state,
				[ action.id ]: Object.assign( {}, state[ action.id ], obj ),
			};

			// return state;
		default:
			return state;
	}
}
