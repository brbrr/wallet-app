/**
 * Internal dependencies
 */
import { convertAmount } from '.';
import { getCurrencyById, getDefaultAccountCurrency, getAccountOrder, getAccountById } from '../selectors';
/**
 * External dependencies
 */
import moment from 'moment';
import 'react-native-console-time-polyfill';
import _ from 'lodash';

export default class ChartDataProvider {
	constructor( stats, state ) {
		this.stats = stats;
		this.state = state;
	}

	do( stats = this.stats ) {
		const balanceTrend = _.cloneDeep( stats );

		const trends = this.fillInMissingEntries( balanceTrend );
		return this.prepareDataForCharts( trends, this.calcFunction );
	}

	getMonthlyChartData( balanceTrend ) {
		const trend = this.do( balanceTrend );
		const fullTrend = this.backfillChartData( trend, 'month' );
		const entries = Object.entries( fullTrend );

		return entries.reduce( ( accumulator, [ date, entry ], idx ) => {
			const isEOMEntry = moment( date ).isSame( moment( date ).endOf( 'month' ), 'day' ) ||
			idx === ( entries.length - 1 );
			if ( isEOMEntry ) {
				accumulator.push( {
					x: moment( date ).valueOf(),
					y: entry.balance,
					_date: date,
					label: moment( date ).format( 'MMM' ),
				} );
			}

			return accumulator;
		}, [] )
			.sort( ( a, b ) => Date.parse( a._date ) - Date.parse( b._date ) );
	}

	getDailyChartData( balanceTrend, fromDate ) {
		const trend = this.do( balanceTrend );
		const fullTrend = this.backfillChartData( trend, 'day', fromDate );

		return Object.entries( fullTrend )
			.sort( ( a, b ) => Date.parse( a[ 0 ] ) - Date.parse( b[ 0 ] ) )
			.map( ( [ date, entry ] ) => ( {
				x: moment( date ).valueOf(),
				y: entry.balance,
				_date: date,
				label: moment( date ).format( 'DD.MM' ),
			} ) );
	}

	/**
	 * Sums up all the daily balances across all accounts
	 * Return array of entries such as:
	 *	{ '2019-11-16': { balance: 0, ids: [ 2, 3 ] }
	 * @param {Object} trend date and accountId indexed entries i.e. { '2019-11-16': { 2: { ... }}
	 * @param {Function} calcFunction
	 *
	 * @return {Array} list of entries such as: { '2019-11-16': { balance: 0, ids: [ 2, 3 ] }
	 */
	prepareDataForCharts( trend, calcFunction ) {
		const dates = Object.keys( trend ).sort( ( a, b ) => Date.parse( a ) - Date.parse( b ) );
		const result = {};
		const prevEntries = {};
		dates.forEach( ( date ) => {
			const dayTrend = trend[ date ];
			const dayBalance = Object.values( dayTrend ).reduce( ( acc, entry ) => {
				const balance = this.getBalance( entry, prevEntries[ entry.id ], calcFunction );
				prevEntries[ entry.id ] = Object.assign( {}, entry, { convertedBalance: balance } );
				return acc += balance;
			}, 0 );
			result[ date ] = { balance: dayBalance };
		} );

		return result;
	}

	/**
	 * Adds all the missing account snapshots to all existing trend dates
	 * @param {Object} trends frop redux state
	 *
	 * @return {Object} balance trend with all the filled day entries
	 */
	fillInMissingEntries( trends ) {
		// TODO: Add test to check that all account IDs are present for every date
		const dates = Object.keys( trends ).sort( ( a, b ) => Date.parse( a ) - Date.parse( b ) );
		const expectedAccountIds = getAccountOrder( this.state ); //[ 1, 2, 3 ];
		const prevEntries = {};

		dates.forEach( ( date ) => {
			const dayTrends = trends[ date ];
			const missingEntries = expectedAccountIds.filter( ( id ) => ! dayTrends[ id ] );
			// console.log( 'MISSING entries ', missingEntries, date );

			// Fill in all missing entries
			// To make sure our charts are correct, every date should have entry for every account
			missingEntries.forEach( ( id ) => {
				if ( prevEntries[ id ] ) {
					const entry = prevEntries[ id ];
					// console.log( 'Adding ', entry, date );

					dayTrends[ entry.id ] = entry;
				}
			} );

			expectedAccountIds.forEach( ( id ) => {
				if ( dayTrends[ id ] ) {
					prevEntries[ id ] = dayTrends[ id ];
				}
			} );
		} );

		const today = moment().format( 'YYYY-MM-DD' );
		trends[ today ] = {};
		expectedAccountIds.forEach( ( accId ) => trends[ today ][ accId ] = getAccountById( this.state, accId ) );

		return trends;
	}

	getBalance( entry, prevEntry, calcFunction ) {
		if ( this.isEntriesEqual( entry, prevEntry ) ) {
			// When prevEntry and entry are the same
			return prevEntry.convertedBalance;
		} else if ( calcFunction ) {
			return calcFunction( entry, this.state );
		}
		return entry.balance;
	}

	isEntriesEqual( firstEntry, secondEntry ) {
		return (
			firstEntry &&
				secondEntry &&
				secondEntry.balance === firstEntry.balance &&
				secondEntry.currencyId === firstEntry.currencyId &&
				secondEntry.id === firstEntry.id
		);
	}

	calcFunction( entryObj, state ) {
		const defaultCurrency = getDefaultAccountCurrency( state );

		const balance = entryObj.balance;
		const fromCurrency = getCurrencyById( state, entryObj.currencyId );
		const convertedAmount = convertAmount( balance, { from: fromCurrency.code, to: defaultCurrency.code } );

		return convertedAmount;
	}

	backfillChartData( entries, dateType = 'day', _fromDate = null, toDate = moment() ) {
		console.log( 'backfillChartData 1', new Date() );

		const result = {};
		const dates = Object.keys( entries ).sort( ( a, b ) => moment( a ).diff( b ) );
		const fromDate = _fromDate ? _fromDate : moment( dates[ 0 ] );
		let date = fromDate.format( 'YYYY-MM-DD' );
		let prevEntry = null;

		// pre-filling prevEntry when there is no entry for the fromDate
		if ( ! entries[ date ] ) {
			const earlierDates = dates.filter( ( d ) => d < date );
			prevEntry = entries[ _.last( earlierDates ) ];
		}

		while ( fromDate < toDate ) {
			date = fromDate.format( 'YYYY-MM-DD' );

			if ( entries[ date ] ) {
				prevEntry = entries[ date ];
			}

			if ( moment( date ).isSame( moment( date ).endOf( dateType ).startOf( 'day' ) ) ) {
				if ( entries[ date ] ) {
					result[ date ] = entries[ date ];
				} else {
					result[ date ] = Object.assign( {}, prevEntry, { backfilled: 'BACKFILLED' } );
				}
			}

			fromDate.add( 1, 'days' );
		}
		console.log( 'backfillChartData 1', new Date() );

		return result;
	}
}
