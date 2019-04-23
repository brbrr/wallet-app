/**
 * Internal dependencies
 */
import { ADD_NEW_CATEGORY } from '../actions/categories';

const categoriesMapping = {
	general: 'shopping-basket',
	groceries: 'shopping-basket',
	cafe: 'coffee',
	restaurant: 'utensils',
};

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
			const lastId = state.allIds.slice( -1 )[ 0 ] || 0;
			const newId = lastId + 1;
			const category = Object.assign( {}, { id: newId }, action.category );
			return {
				byId: { ...state.byId, [ newId ]: category },
				allIds: [ ...state.allIds, newId ],
			};
		default:
			return state;
	}
}
