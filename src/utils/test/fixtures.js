/**
 * Internal dependencies
 */
import { TRANSFER, EXPENSE } from '../../constants/Records';

export const state = {
	records: {
		byId: {
			1: {
				id: 1,
				amount: 22, // UAH in USD account > ~ 0.81 USD
				amountInAccountCurrency: 0.81,
				accountId: 1, // USD
				currencyId: 2, // UAH
				typeId: EXPENSE,
			},
			2: {
				id: 2,
				amount: 34.5,
				amountInAccountCurrency: 38.76,
				accountId: 1, // USD
				toAccountId: 2, // UAH
				currencyId: 3, // EUR
				typeId: TRANSFER,
			},
			3: {
				id: 3,
				amount: 34.5,
				amountInAccountCurrency: 38.76,
				accountId: 1, // USD
				toAccountId: -99,
				currencyId: 3, // EUR
				typeId: TRANSFER,
			},

			4: {
				id: 4,
				amount: 34.5,
				amountInAccountCurrency: 38.76,
				accountId: 1, // USD
				toAccountId: 3,
				currencyId: 3, // EUR
				typeId: TRANSFER,
			},
		},
	},
	accounts: {
		byId: {
			1: {
				id: 1,
				balance: 0,
				currencyId: 1,
			},
			2: {
				id: 2,
				balance: 0,
				currencyId: 2,
			},
			3: {
				id: 3,
				balance: 0,
				currencyId: 3,
			},
			'-99': {
				balance: 0,
				name: 'Out of wallet',
				id: -99,
				currencyId: 2,
			},
		},
		serviceAccountId: -99,
	},
	currencies: {
		byId: {
			1: {
				id: 1,
				code: 'USD',
			},
			2: {
				id: 2,
				code: 'UAH',
			},
			3: {
				id: 3,
				code: 'EUR',
			},
		},
	},
};

