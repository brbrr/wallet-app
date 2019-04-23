/**
 * External dependencies
 */
import { combineReducers } from 'redux';

/**
 * Internal dependencies
 */
import records from './records';
import categories from './categories';
import draftRecord from './draftRecord';

const walletApp = combineReducers( {
	records,
	categories,
	draftRecord,
} );

export default walletApp;
