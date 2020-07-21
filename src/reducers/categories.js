/**
 * Internal dependencies
 */
import { ADD_NEW_CATEGORY, UPDATE_CATEGORY } from '../actions/categories';
import { addNewItem } from '../utils/reducerHelper';

const initialState = {
	byId: {
		1: {
			id: 1,
			parentId: null,
			name: 'Food',
			iconName: 'shopping-basket',
			colorCode: 'red',
		},
		4: {
			id: 4,
			parentId: 1,
			name: 'Coffee',
			iconName: 'coffee',
			colorCode: 'red',
		},
		2: {
			id: 2,
			parentId: null,
			name: 'Housing',
			iconName: 'home',
			colorCode: 'green',
		},
		5: {
			id: 5,
			parentId: 2,
			name: 'Utility',
			iconName: 'home',
			colorCode: 'green',
		},
		3: {
			id: 3,
			parentId: null,
			name: 'Shopping',
			iconName: 'coffee',
			colorCode: 'blue',
		},
		6: {
			id: 6,
			parentId: 3,
			name: 'Gifts',
			iconName: 'home',
			colorCode: 'blue',
		},
		7: {
			id: 7,
			parentId: null,
			name: 'Vehicle',
			iconName: 'car',
			colorCode: 'grey',
		},
		8: {
			id: 8,
			parentId: 7,
			name: 'Fuel',
			iconName: 'car',
			colorCode: 'grey',
		},
	},
	allIds: [ 1, 2, 3, 4, 5, 6, 7, 8 ],
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
