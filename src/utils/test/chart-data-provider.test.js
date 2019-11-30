/**
 * Internal dependencies
 */
import ChartDataProvider from '../chart-data-provider';
import { realState } from './fixtures';
/**
 * External dependencies
 */
import moment from 'moment';

describe( 'ChartDataProvider', () => {
	// it( 'do stuff', () => {
	// 	const state = realState;
	// 	const stats = state.balanceTrend;
	// 	const dataProvider = new ChartDataProvider( stats, state );
	// 	const hrstart = process.hrtime();
	// 	dataProvider.do();

	// 	const hrend = process.hrtime( hrstart );

	// 	// Should be ~50
	// 	expect( hrend[ 1 ] / 1000000 ).toBeLessThan( 100 );
	// } );

	it( 'do stuff', () => {
		const state = realState;
		const stats = state.balanceTrend;
		const dataProvider = new ChartDataProvider( stats, state );
		const data = dataProvider.do();

		const dateFrom = moment().startOf( 'month' );
		const fullTrend = dataProvider.backfillChartData( data, 'day', dateFrom );
		console.log( data );
		console.log( fullTrend );
	} );
} )
;
