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
			parentId: null,
			id: 1,
		},
		2: {
			name: 'Home',
			iconName: 'home',
			colorCode: 'green',
			parentId: null,
			id: 2,
		},
		3: {
			name: 'Cafe',
			iconName: 'coffee',
			colorCode: 'blue',
			parentId: null,
			id: 3,
		},
		4: {
			name: 'Random',
			iconName: 'coffee',
			colorCode: 'red',
			parentId: 1,
			id: 4,
		},
		5: {
			name: 'Utility',
			iconName: 'home',
			colorCode: 'blue',
			parentId: 2,
			id: 5,
		},
	},
	allIds: [ 1, 2, 3, 4, 5 ],
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
