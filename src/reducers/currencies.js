/**
 * Internal dependencies
 */
import { ADD_NEW_CURRENCY } from '../actions';
import { addNewItem } from '../utils/reducerHelper';

export const currenciesInitialState = {
	byId: {
		0: {
			id: 0,
			code: 'USD',
			name: 'United States Dollar',
		},
		1: {
			id: 1,
			code: 'UAH',
			name: 'Ukrainian Hryvnia',
		},
		2: {
			id: 2,
			code: 'EUR',
			name: 'Euro',
		},
	},
	allIds: [ 0, 1, 2 ],
};

export default function currencies( state = currenciesInitialState, action ) {
	switch ( action.type ) {
		case ADD_NEW_CURRENCY:
			return addNewItem( action.currency, state );
		default:
			return state;
	}
}
