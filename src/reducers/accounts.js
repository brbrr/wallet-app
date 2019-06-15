/**
 * Internal dependencies
 */
import { ADD_NEW_ACCOUNT, UPDATE_ACCOUNTS_ORDER } from '../actions';
import { addNewItem } from '../utils/reducerHelper';

const initialState = {
	byId: {
		1: {
			balance: 0,
			name: 'Cash',
			id: 1,
			currencyId: 1,
			color: 'green',
			icon: 'google-wallet',
		},
		2: {
			balance: 0,
			name: 'Bank',
			id: 2,
			currencyId: 2,
			color: 'blue',
			icon: 'google-wallet',
		},
	},
	allIds: [ 1, 2 ],
};

export default function accounts( state = initialState, action ) {
	switch ( action.type ) {
		case ADD_NEW_ACCOUNT:
			return addNewItem( action.account, state );
		case UPDATE_ACCOUNTS_ORDER:
			return {
				...state,
				allIds: action.newOrder,
			};
		default:
			return state;
	}
}
