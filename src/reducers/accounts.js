/**
 * Internal dependencies
 */
import { ADD_NEW_ACCOUNT, UPDATE_ACCOUNTS_ORDER, UPDATE_ACCOUNT, UPDATE_ACCOUNT_BALANCE } from '../actions/accounts';
import { addNewItem } from '../utils/reducerHelper';

export const accountsInitialState = {
	byId: {
		0: {
			id: 0,
			balance: 3000,
			name: 'USD Cash',
			currencyId: 0,
			colorCode: 'green',
			iconName: 'google-wallet',
			createdAt: 1546300800000,
			updatedAt: 1546300800000,
		},
		1: {
			id: 1,
			balance: 3000,
			name: 'UAH Bank',
			currencyId: 1,
			colorCode: 'blue',
			iconName: 'bank',
			createdAt: 1546300800000,
			updatedAt: 1546300800000,
		},
		2: {
			id: 2,
			balance: 3000,
			name: 'UAH ZZZ',
			currencyId: 1,
			colorCode: 'red',
			iconName: 'bank',
			createdAt: 1546300800000,
			updatedAt: 1546300800000,
		},
		// '-99': {
		// 	id: -99,
		// 	balance: 0,
		// 	name: 'Out of wallet',
		// 	currencyId: 2,
		// 	colorCode: 'pink',
		// 	iconName: 'bank',
		// 	hidden: true,
		// 	isServiceAccount: true,
		// },
	},
	allIds: [ 0, 1, 2 ],
	serviceAccountId: -99,
};

const initState = {
	byId: {
		'-99': {
			id: -99,
			balance: 0,
			name: 'Out of wallet',
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

export default function accounts( state = initState, action ) {
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
