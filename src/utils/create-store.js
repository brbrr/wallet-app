/**
 * External dependencies
 */
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

/**
 * Internal dependencies
 */
import rootReducer from '../reducers';
import { hydrateState } from './state-hydrator';
import { snapshotCalculator } from './stats-middleware';
// import state from './dummy-state';

const persistConfig = {
	key: 'root',
	storage: AsyncStorage,
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
	// persistor.purge();
	// persistor.flush();

	// const persistor = persistStore( store, { manualPersist: true } );
	// persistor.purge();
	// persistor.flush();
	// hydrateState( store.dispatch );

	// persistor.persist();
	// persistor.purge();
	// persistor.flush();

	// const persistor = persistStore( store );

	// persistor.flush();
	// persistor.purge();
	return { store, persistor };
};
