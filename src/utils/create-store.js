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
// import state from './dummy-state';

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
		// state,
		composeWithDevTools( applyMiddleware( thunk, snapshotCalculator ) )
		// composeWithDevTools( applyMiddleware( thunk, dateUpdater, statsEntriesBackfiller ) )
	);
	// store.dispatch( { type: 'PURGE_DATA' } );

	const persistor = persistStore( store );

	// const persistor = persistStore( store, { manualPersist: true } );
	// hydrateState( store.dispatch );

	// persistor.persist();
	// const persistor = persistStore( store );

	// persistor.flush();
	persistor.purge();
	return { store, persistor };
};
