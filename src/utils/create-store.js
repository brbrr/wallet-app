/**
 * External dependencies
 */
import { createStore } from 'redux';
/**
 * Internal dependencies
 */
import walletApp from '../reducers';

const reduxDevTools = window && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore( walletApp, reduxDevTools );

export default store;
