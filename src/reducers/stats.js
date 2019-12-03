/**
 * Internal dependencies
 */
import { UPDATE_ACCOUNT_BALANCE_DIRECTIVE } from '../actions/accounts';

const initialState = {
	byId: {},
	allIds: [],
};

export function balanceDirectiveTrend( state = initialState, action ) {
	const { directive, type } = action;
	switch ( type ) {
		// NOTE: This is basically the same as DayHeader's `getTotalSpent` result. Maybe we can reuse it there?
		case UPDATE_ACCOUNT_BALANCE_DIRECTIVE:
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
