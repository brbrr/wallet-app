/**
 * Internal dependencies
 */
import { ADD_NEW_RECORD } from '../actions/records';
import { addNewItem } from '../utils/reducerHelper';

const initialState = {
	byId: {
		1: {
			account: 'Cash',
			amount: 22,
			category: 'Cafe',
			createdAt: 1555534119211,
			currency: 'USD',
			description: 'Ice cream',
			type: 'expense',
			id: 1,
		},
		2: {
			account: 'Cash',
			amount: 2343.2,
			category: 'General',
			createdAt: 1555534417211,
			currency: 'USD',
			description: 'Pizza',
			type: 'expense',
			id: 2,
		},
	},
	allIds: [ 1, 2 ],
};

export default function records( state = initialState, action ) {
	console.log( action );

	switch ( action.type ) {
		case ADD_NEW_RECORD:
			return addNewItem( action.record, state );
		default:
			return state;
	}
}
