/**
 * Internal dependencies
 */
import { ADD_NEW_ACCOUNT, UPDATE_ACCOUNTS_ORDER, UPDATE_ACCOUNT, UPDATE_ACCOUNT_BALANCE } from '../actions/accounts';
import { addNewItem } from '../utils/reducerHelper';

const initialState = {
	byId: {
		'-99': {
			balance: 0,
			name: 'Out of wallet',
			id: -99,
			currencyId: 2,
			colorCode: 'pink',
			iconName: 'bank',
			hidden: true,
			isServiceAccount: true,
		},
	},
	allIds: [],
	serviceAccountId: -99,

};
const initialState2 = {
	byId: {
		1: {
			balance: -343.32,
			name: 'USD Cash',
			id: 1,
			currencyId: 1,
			colorCode: 'green',
			iconName: 'google-wallet',
		},
		2: {
			balance: -5639.5,
			name: 'UAH Bank',
			id: 2,
			currencyId: 2,
			colorCode: 'blue',
			iconName: 'bank',
		},
		3: {
			balance: 100,
			name: 'UAH ZZZ',
			id: 3,
			currencyId: 2,
			colorCode: 'red',
			iconName: 'bank',
		},
		'-99': {
			balance: 0,
			name: 'Out of wallet',
			id: -99,
			currencyId: 2,
			colorCode: 'pink',
			iconName: 'bank',
			hidden: true,
		},
	},
	allIds: [ 1, 2, 3 ],
	serviceAccountId: -99,
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
			};
		case UPDATE_ACCOUNT_BALANCE:
			const acc = Object.assign( {}, account, { balance: action.newBalance } );
			return {
				...state,
				byId: { ...state.byId, [ acc.id ]: acc },
			};
		case UPDATE_ACCOUNTS_ORDER:
			return {
				...state,
				allIds: action.newOrder,
			};
		default:
			return state;
	}
}
