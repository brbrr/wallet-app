/**
 * Internal dependencies
 */
import { ADD_NEW_RECORD, UPDATE_RECORD } from '../actions/records';
import { addNewItem } from '../utils/reducerHelper';

const initialState = {
	byId: {
		1: {
			amount: 22,
			amountInAccountCurrency: 22,
			createdAt: 1555534119211,
			description: 'Ice cream',
			id: 1,
			accountId: 1,
			categoryId: 1,
			currencyId: 1,
			typeId: 0,
		},
		2: {
			amount: 2343.2,
			amountInAccountCurrency: 2343.2,
			createdAt: 1555534417211,
			description: 'Pizza',
			id: 2,
			accountId: 2,
			categoryId: 2,
			currencyId: 2,
			typeId: 0,
		},
		3: {
			amount: 321.32,
			amountInAccountCurrency: 321.32,
			createdAt: 1555554819211,
			description: 'Random transaction',
			id: 3,
			accountId: 1,
			categoryId: 3,
			currencyId: 1,
			typeId: 0,
		},
		4: {
			amount: 243.6,
			amountInAccountCurrency: 243.6,
			createdAt: 1555597817211,
			description: 'Whatever',
			id: 4,
			accountId: 2,
			categoryId: 1,
			currencyId: 2,
			typeId: 0,
		},
		5: {
			amount: 32.6,
			amountInAccountCurrency: 884.927,
			createdAt: 1555697817211,
			description: 'Whatever',
			id: 5,
			accountId: 2,
			categoryId: 1,
			currencyId: 1,
			typeId: 0,
		},
		6: {
			amount: 765.1,
			amountInAccountCurrency: 765.1,
			createdAt: 1552597817211,
			description: 'Whatever',
			id: 6,
			accountId: 2,
			categoryId: 2,
			currencyId: 2,
			typeId: 0,
		},
		7: {
			amount: 1600,
			amountInAccountCurrency: 1600,
			createdAt: 1555397817211,
			description: 'Whatever',
			id: 7,
			accountId: 2,
			categoryId: 3,
			currencyId: 2,
			typeId: 0,
		},
		8: {
			amount: 123,
			amountInAccountCurrency: 123,
			createdAt: 1555567817211,
			description: 'Whatever',
			id: 8,
			accountId: 2,
			categoryId: 1,
			currencyId: 2,
			typeId: 0,
		},
		9: {
			amount: 532,
			amountInAccountCurrency: 532,
			createdAt: 1555591817211,
			description: 'Whatever',
			id: 9,
			accountId: 2,
			categoryId: 2,
			currencyId: 2,
			typeId: 0,
		},
	},
	allIds: [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ],
};

export default function records( state = initialState, action ) {
	switch ( action.type ) {
		case ADD_NEW_RECORD:
			return addNewItem( action.record, state );
		case UPDATE_RECORD:
			return {
				byId: { ...state.byId, [ action.record.id ]: action.record },
				allIds: [ ...state.allIds ],
			};
		default:
			return state;
	}
}
