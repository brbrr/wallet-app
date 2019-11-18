/**
 * Internal dependencies
 */
import { addNewCurrency } from '../actions';
import { createNewRecordAndUpdateAccounts } from '../actions/records';
import { addNewAccount } from '../actions/accounts';

const accounts = {
	1: {
		balance: 0,
		name: 'USD Cash',
		currencyId: 1,
		colorCode: 'green',
		iconName: 'google-wallet',
	},
	2: {
		balance: 0,
		name: 'UAH Bank',
		currencyId: 2,
		colorCode: 'blue',
		iconName: 'bank',
	},
	3: {
		balance: 0,
		name: 'UAH ZZZ',
		currencyId: 2,
		colorCode: 'red',
		iconName: 'bank',
	},
};

const categories = {
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
};

const currencies = {
	1: {
		code: 'USD',
		name: 'United States Dollar',
		id: 1,
	},
	2: {
		code: 'UAH',
		name: 'Ukrainian Hryvnia',
		id: 2,
	},
	3: {
		code: 'EUR',
		name: 'Euro',
		id: 3,
	},
};

const records = {
	1: {
		amount: 22,
		amountInAccountCurrency: 22,
		createdAt: 1555534119211,
		description: 'Ice cream',
		accountId: 1,
		categoryId: 1,
		currencyId: 1,
		typeId: 0,
	},
	2: {
		amount: 2343.2,
		amountInAccountCurrency: 2343.2,
		createdAt: 1555534417211,
		description: 'Pizza',
		accountId: 2,
		categoryId: 2,
		currencyId: 2,
		typeId: 0,
	},
	3: {
		amount: 321.32,
		amountInAccountCurrency: 321.32,
		createdAt: 1555554819211,
		description: 'Random transaction',
		accountId: 1,
		categoryId: 3,
		currencyId: 1,
		typeId: 0,
	},
	4: {
		amount: 243.6,
		amountInAccountCurrency: 243.6,
		createdAt: 1555597817211,
		description: 'Whatever',
		accountId: 2,
		categoryId: 1,
		currencyId: 2,
		typeId: 0,
	},
	5: {
		amount: 32.6,
		amountInAccountCurrency: 884.927,
		createdAt: 1555697817211,
		description: 'Whatever',
		accountId: 2,
		categoryId: 1,
		currencyId: 1,
		typeId: 0,
	},
	6: {
		amount: 765.1,
		amountInAccountCurrency: 765.1,
		createdAt: 1552597817211,
		description: 'Whatever',
		accountId: 2,
		categoryId: 2,
		currencyId: 2,
		typeId: 0,
	},
	7: {
		amount: 1600,
		amountInAccountCurrency: 1600,
		createdAt: 1555397817211,
		description: 'Whatever',
		accountId: 2,
		categoryId: 3,
		currencyId: 2,
		typeId: 0,
	},
	8: {
		amount: 123,
		amountInAccountCurrency: 123,
		createdAt: 1555567817211,
		description: 'Whatever',
		accountId: 2,
		categoryId: 1,
		currencyId: 2,
		typeId: 0,
	},
	9: {
		amount: 532,
		amountInAccountCurrency: 532,
		createdAt: 1555591817211,
		description: 'Whatever',
		accountId: 2,
		categoryId: 2,
		currencyId: 2,
		typeId: 0,
	},
	10: {
		amount: 123,
		amountInAccountCurrency: 123,
		createdAt: 1555869837211,
		description: 'Whatever',
		accountId: 2,
		categoryId: 1,
		currencyId: 2,
		typeId: 1,
	},
	11: {
		amount: 532,
		amountInAccountCurrency: 532,
		createdAt: 1555891867211,
		description: 'Whatever',
		accountId: 2,
		currencyId: 2,
		toAccountId: -99,
		typeId: 2,
	},
};

export function hydrateAccounts( dispatch ) {
	Object.values( accounts ).forEach( ( account ) => {
		dispatch( addNewAccount( account ) );
	} );
}

export function hydrateCurrencies( dispatch ) {
	Object.values( currencies ).forEach( ( currency ) => {
		dispatch( addNewCurrency( currency ) );
	} );
}

export function hydrateRecords( dispatch ) {
	Object.values( records ).forEach( ( record ) => dispatch( createNewRecordAndUpdateAccounts( record ) ) );
}
