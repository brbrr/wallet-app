/**
 * Internal dependencies
 */
import { UPDATE_IS_FIRST_LAUNCH } from '../actions';

const initialState = {
	isFirstLaunch: false,
};

export default function config( state = initialState, action ) {
	switch ( action.type ) {
		case UPDATE_IS_FIRST_LAUNCH:
			return { ...state, isFirstLaunch: action.isFirstLaunch };
		default:
			return state;
	}
}
