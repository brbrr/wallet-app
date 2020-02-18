/**
 * External dependencies
 */
import moment from 'moment';

/**
 * Internal dependencies
 */
import ChartDataManipulator from './chart-data-manipulator';
import { getAccountIds } from '../selectors';

export default class ChartDataProvider {
	constructor( stats, state ) {
		this.stats = stats;
		this.state = state;
	}

	getMonthlyChartData() {
		const manipulator = new ChartDataManipulator( this.state );

		const ids = getAccountIds( this.state );
		const fullTrend = manipulator.doStuff( ids );
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

	getDailyChartData( fromDate ) {
		const manipulator = new ChartDataManipulator( this.state );

		const ids = getAccountIds( this.state );
		const fullTrend = manipulator.doStuff( ids, fromDate );

		// Prepare data for chart visualization
		return Object.entries( fullTrend )
			.sort( ( a, b ) => Date.parse( a[ 0 ] ) - Date.parse( b[ 0 ] ) )
			.map( ( [ date, entry ] ) => ( {
				x: moment( date ).valueOf(),
				y: entry.balance,
				_date: date,
				label: moment( date ).format( 'DD.MM' ),
			} ) );
	}
}
