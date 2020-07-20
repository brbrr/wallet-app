/**
 * Internal dependencies
 */
import { ADD_NEW_RECORD, UPDATE_RECORD, DELETE_RECORD } from '../actions/records';
import { addNewItem } from '../utils/reducerHelper';

const initialState2 = {
	byId: {},
	allIds: [],
};

export const recordsInitialState = {
	byId: {
		1: {
			id: 1,
			amount: 1452,
			amountInAccountCurrency: 1452,
			createdAt: 1555534119211,
			updatedAt: 1555534119211,
			description: 'Ice cream',
			accountId: 0,
			categoryId: 8,
			currencyId: 0,
			typeId: 0,
		},
		2: {
			id: 2,
			amount: 2343.2,
			amountInAccountCurrency: 2343.2,
			createdAt: 1555534417211,
			updatedAt: 1555534417211,
			description: 'Pizza',
			accountId: 1,
			categoryId: 2,
			currencyId: 1,
			typeId: 0,
		},
		3: {
			id: 3,
			amount: 321.32,
			amountInAccountCurrency: 321.32,
			createdAt: 1557224819211,
			updatedAt: 1557224819211,
			description: 'Random transaction',
			accountId: 0,
			categoryId: 3,
			currencyId: 0,
			typeId: 0,
		},
		4: {
			id: 4,
			amount: 243.6,
			amountInAccountCurrency: 243.6,
			createdAt: 1558724817211,
			updatedAt: 1558724817211,
			description: 'Whatever',
			accountId: 1,
			categoryId: 5,
			currencyId: 1,
			typeId: 0,
		},
		5: {
			id: 5,
			amount: 32.6,
			amountInAccountCurrency: 884.927,
			createdAt: 1558824817211,
			updatedAt: 1558824817211,
			description: 'Whatever',
			accountId: 1,
			categoryId: 1,
			currencyId: 0,
			typeId: 0,
		},
		6: {
			id: 6,
			amount: 765.1,
			amountInAccountCurrency: 765.1,
			createdAt: 1559224817211,
			updatedAt: 1559224817211,
			description: 'Whatever',
			accountId: 1,
			categoryId: 6,
			currencyId: 1,
			typeId: 0,
		},
		7: {
			id: 7,
			amount: 1600,
			amountInAccountCurrency: 1600,
			createdAt: 1559478172111,
			updatedAt: 1559478172111,
			description: 'Whatever',
			accountId: 1,
			categoryId: 3,
			currencyId: 1,
			typeId: 0,
		},
		8: {
			id: 8,
			amount: 157423,
			amountInAccountCurrency: 157423,
			createdAt: 1568867817211,
			updatedAt: 1568867817211,
			description: 'Whatever',
			accountId: 1,
			categoryId: 4,
			currencyId: 1,
			typeId: 0,
		},
		9: {
			id: 9,
			amount: 6242,
			amountInAccountCurrency: 6242,
			createdAt: 1569891817211,
			updatedAt: 1569891817211,
			description: 'Whatever',
			accountId: 1,
			categoryId: 2,
			currencyId: 1,
			typeId: 0,
		},
		10: {
			id: 10,
			amount: 1323,
			amountInAccountCurrency: 1323,
			createdAt: 1572869837211,
			updatedAt: 1572869837211,
			description: 'Whatever',
			accountId: 0,
			categoryId: 7,
			currencyId: 0,
			typeId: 1,
		},
		11: {
			id: 11,
			amount: 532,
			amountInAccountCurrency: 532,
			createdAt: 1568891867211,
			updatedAt: 1568891867211,
			description: 'Whatever',
			accountId: 1,
			currencyId: 1,
			toAccountId: -99,
			typeId: 2,
		},
	},
	allIds: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ],

};

export default function records( state = initialState2, action ) {
	switch ( action.type ) {
		case ADD_NEW_RECORD:
			return addNewItem( action.record, state );
		case UPDATE_RECORD:
			return {
				byId: { ...state.byId, [ action.record.id ]: action.record },
				allIds: [ ...state.allIds ],
			};
		// TODO: google how to correctly delete redux entries
		case DELETE_RECORD:
			const byId = Object.assign( {}, state.byId );
			delete byId[ action.record.id ];
			return {
				byId,
				allIds: [ ...state.allIds ],
			};
		default:
			return state;
	}
}
