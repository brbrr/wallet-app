/**
 * Internal dependencies
 */
import { ADD_NEW_ACCOUNT } from '../actions';
import { addNewItem } from '../utils/reducerHelper';

const initialState = {
	byId: {
		1: {
			name: 'Cash',
			id: 1,
		},
		2: {
			name: 'Bank',
			id: 2,
		},
	},
	allIds: [ 1, 2 ],
};

export default function accounts( state = initialState, action ) {
	switch ( action.type ) {
		case ADD_NEW_ACCOUNT:
			return addNewItem( action.account, state );
		default:
			return state;
	}
}
