/**
 * Internal dependencies
 */
import { UPDATE_ACCOUNT_BALANCE, UPDATE_ACCOUNT, ADD_NEW_ACCOUNT, updateAccountBalance } from '../actions/accounts';
import { ADD_NEW_RECORD, UPDATE_RECORD, DELETE_RECORD } from '../actions/records';
import { getAccountById, getLatestBalanceTrendEntryForAccount, getBalanceTrendEntryForAccountByDate } from '../selectors';
/**
 * External dependencies
 */
import moment from 'moment';
import { ADD_BALANCE_TREND_ENTRY, addBalanceTrendEntry, BACKFILL_MISSING_ENTRIES } from '../actions';

export const dateUpdater = ( store ) => ( next ) => ( action ) => {
	const nowDate = Date.now();
	switch ( action.type ) {
		// accounts
		case ADD_NEW_ACCOUNT:
			action.account.createdAt = action.account.createdAt ? action.account.createdAt : nowDate;
			action.account.updatedAt = action.account.updatedAt ? action.account.updatedAt : nowDate;
			action.date = action.account.createdAt;
			// falls through
		case UPDATE_ACCOUNT:
		case UPDATE_ACCOUNT_BALANCE:
			action.account.updatedAt = action.account.updatedAt ? action.account.updatedAt : nowDate;
			// action.account.updatedAt = nowDate;
			action.date = action.date ? action.date : action.account.createdAt;
			// action.date = action.account.createdAt ? action.account.createdAt : nowDate;

			break;

		// records
		// case ADD_NEW_RECORD:
		// 	action.record.createdAt = Date.now();
			// falls through
		case UPDATE_RECORD:
		case DELETE_RECORD:
			action.record.updatedAt = nowDate;
			action.date = nowDate;
			break;
		default:
			break;
	}
	return next( action );
};

// TODO: think about how we can extract account update action into a middleware, and wether we should do it at all.
const accountBalanceUpdater = ( store ) => ( next ) => ( action ) => {
	const nowDate = Date.now();
	switch ( action.type ) {
		// accounts
		case ADD_NEW_ACCOUNT:
		case UPDATE_ACCOUNT:

		// records
		case ADD_NEW_RECORD:
		case UPDATE_RECORD:
		case DELETE_RECORD:
			// do stuff
			break;
		default:
			break;
	}
	return next( action );
};

export const statsEntriesBackfiller1 = ( store ) => ( next ) => ( action ) => {
	if ( action.type === ADD_BALANCE_TREND_ENTRY ) {
		const state = store.getState();
		const accountId = action.entry.id;
		const latestEntry = getLatestBalanceTrendEntryForAccount( state, accountId );
		const prevDate = moment( action.entry.statDate ).subtract( 1, 'day' );

		// if latestEntry is more than day ago, we should backfill missing days
		if ( latestEntry && ! action.entry.backfilled && moment( latestEntry.statDate ).isBefore( moment( prevDate ) ) ) {
			const fromDate = moment( latestEntry.statDate ).add( 1, 'day' );
			const toDate = moment( prevDate );
			const result = {};
			while ( fromDate <= toDate ) {
				const date1 = fromDate.format( 'YYYY-MM-DD' );

				if ( ! getBalanceTrendEntryForAccountByDate( state, accountId, date1 ) ) {
					const newEntry = Object.assign( {}, latestEntry, { statDate: date1, _originStatDate: latestEntry.statDate, backfilled: 'BACKFILLED' } );

					result[ date1 ] = newEntry;
				}

				fromDate.add( 1, 'day' );
			}

			store.dispatch( { type: BACKFILL_MISSING_ENTRIES, entries: result, id: accountId } );
		}
	}

	return next( action );
};

export const statsEntriesBackfiller = ( store ) => ( next ) => ( action ) => {
	if ( action.type === ADD_BALANCE_TREND_ENTRY ) {
		const { entry } = action;
		const state = store.getState();
		const accountId = entry.id;
		const fromDate = moment( entry.statDate );
		fromDate.add( 1, 'day' );
		const toDate = moment().startOf( 'day' );

		const result = {};
		while ( fromDate <= toDate ) {
			const date = fromDate.format( 'YYYY-MM-DD' );
			const newEntry = Object.assign( {}, entry, { statDate: date, _originStatDate: entry.statDate, backfilled: 'BACKFILLED' } );
			const existingEntry = getBalanceTrendEntryForAccountByDate( state, accountId, date );
			if ( existingEntry && ! existingEntry.backfilled ) {
				break;
			}
			result[ date ] = newEntry;
			fromDate.add( 1, 'day' );
		}

		store.dispatch( { type: BACKFILL_MISSING_ENTRIES, entries: result, id: accountId } );
	}

	return next( action );
};

