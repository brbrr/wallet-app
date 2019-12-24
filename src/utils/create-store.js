/**
 * External dependencies
 */
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

/**
 * Internal dependencies
 */
import rootReducer from '../reducers';
import { hydrateAccounts, hydrateCurrencies, hydrateRecords, hydrateState } from './state-hydrator';
import { snapshotCalculator } from './stats-middleware';

const persistConfig = {
	key: 'root',
	storage: AsyncStorage,
	timeout: 10000,
};

const persistedReducer = persistReducer( persistConfig, rootReducer );

export default () => {
	const store = createStore(
		persistedReducer,
		// rootReducer,
		composeWithDevTools( applyMiddleware( thunk, snapshotCalculator ) )
		// composeWithDevTools( applyMiddleware( thunk, dateUpdater, statsEntriesBackfiller ) )
	);
	const persistor = persistStore( store );

	// const persistor = persistStore( store, { manualPersist: true } );
	// hydrateState( store.dispatch );

	// persistor.persist();
	// const persistor = persistStore( store );

	// persistor.flush();
	persistor.purge();
	return { store, persistor };
};
