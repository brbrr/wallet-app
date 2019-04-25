/**
 * Internal dependencies
 */
import { ADD_NEW_RECORD } from '../actions/records';
import { addNewItem } from '../utils/reducerHelper';

const initialState = {
	byId: {
		1: {
			amount: 22,
			createdAt: 1555534119211,
			description: 'Ice cream',
			type: 'expense',
			id: 1,
			accountId: 1,
			categoryId: 1,
			currencyId: 1,
		},
		2: {
			amount: 2343.2,
			createdAt: 1555534417211,
			description: 'Pizza',
			type: 'expense',
			id: 2,
			accountId: 2,
			categoryId: 2,
			currencyId: 2,
		},
	},
	allIds: [ 1, 2 ],
};

export default function records( state = initialState, action ) {
	switch ( action.type ) {
		case ADD_NEW_RECORD:
			return addNewItem( action.record, state );
		default:
			return state;
	}
}
