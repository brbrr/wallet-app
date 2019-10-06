/**
 * Internal dependencies
 */
import { ADD_NEW_CATEGORY, UPDATE_CATEGORY } from '../actions/categories';
import { addNewItem } from '../utils/reducerHelper';

const initialState = {
	byId: {
		1: {
			name: 'General',
			iconName: 'shopping-basket',
			colorCode: 'red',
			id: 1,
		},
		2: {
			name: 'Home',
			iconName: 'home',
			colorCode: 'green',
			id: 2,
		},
		3: {
			name: 'Cafe',
			iconName: 'coffee',
			colorCode: 'blue',
			id: 3,
		},
	},
	allIds: [ 1, 2, 3 ],
};

export default function categories( state = initialState, action ) {
	const { category, type } = action;

	switch ( type ) {
		case ADD_NEW_CATEGORY:
			return addNewItem( category, state );
		case UPDATE_CATEGORY:
			return {
				byId: { ...state.byId, [ category.id ]: category },
				allIds: [ ...state.allIds ],
			};
		default:
			return state;
	}
}
