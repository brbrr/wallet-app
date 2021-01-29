/**
 * External dependencies
 */
import moment from 'moment';

/**
 * Internal dependencies
 */
import ChartDataManipulator from './chart-data-manipulator';

describe( 'ChartDataManipulator', () => {
	it( 'do stuff', () => {
		const state1 = {
			records: {
				byId: {
					0: {
						amount: 21,
						amountInAccountCurrency: 21,
						description: '',
						currencyId: 0,
						accountId: 0,
						categoryId: 1,
						createdAt: 1611862570305,
						updatedAt: 1611862570305,
						typeId: 0,
						id: 0,
					},
				},
				allIds: [
					0,
				],
			},
			categories: {
				byId: {
					1: {
						id: 1,
						parentId: null,
						name: 'Food',
						iconName: 'shopping-basket',
						colorCode: 'red',
					},
					2: {
						id: 2,
						parentId: null,
						name: 'Housing',
						iconName: 'home',
						colorCode: 'green',
					},
					3: {
						id: 3,
						parentId: null,
						name: 'Shopping',
						iconName: 'coffee',
						colorCode: 'blue',
					},
					4: {
						id: 4,
						parentId: 1,
						name: 'Coffee',
						iconName: 'coffee',
						colorCode: 'red',
					},
					5: {
						id: 5,
						parentId: 2,
						name: 'Utility',
						iconName: 'home',
						colorCode: 'green',
					},
					6: {
						id: 6,
						parentId: 3,
						name: 'Gifts',
						iconName: 'home',
						colorCode: 'blue',
					},
					7: {
						id: 7,
						parentId: null,
						name: 'Vehicle',
						iconName: 'car',
						colorCode: 'grey',
					},
					8: {
						id: 8,
						parentId: 7,
						name: 'Fuel',
						iconName: 'car',
						colorCode: 'grey',
					},
				},
				allIds: [
					1,
					2,
					3,
					4,
					5,
					6,
					7,
					8,
				],
			},
			currencies: {
				byId: {
					0: {
						code: 'AED',
						name: 'United Arab Emirates Dirham',
						id: 0,
					},
				},
				allIds: [
					0,
				],
			},
			accounts: {
				byId: {
					0: {
						name: 'Sdafsf',
						balance: -21,
						colorCode: 'blue',
						iconName: 'car',
						currencyId: 0,
						id: 0,
						createdAt: 1611862568940,
						updatedAt: 1611862568941,
					},
					'-99': {
						id: -99,
						balance: 0,
						name: 'Out of wallet',
						currencyId: 2,
						colorCode: 'pink',
						iconName: 'bank',
						hidden: true,
						isServiceAccount: true,
					},
				},
				allIds: [
					0,
				],
			},
			balanceDirectiveTrend: {
				byId: {
					'2021-01-28::0': {
						id: '2021-01-28::0',
						accId: 0,
						updateValue: null,
						createdAt: 1611862568940,
						statDate: '2021-01-28',
					},
				},
				allIds: [
					'2021-01-28::0',
				],
			},
			accountSnapshots: {
				0: [
					{
						id: '2021-01-28::0',
						accId: 0,
						updateValue: null,
						createdAt: 1611862568940,
						statDate: '2021-01-28',
						balance: null,
					},
				],
			},
		};
		const state = { records: { byId: { 0: { amount: 23, amountInAccountCurrency: 23, description: '', currencyId: 0, accountId: 0, categoryId: 1, createdAt: 1611863374283, updatedAt: 1611863374283, typeId: 0, id: 0 } }, allIds: [ 0 ] }, categories: { byId: { 1: { id: 1, parentId: null, name: 'Food', iconName: 'shopping-basket', colorCode: 'red' }, 2: { id: 2, parentId: null, name: 'Housing', iconName: 'home', colorCode: 'green' }, 3: { id: 3, parentId: null, name: 'Shopping', iconName: 'coffee', colorCode: 'blue' }, 4: { id: 4, parentId: 1, name: 'Coffee', iconName: 'coffee', colorCode: 'red' }, 5: { id: 5, parentId: 2, name: 'Utility', iconName: 'home', colorCode: 'green' }, 6: { id: 6, parentId: 3, name: 'Gifts', iconName: 'home', colorCode: 'blue' }, 7: { id: 7, parentId: null, name: 'Vehicle', iconName: 'car', colorCode: 'grey' }, 8: { id: 8, parentId: 7, name: 'Fuel', iconName: 'car', colorCode: 'grey' } }, allIds: [ 1, 2, 3, 4, 5, 6, 7, 8 ] }, currencies: { byId: { 0: { code: 'AED', name: 'United Arab Emirates Dirham', id: 0 } }, allIds: [ 0 ] }, accounts: { byId: { 0: { name: 'Asdfasdf', balance: -23, colorCode: 'blue', iconName: 'car', currencyId: 0, id: 0, createdAt: 1611863373018, updatedAt: 1611863373018 }, '-99': { id: -99, balance: 0, name: 'Out of wallet', currencyId: 2, colorCode: 'pink', iconName: 'bank', hidden: true, isServiceAccount: true } }, allIds: [ 0 ] }, balanceDirectiveTrend: { byId: { '2021-01-28::0': { id: '2021-01-28::0', accId: 0, updateValue: null, createdAt: 1611863373018, statDate: '2021-01-28' } }, allIds: [ '2021-01-28::0' ] }, accountSnapshots: { 0: [ { id: '2021-01-28::0', accId: 0, updateValue: null, createdAt: 1611863373018, statDate: '2021-01-28', balance: null } ] }, _persist: { version: -1, rehydrated: true } };
		const ids = [ 0 ];
		const fromDate = moment().subtract( 1, 'months' ).startOf( 'month' );
		const manipulator = new ChartDataManipulator( state );
		const fullTrend = manipulator.doStuff( ids, fromDate );

		console.log( fullTrend );
	} );
} );
