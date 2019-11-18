/**
 * External dependencies
 */
import { combineReducers } from 'redux';

/**
 * Internal dependencies
 */
import records from './records';
import categories from './categories';
import currencies from './currencies';
import accounts from './accounts';

const appReducer = combineReducers( {
	records,
	categories,
	currencies,
	accounts,
} );

const rootReducer = ( state, action ) => {
	if ( action.type === 'PURGE_DATA' ) {
		state = undefined;
	}

	return appReducer( state, action );
};

export default rootReducer;
