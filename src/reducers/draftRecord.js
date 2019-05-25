/**
 * Internal dependencies
 */
import { SELECT_RECORD_CATEGORY, SELECT_RECORD_CURRENCY, SELECT_RECORD_ACCOUNT, SELECT_RECORD_TYPE, START_NEW_DRAFT_RECORD, SELECT_RECORD_DATE } from '../actions';

const initialState = () => ( {
	categoryId: 1,
	currencyId: 1,
	accountId: 1,
	typeId: 0,
	createdAt: Date.now(),
} );

export default function draftRecord( state = initialState(), action ) {
	switch ( action.type ) {
		case START_NEW_DRAFT_RECORD:
			return initialState();
		case SELECT_RECORD_CATEGORY:
			return { ...state, categoryId: action.id };
		case SELECT_RECORD_CURRENCY:
			return { ...state, currencyId: action.id };
		case SELECT_RECORD_ACCOUNT:
			return { ...state, accountId: action.id };
		case SELECT_RECORD_TYPE:
			return { ...state, typeId: action.id };
		case SELECT_RECORD_DATE:
			return { ...state, createdAt: action.date };
		default:
			return state;
	}
}

