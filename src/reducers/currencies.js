/**
 * Internal dependencies
 */
import { ADD_NEW_CURRENCY } from '../actions';
import { addNewItem } from '../utils/reducerHelper';

const initialState2 = {
	byId: {
		1: {
			code: 'USD',
			name: 'United States Dollar',
			id: 1,
		},
		2: {
			code: 'UAH',
			name: 'Ukrainian Hryvnia',
			id: 2,
		},
		3: {
			code: 'EUR',
			name: 'Euro',
			id: 3,
		},
	},
	allIds: [ 1, 2, 3 ],
};

const initialState = {
	byId: {},
	allIds: [],
};

export default function currencies( state = initialState, action ) {
	switch ( action.type ) {
		case ADD_NEW_CURRENCY:
			return addNewItem( action.currency, state );
		default:
			return state;
	}
}
