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
import currencies from './currencies';
import accounts from './accounts';

const walletApp = combineReducers( {
	records,
	categories,
	draftRecord,
	currencies,
	accounts,
} );

export default walletApp;
