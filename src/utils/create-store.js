/**
 * External dependencies
 */
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native';

/**
 * Internal dependencies
 */
import rootReducer from '../reducers';

const persistConfig = {
	key: 'root',
	storage: AsyncStorage,
};

const persistedReducer = persistReducer( persistConfig, rootReducer );

const reduxDevTools = window && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

export default () => {
	const store = createStore( persistedReducer, reduxDevTools );
	const persistor = persistStore( store );
	return { store, persistor };
};
