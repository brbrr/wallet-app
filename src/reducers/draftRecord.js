/**
 * Internal dependencies
 */
import { SELECT_RECORD_CATEGORY, SELECT_RECORD_CURRENCY, SELECT_RECORD_ACCOUNT } from '../actions';

const initialState = {
	categoryId: 1,
	currencyId: 1,
	accountId: 1,
};

export default function draftRecord( state = initialState, action ) {
	switch ( action.type ) {
		case SELECT_RECORD_CATEGORY:
			return { ...state, categoryId: action.id };
		case SELECT_RECORD_CURRENCY:
			return { ...state, currencyId: action.id };
		case SELECT_RECORD_ACCOUNT:
			return { ...state, accountId: action.id };
		default:
			return state;
	}
}

