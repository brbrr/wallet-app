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
