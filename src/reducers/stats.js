/**
 * Internal dependencies
 */
import { UPDATE_ACCOUNT_BALANCE } from '../actions/accounts';
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

export function balanceTrend( state = initialState, action ) {
	const { account, newBalance, type } = action;
	switch ( type ) {
		case UPDATE_ACCOUNT_BALANCE:

			const date = new Date( action.date );
			const statDate = date.toISOString().split( 'T' )[ 0 ];
			const acc = Object.assign( {}, account, { balance: newBalance, statDate } );

			return {
				...state,
				[ acc.statDate ]: { ...state[ acc.statDate ], [ acc.id ]: acc },
			};
		default:
			return state;
	}
}
