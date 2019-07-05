/**
 * Internal dependencies
 */
import { ADD_NEW_ACCOUNT, UPDATE_ACCOUNTS_ORDER, UPDATE_ACCOUNT, UPDATE_ACCOUNT_BALANCE, DELETE_ACCOUNT } from '../actions';
import { addNewItem } from '../utils/reducerHelper';

const initialState = {
	byId: {
		1: {
			balance: 0,
			name: 'USD Cash',
			id: 1,
			currencyId: 1,
			colorCode: 'green',
			iconName: 'google-wallet',
		},
		2: {
			balance: 0,
			name: 'UAH Bank',
			id: 2,
			currencyId: 2,
			colorCode: 'blue',
			iconName: 'google-wallet',
		},
	},
	allIds: [ 1, 2 ],
};

export default function accounts( state = initialState, action ) {
	const { account, type } = action;
	switch ( type ) {
		case ADD_NEW_ACCOUNT:
			return addNewItem( account, state );
		case UPDATE_ACCOUNT:
			return {
				...state,
				byId: { ...state.byId, [ account.id ]: account },
				// allIds: [ ...state.allIds ],
			};
		case UPDATE_ACCOUNT_BALANCE:
			account.balance = action.newBalance;
			return {
				...state,
				byId: { ...state.byId, [ account.id ]: account },
				// allIds: [ ...state.allIds ],
			};
		case UPDATE_ACCOUNTS_ORDER:
			return {
				...state,
				allIds: action.newOrder,
			};
		case DELETE_ACCOUNT:
			const byId = Object.values( state.byId ).reduce( ( acc, accnt ) => {
				console.log( accnt.id, action.accountId, typeof accnt.id, typeof action.accountId, accnt.id !== action.accountId );

				if ( accnt.id !== action.accountId ) {
					acc[ accnt.id ] = state.byId[ accnt.id ];
				}
				return acc;
			}, {} );
			console.log( byId );

			const updState = {
				...state,
				byId,
			};
			console.log( updState );

			return updState;
		default:
			return state;
	}
}
