/**
 * Internal dependencies
 */
import { SELECT_RECORD_CATEGORY } from '../actions/categories';

const initialState = {
	categoryId: 1,
};

export default function draftRecord( state = initialState, action ) {
	switch ( action.type ) {
		case SELECT_RECORD_CATEGORY:
			return { ...state, categoryId: action.id };
		default:
			return state;
	}
}

