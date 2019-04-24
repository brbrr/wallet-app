/**
 * Internal dependencies
 */
import { ADD_NEW_CATEGORY } from '../actions/categories';
import { addNewItem } from '../utils/reducerHelper';

const initialState = {
	byId: {
		1: {
			name: 'General',
			icon: 'shopping-basket',
			id: 1,
		},
		2: {
			name: 'Home',
			icon: 'home',
			id: 2,
		},
		3: {
			name: 'Cafe',
			icon: 'coffee',
			id: 3,
		},
	},
	allIds: [ 1, 2, 3 ],
};

export default function categories( state = initialState, action ) {
	switch ( action.type ) {
		case ADD_NEW_CATEGORY:
			return addNewItem( action.category, state );
		default:
			return state;
	}
}