export const realState = {
	records: {
		byId: {
			0: {
				amount: 1452,
				amountInAccountCurrency: 1452,
				createdAt: 1555534119211,
				updatedAt: 1555534119211,
				description: 'Ice cream',
				accountId: 0,
				categoryId: 1,
				currencyId: 0,
				typeId: 0,
				id: 0,
			},
			1: {
				amount: 2343.2,
				amountInAccountCurrency: 2343.2,
				createdAt: 1555534417211,
				updatedAt: 1555534417211,
				description: 'Pizza',
				accountId: 1,
				categoryId: 2,
				currencyId: 1,
				typeId: 0,
				id: 1,
			},
			2: {
				amount: 321.32,
				amountInAccountCurrency: 321.32,
				createdAt: 1557224819211,
				updatedAt: 1557224819211,
				description: 'Random transaction',
				accountId: 0,
				categoryId: 3,
				currencyId: 0,
				typeId: 0,
				id: 2,
			},
			3: {
				amount: 243.6,
				amountInAccountCurrency: 243.6,
				createdAt: 1558724817211,
				updatedAt: 1558724817211,
				description: 'Whatever',
				accountId: 1,
				categoryId: 1,
				currencyId: 1,
				typeId: 0,
				id: 3,
			},
			4: {
				amount: 32.6,
				amountInAccountCurrency: 884.927,
				createdAt: 1558824817211,
				updatedAt: 1558824817211,
				description: 'Whatever',
				accountId: 1,
				categoryId: 1,
				currencyId: 0,
				typeId: 0,
				id: 4,
			},
			5: {
				amount: 765.1,
				amountInAccountCurrency: 765.1,
				createdAt: 1559224817211,
				updatedAt: 1559224817211,
				description: 'Whatever',
				accountId: 1,
				categoryId: 2,
				currencyId: 1,
				typeId: 0,
				id: 5,
			},
			6: {
				amount: 1600,
				amountInAccountCurrency: 1600,
				createdAt: 1559478172111,
				updatedAt: 1559478172111,
				description: 'Whatever',
				accountId: 1,
				categoryId: 3,
				currencyId: 1,
				typeId: 0,
				id: 6,
			},
			7: {
				amount: 157423,
				amountInAccountCurrency: 157423,
				createdAt: 1568867817211,
				updatedAt: 1568867817211,
				description: 'Whatever',
				accountId: 1,
				categoryId: 1,
				currencyId: 1,
				typeId: 0,
				id: 7,
			},
			8: {
				amount: 6242,
				amountInAccountCurrency: 6242,
				createdAt: 1569891817211,
				updatedAt: 1569891817211,
				description: 'Whatever',
				accountId: 1,
				categoryId: 2,
				currencyId: 1,
				typeId: 0,
				id: 8,
			},
			9: {
				amount: 1323,
				amountInAccountCurrency: 1323,
				createdAt: 1572869837211,
				updatedAt: 1572869837211,
				description: 'Whatever',
				accountId: 0,
				categoryId: 1,
				currencyId: 0,
				typeId: 1,
				id: 9,
			},
			10: {
				amount: 532,
				amountInAccountCurrency: 532,
				createdAt: 1568891867211,
				updatedAt: 1568891867211,
				description: 'Whatever',
				accountId: 1,
				currencyId: 1,
				toAccountId: -99,
				typeId: 2,
				id: 10,
			},
		},
		allIds: [
			0,
			1,
			2,
			3,
			4,
			5,
			6,
			7,
			8,
			9,
			10,
		],
	},
	categories: {
		byId: {
			1: {
				name: 'General',
				iconName: 'shopping-basket',
				colorCode: 'red',
				id: 1,
			},
			2: {
				name: 'Home',
				iconName: 'home',
				colorCode: 'green',
				id: 2,
			},
			3: {
				name: 'Cafe',
				iconName: 'coffee',
				colorCode: 'blue',
				id: 3,
			},
		},
		allIds: [
			1,
			2,
			3,
		],
	},
	currencies: {
		byId: {
			0: {
				code: 'USD',
				name: 'United States Dollar',
				id: 0,
			},
			1: {
				code: 'UAH',
				name: 'Ukrainian Hryvnia',
				id: 1,
			},
			2: {
				code: 'EUR',
				name: 'Euro',
				id: 2,
			},
		},
		allIds: [
			0,
			1,
			2,
		],
	},
	accounts: {
		byId: {
			0: {
				balance: 2549.68,
				name: 'USD Cash',
				currencyId: 0,
				colorCode: 'green',
				iconName: 'google-wallet',
				createdAt: 1546300800000,
				updatedAt: 1546300800000,
				id: 0,
			},
			1: {
				balance: -167033.83,
				name: 'UAH Bank',
				currencyId: 1,
				colorCode: 'blue',
				iconName: 'bank',
				createdAt: 1546300800000,
				updatedAt: 1546300800000,
				id: 1,
			},
			2: {
				balance: 3000,
				name: 'UAH ZZZ',
				currencyId: 1,
				colorCode: 'red',
				iconName: 'bank',
				createdAt: 1546300800000,
				updatedAt: 1546300800000,
				id: 2,
			},
			'-99': {
				balance: 0,
				name: 'Out of wallet',
				id: -99,
				currencyId: 2,
				colorCode: 'pink',
				iconName: 'bank',
				hidden: true,
				isServiceAccount: true,
			},
		},
		allIds: [
			0,
			1,
			2,
		],
	},
	balanceDirectiveTrend: {
		byId: {
			'2019-01-01::0': {
				id: '2019-01-01::0',
				accId: 0,
				updateValue: 3000,
				createdAt: 1546300800000,
				statDate: '2019-01-01',
			},
			'2019-01-01::1': {
				id: '2019-01-01::1',
				accId: 1,
				updateValue: 3000,
				createdAt: 1546300800000,
				statDate: '2019-01-01',
			},
			'2019-01-01::2': {
				id: '2019-01-01::2',
				accId: 2,
				updateValue: 3000,
				createdAt: 1546300800000,
				statDate: '2019-01-01',
			},
			'2019-04-17::0': {
				id: '2019-04-17::0',
				accId: 0,
				updateValue: -1452,
				createdAt: 1555534119211,
				statDate: '2019-04-17',
			},
			'2019-04-17::1': {
				id: '2019-04-17::1',
				accId: 1,
				updateValue: -2343.2,
				createdAt: 1555534417211,
				statDate: '2019-04-17',
			},
			'2019-05-07::0': {
				id: '2019-05-07::0',
				accId: 0,
				updateValue: -321.32,
				createdAt: 1557224819211,
				statDate: '2019-05-07',
			},
			'2019-05-24::1': {
				id: '2019-05-24::1',
				accId: 1,
				updateValue: -243.6,
				createdAt: 1558724817211,
				statDate: '2019-05-24',
			},
			'2019-05-26::1': {
				id: '2019-05-26::1',
				accId: 1,
				updateValue: -884.93,
				createdAt: 1558824817211,
				statDate: '2019-05-26',
			},
			'2019-05-30::1': {
				id: '2019-05-30::1',
				accId: 1,
				updateValue: -765.1,
				createdAt: 1559224817211,
				statDate: '2019-05-30',
			},
			'2019-06-02::1': {
				id: '2019-06-02::1',
				accId: 1,
				updateValue: -1600,
				createdAt: 1559478172111,
				statDate: '2019-06-02',
			},
			'2019-09-19::1': {
				id: '2019-09-19::1',
				accId: 1,
				updateValue: -157955,
				createdAt: 1568867817211,
				statDate: '2019-09-19',
			},
			'2019-10-01::1': {
				id: '2019-10-01::1',
				accId: 1,
				updateValue: -6242,
				createdAt: 1569891817211,
				statDate: '2019-10-01',
			},
			'2019-11-04::0': {
				id: '2019-11-04::0',
				accId: 0,
				updateValue: 1323,
				createdAt: 1572869837211,
				statDate: '2019-11-04',
			},
		},
		allIds: [
			'2019-11-04::0',
			'2019-10-01::1',
			'2019-09-19::1',
			'2019-06-02::1',
			'2019-05-30::1',
			'2019-05-26::1',
			'2019-05-24::1',
			'2019-05-07::0',
			'2019-04-17::1',
			'2019-04-17::0',
			'2019-01-01::2',
			'2019-01-01::1',
			'2019-01-01::0',
		],
	},
};
