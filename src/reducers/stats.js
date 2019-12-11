/**
 * Internal dependencies
 */
import { UPDATE_ACCOUNT_BALANCE_DIRECTIVE, ADD_ACCOUNT_SNAPSHOTS } from '../actions/accounts';

const initialState = {
	byId: {},
	allIds: [],
};

export function balanceDirectiveTrend( state = initialState, action ) {
	const { directive, type } = action;
	switch ( type ) {
		// NOTE: This is basically the same as DayHeader's `getTotalSpent` result. Maybe we can reuse it there?
		case UPDATE_ACCOUNT_BALANCE_DIRECTIVE:

			// NOTE: Its useful for statsEntriesBackfiller which is not used ATM
			// if ( _.isArray( directive ) ) {
			// 	const { byId = {}, allIds = [] } = state;

			// 	const bulkById = {};
			// 	const bulkAllIds = [ ...allIds ];
			// 	directive.forEach( ( dir ) => {
			// 		const { statDate, accId } = dir;
			// 		const id = `${ statDate }::${ accId }`;
			// 		if ( byId[ id ] ) {
			// 			console.log( '!!!!!!', dir, id, byId[ id ] );
			// 		}
			// 		bulkById[ id ] = { id, ... dir };
			// 		bulkAllIds.unshift( id );
			// 	} );

			// 	// console.log( 'bulkAllIds', bulkAllIds );

			// 	bulkAllIds.sort( ( a, b ) => moment( a.split( '::' )[ 0 ] ).diff( b.split( '::' )[ 0 ] ) );

			// 	return {
			// 		byId: {
			// 			...byId,
			// 			...bulkById,
			// 		},
			// 		allIds: bulkAllIds,
			// 	};
			// }

			const { statDate, accId, updateValue } = directive;

			const id = `${ statDate }::${ accId }`;
			const item = state.byId[ id ];

			if ( item ) {
				const newValue = item.updateValue + updateValue;
				return update( state, id, { updateValue: newValue } );
			}
			return insert( state, directive, id );
		default:
			return state;
	}
}

export function accountSnapshots( state = {}, action ) {
	const { snapshots, id, type } = action;
	switch ( type ) {
		case ADD_ACCOUNT_SNAPSHOTS:
			return {
				...state,
				[ id ]: snapshots,
			};
		default:
			return state;
	}
}

export const update = ( state, id, props ) => {
	const { byId } = state;
	const item = byId[ id ];

	return item ? {
		...state,
		byId: {
			...byId,
			[ id ]: { ...item, ...props },
		},
	} : state;
};

export const insert = ( state, item, id ) => {
	const { byId = {}, allIds = [] } = state;

	return {
		byId: {
			...byId,
			[ id ]: { id, ...item },
		},
		allIds: [ id, ...allIds ],
	};
};
