/**
 * Internal dependencies
 */
import { ADD_NEW_CURRENCY } from '../actions';
import { addNewItem } from '../utils/reducerHelper';

const initialState = {
	byId: {
		1: {
			name: 'USD',
			id: 1,
		},
		2: {
			name: 'UAH',
			id: 2,
		},
		3: {
			name: 'EUR',
			id: 3,
		},
	},
	allIds: [ 1, 2, 3 ],
};

export default function currencies( state = initialState, action ) {
	switch ( action.type ) {
		case ADD_NEW_CURRENCY:
			return addNewItem( action.currency, state );
		default:
			return state;
	}
}
