/**
 * Internal dependencies
 */
import { convertAmount } from '.';
import { getCurrencyById, getDefaultAccountCurrency } from '../selectors';
/**
 * External dependencies
 */
import moment from 'moment';
import 'react-native-console-time-polyfill';

export default class ChartDataProvider {
	constructor( stats, state ) {
		this.stats = stats;
		this.state = state;
	}

	do( stats = this.stats ) {
		// const data = this.backfillAllMissingRecords( stats );
		// console.log( 'backfillAllMissingRecords end ', new Date() );

		return this.prepareDataForCharts( stats, this.calcFunction );
	}

	getMonthlyChartData( balanceTrend ) {
		const data = this.do( balanceTrend );
		const entries = Object.entries( data );

		console.time( 'reduce' );

		const r = entries.reduce( ( accumulator, [ date, entry ], idx ) => {
			const isEOMEntry = moment( date ).isSame( moment( date ).endOf( 'month' ), 'day' ) ||
			idx === ( entries.length - 1 );
			if ( isEOMEntry ) {
				accumulator.push( { x: moment( date ).format( 'MMM' ), y: entry.balance, _date: date } );
			}

			return accumulator;
		}, [] )
			.sort( ( a, b ) => Date.parse( a._date ) - Date.parse( b._date ) );

		console.timeEnd( 'reduce' );

		return r;

		// console.time( 'forEach' );

		// let accumulator = [];
		// entries.forEach( ( [ date, entry ], idx ) => {
		// 	const isEOMEntry = moment( date ).isSame( moment( date ).endOf( 'month' ), 'day' ) ||
		// 	idx === ( entries.length - 1 );
		// 	if ( isEOMEntry ) {
		// 		accumulator.push( { x: moment( date ).format( 'MMM' ), y: entry.balance, _date: date } );
		// 	}
		// } );
		// accumulator.sort( ( a, b ) => Date.parse( a._date ) - Date.parse( b._date ) );

		// console.timeEnd( 'forEach' );

		// console.time( 'loop' );

		// accumulator = [];

		// for ( let i = 0; i < entries.length; i++ ) {
		// 	const [ date, entry ] = entries[ i ];
		// 	const isEOMEntry = moment( date ).isSame( moment( date ).endOf( 'month' ), 'day' ) ||
		// 	i === ( entries.length - 1 );
		// 	if ( isEOMEntry ) {
		// 		accumulator.push( { x: moment( date ).format( 'MMM' ), y: entry.balance, _date: date } );
		// 	}
		// }

		// accumulator.sort( ( a, b ) => Date.parse( a._date ) - Date.parse( b._date ) );

		// console.timeEnd( 'loop' );

		// return accumulator;
	}

	getDailyChartData( balanceTrend ) {
		const data = this.do( balanceTrend );

		const chartData = Object.entries( data )
			.sort( ( a, b ) => Date.parse( a[ 0 ].date ) - Date.parse( b[ 0 ].date ) )
			.map( ( [ date, entry ] ) => ( { x: moment( date ).format( 'DD.MM' ), y: entry.balance, _date: date } ) );

		return chartData;
	}

	/**
	 * Sums up all the daily balances across all accounts
	 * Return array of entries such as:
	 *	{ '2019-11-16': { balance: 0, ids: [ 2, 3 ] }
	 * @param {Array} data
	 * @param {Function} calcFunction
	 *
	 * @return {Array} list of entries such as: { '2019-11-16': { balance: 0, ids: [ 2, 3 ] }
	 */
	prepareDataForCharts( data, calcFunction ) {
		// Convert stats object into flat array with elements such as: [ date, entry]
		const arr = Object.entries( data ).reduce( ( acc, [ id, entries ] ) => {
			Object.entries( entries ).forEach( ( entry ) => acc.push( entry ) );
			return acc;
		}, [] );

		// Process flatten array into an object with summed account balances
		let prevEntry = null;
		return arr.reduce( ( acc, [ date, entry ] ) => {
			if ( ! acc[ date ] ) {
				acc[ date ] = { balance: 0, ids: [] };
			}

			// TODO: FIXME: As an idea, we can do the calculations when adding new record in reducer/action
			let balance;
			if ( this.isEntriesEqual( entry, prevEntry ) ) {
				// When prevEntry and entry are the same
				balance = prevEntry.convertedBalance;
			} else if ( calcFunction ) {
				balance = calcFunction( entry, this.state );
			} else {
				balance = entry.balance;
			}

			acc[ date ].balance += balance;

			// Add account ID to the list of IDs
			if ( ! acc[ date ].ids.includes( entry.id ) ) {
				acc[ date ].ids.push( entry.id );
			}
			prevEntry = Object.assign( {}, entry, { convertedBalance: balance } );
			return acc;
		}, {} );
	}

	/**
	 * Fills in all the missing daily entries by using previous actual records.
	 * { 1: {'2019-01-14': { ...balance, id } } }
	 *
	 * @param {Object} stats Map of all the actual account entries
	 * @param {Date} toDate toDate date
	 *
	 * @return {Object} Map of all the account entries + backfilled missing dates
	 */
	_backfillAllMissingRecords( stats, toDate = new Date() ) {
		console.log( 'backfillAllMissingRecords 1 ', new Date() );

		return Object.entries( stats ).reduce( ( acc, [ accountId, entries ] ) => {
			console.log( 'backfillAllMissingRecords 2 ', accountId, new Date() );

			const result = this.backfillMissingRecordsForAccount( entries, toDate );
			acc[ accountId ] = result;
			return acc;
		}, {} );
	}

	_backfillMissingRecordsForAccount( entries, toDate ) {
		const result = {};
		const dates = Object.keys( entries ).sort( ( a, b ) => Date.parse( a ) - Date.parse( b ) );
		const fromDate = new Date( dates[ 0 ] );
		let prevEntry = null;
		const backfilled = [];
		while ( fromDate < toDate ) {
			const date = fromDate.toISOString().split( 'T' )[ 0 ];

			if ( dates.includes( date ) ) {
				result[ date ] = entries[ date ];
				prevEntry = entries[ date ];
			} else {
				result[ date ] = Object.assign( {}, prevEntry, { backfilled: 'BACKFILLED' } );
				backfilled.push( Object.assign( {}, prevEntry, { backfilled: 'BACKFILLED' } ) );
			}

			fromDate.setDate( fromDate.getDate() + 1 );
		}

		return result;
	}

	backfillMissingRecordsForAccountBy( dateType, entries, toDate ) {
		const result = {};
		const dates = Object.keys( entries ).sort( ( a, b ) => Date.parse( a ) - Date.parse( b ) );
		const fromDate = new Date( dates[ 0 ] );
		let prevEntry = null;
		while ( fromDate < toDate ) {
			const date = fromDate.toISOString().split( 'T' )[ 0 ];

			if ( entries[ date ] ) {
				prevEntry = entries[ date ];
			} else {
			}

			if ( moment( date ).isSame( moment( date ).startOf( dateType ) ) ) {
				if ( entries[ date ] ) {
					result[ date ] = entries[ date ];
				} else {
					result[ date ] = Object.assign( {}, prevEntry, { backfilled: 'BACKFILLED', statDate: date } );
				}
			}

			fromDate.setDate( fromDate.getDate() + 1 );
		}
		// Object.entries( result ).map( ( e ) => [ e[ 1 ].statDate, e[ 1 ].balance, e[ 1 ].backfilled ] );
		// Object.entries( entries ).map( ( e ) => [ e[ 1 ].statDate, e[ 1 ].balance, e[ 1 ].backfilled ] );

		return result;
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
}
