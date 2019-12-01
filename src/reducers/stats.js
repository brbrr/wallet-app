/**
 * Internal dependencies
 */
import { UPDATE_ACCOUNT_BALANCE, UPDATE_ACCOUNT_BALANCE_DIRECTIVE } from '../actions/accounts';
import { ADD_BALANCE_TREND_ENTRY, BACKFILL_MISSING_ENTRIES } from '../actions';
/**
 * External dependencies
 */
import moment from 'moment';
import v1 from 'uuid';

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

const intState = {
	allIds: [],
	dateRelations: {},
	accountRelations: {},
	byId: {},
};

/**
 * Represents account changes using balance diffs
 * these representations are not atomic, e.g. it does not show _every_ day's update, it just sums up all the daily changes
 * Map indexed by date: { '2019-01-01': { '1': { id: 1, updateValue: 3000, createdAt: 1546300800000 } }
 * @param {Object} state
 * @param {Object} action
 *
 * @return {Object} state
 */
export function balanceDirectiveTrend( state = initialState, action ) {
	const { directive, type } = action;
	switch ( type ) {
		// NOTE: This is basically the same as DayHeader's `getTotalSpent` result. Maybe we can reuse it there?
		case UPDATE_ACCOUNT_BALANCE_DIRECTIVE:
			/**
			 * directive = { id, balance, createdAt }
			 */

			console.log( UPDATE_ACCOUNT_BALANCE_DIRECTIVE, directive );

			const { accId, updateValue, createdAt } = directive;
			const statDate = moment( createdAt ).format( 'YYYY-MM-DD' );
			// TODO: Ugly, redo somehow
			let newDirective = directive;
			if ( state[ statDate ] && state[ statDate ][ accId ] ) {
				const dateDirective = state[ statDate ][ accId ];
				const newValue = dateDirective.updateValue + updateValue;
				newDirective = Object.assign( {}, dateDirective, { updateValue: newValue } );
			}

			return {
				...state,
				[ statDate ]: { ...state[ statDate ], [ accId ]: newDirective },
			};
		default:
			return state;
	}
}
