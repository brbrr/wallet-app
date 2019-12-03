/**
 * Internal dependencies
 */
import ChartDataProvider from '../chart-data-provider-11';
import { realState } from './fixtures';
/**
 * External dependencies
 */
import moment from 'moment';
import _ from 'lodash';
import { getCurrencyById, getDefaultAccountCurrency, getAccountCurrency, getAccountsById, getAccountIds } from '../../selectors';
import { convertAmount } from '..';

describe( 'ChartDataProvider', () => {
	// it( 'do stuff', () => {
	// 	const state = realState;
	// 	const dataProvider = new ChartDataProvider( stats, state );
	// 	const hrstart = process.hrtime();
	// 	dataProvider.do();

	// 	const hrend = process.hrtime( hrstart );

	// 	// Should be ~50
	// 	expect( hrend[ 1 ] / 1000000 ).toBeLessThan( 100 );
	// } );

	it( 'do stuff', () => {
		const state = realState;
		const stats = state.balanceDirectiveTrend;

		// '2019-01-01': {
		// 	1: {
		// 		accId: 1,
		// 		updateValue: 3000,
		// 		createdAt: 1546300800000,
		// 	},
		// },
		// '2019-04-17': {
		// 	1: {
		// 		accId: 1,
		// 		updateValue: -2343.2,
		// 		createdAt: 1555534417211,
		// 	},
		// },

		// getAccountSnapshots() => { '2019-01-01': 1: { 3000 }, '2019-04-17': 1: { (3000-2343.2) }, }
		/**
		 * directives = { byId : {}, allIds : [] }
		 * dates = { byId : {}, allIds : [] }
		 * accounts = { byId : {}, allIds : [] }
		 *
		 * What I want to get:
		 * - way to calculate daily account snapshots
		 * -
		 */

		q = [ 0, 1, 2 ].map( ( id ) => getAccountSnapshots( directivesTrend, id ) );
	} );
} );
