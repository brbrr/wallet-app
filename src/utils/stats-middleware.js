/**
 * External dependencies
 */
import moment from 'moment';

/**
 * Internal dependencies
 */
import { UPDATE_ACCOUNT_BALANCE_DIRECTIVE, updateAccountBalanceDirective, addAccountSnapshots } from '../actions/accounts';
import ChartDataManipulator from './chart-data-manipulator';

/**
 * NOTE: It's not clare what's is most effective approach
 * runtime backfill
 * before: 2019-12-04T08:44:28.084Z
 * backfill count:  334
 * backfill count:  330
 * backfill count:  337
 * after: 2019-12-04T08:44:28.800Z
 *
 * with: middleware
 * before: 2019-12-04T08:58:09.827Z
 * backfill count:  30
 * backfill count:  64
 * backfill count:  337
 * after: 2019-12-04T08:58:10.118Z
 * @param {Object} store
 * @return {Object} dispached function
 */
export const statsEntriesBackfiller = ( store ) => ( next ) => ( action ) => {
	if ( action.type === UPDATE_ACCOUNT_BALANCE_DIRECTIVE ) {
		const state = store.getState();
		const { accId, statDate, backfilled } = action.directive;
		const latestEntry = getLatestAccountDirective( state, accId );

		if ( latestEntry && ! backfilled && moment( statDate ).diff( latestEntry.statDate, 'days' ) > 1 ) {
			const toDate = moment( statDate );
			let startDate = moment( latestEntry.statDate ).add( 1, 'days' );
			const directives = [];
			while ( startDate < toDate ) {
				const date = startDate.format( 'YYYY-MM-DD' );
				const backFillDir = Object.assign( {}, latestEntry, { updateValue: 0, statDate: date, backfilled: latestEntry.statDate } );
				delete backFillDir.id;
				directives.push( backFillDir );
				startDate = startDate.add( 1, 'days' );
			}
			next( action );
			return store.dispatch( updateAccountBalanceDirective( directives ) );
		}
	}

	return next( action );
};

export const snapshotCalculator = ( store ) => ( next ) => ( action ) => {
	if ( action.type === UPDATE_ACCOUNT_BALANCE_DIRECTIVE ) {
		const result = next( action );
		const state = store.getState();
		const id = action.directive.accId;
		const directives = getBalanceDirectivesById( state );
		const dataManipulator = new ChartDataManipulator( state, 'balanceDirectiveTrend' );
		const accSnapshots = dataManipulator.fillInAndTransform( directives, id );

		store.dispatch( addAccountSnapshots( accSnapshots, id ) );
		return result;
	}
	return next( action );
};

// TODO: extract into selectors
const getBalanceDirectives = ( state ) => state.balanceDirectiveTrend;
const getBalanceDirectivesById = ( state ) => getBalanceDirectives( state ).byId;
const getBalanceDirectivesByIds = ( state ) => getBalanceDirectives( state ).byIds;
const getBalanceDirectiveById = ( state, directiveId ) => getBalanceDirectivesById( state )[ directiveId ];
const getLatestAccountDirective = ( state, accountId ) => {
	const foundId = getBalanceDirectivesByIds( state ).filter( ( directiveId ) => directiveId.endsWith( accountId ) ).sort( ( a, b ) => moment( b.split( '::' )[ 0 ] ).diff( moment( a.split( '::' )[ 0 ] ) ) )[ 0 ];
	return getBalanceDirectiveById( state, foundId );
};

