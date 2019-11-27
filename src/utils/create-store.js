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
import { hydrateAccounts, hydrateCurrencies, hydrateRecords } from './state-hydrator';
import { dateUpdater, statsEntriesBackfiller } from './stats-middleware';

const persistConfig = {
	key: 'root',
	storage: AsyncStorage,
	timeout: 10000,
};

const persistedReducer = persistReducer( persistConfig, rootReducer );

export default () => {
	const store = createStore(
		persistedReducer,
		composeWithDevTools( applyMiddleware( thunk, statsEntriesBackfiller ) )
		// composeWithDevTools( applyMiddleware( thunk, dateUpdater, statsEntriesBackfiller ) )
	);
	// const persistor = persistStore( store, { manualPersist: true } );
	const persistor = persistStore( store );

	// persistor.persist();

	hydrateAccounts( store.dispatch );
	hydrateCurrencies( store.dispatch );
	hydrateRecords( store.dispatch );

	persistor.flush();
	persistor.purge();
	return { store, persistor };
};
