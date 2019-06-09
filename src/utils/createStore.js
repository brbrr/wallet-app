/**
 * External dependencies
 */
import { createStore } from 'redux';
/**
 * Internal dependencies
 */
import walletApp from '../reducers';

const store = createStore( walletApp, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() );

export default store;
