/**
 * Internal dependencies
 */
import { addNewCurrency } from '../actions';
import { insertRecordAndUpdateAccounts, addNewRecord } from '../actions/records';
import { addNewAccount } from '../actions/accounts';

const accounts = {
	0: {
		balance: 3000,
		name: 'USD Cash',
		currencyId: 0,
		colorCode: 'green',
		iconName: 'google-wallet',
		createdAt: 1546300800000,
		updatedAt: 1546300800000,
	},
	1: {
		balance: 3000,
		name: 'UAH Bank',
		currencyId: 1,
		colorCode: 'blue',
		iconName: 'bank',
		createdAt: 1546300800000,
		updatedAt: 1546300800000,
	},
	2: {
		balance: 3000,
		name: 'UAH ZZZ',
		currencyId: 1,
		colorCode: 'red',
		iconName: 'bank',
		createdAt: 1546300800000,
		updatedAt: 1546300800000,
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
};

const records2 = {
	1: {
		amount: 1452,
		amountInAccountCurrency: 1452,
		createdAt: 1555534119211,
		description: 'Ice cream',
		accountId: 1,
		categoryId: 1,
		currencyId: 1,
		typeId: 0,
	},

	3: {
		amount: 321.32,
		amountInAccountCurrency: 321.32,
		createdAt: 1557224819211,
		description: 'Random transaction',
		accountId: 1,
		categoryId: 3,
		currencyId: 1,
		typeId: 0,
	},

	10: {
		amount: 1323,
		amountInAccountCurrency: 1323,
		createdAt: 1572869837211,
		description: 'Whatever',
		accountId: 1,
		categoryId: 1,
		currencyId: 1,
		typeId: 1,
	},

};

const records = {
	1: {
		amount: 1452,
		amountInAccountCurrency: 1452,
		createdAt: 1555534119211,
		updatedAt: 1555534119211,
		description: 'Ice cream',
		accountId: 0,
		categoryId: 1,
		currencyId: 0,
		typeId: 0,
	},
	2: {
		amount: 2343.2,
		amountInAccountCurrency: 2343.2,
		createdAt: 1555534417211,
		updatedAt: 1555534417211,
		description: 'Pizza',
		accountId: 1,
		categoryId: 2,
		currencyId: 1,
		typeId: 0,
	},
	3: {
		amount: 321.32,
		amountInAccountCurrency: 321.32,
		createdAt: 1557224819211,
		updatedAt: 1557224819211,
		description: 'Random transaction',
		accountId: 0,
		categoryId: 3,
		currencyId: 0,
		typeId: 0,
	},
	4: {
		amount: 243.6,
		amountInAccountCurrency: 243.6,
		createdAt: 1558724817211,
		updatedAt: 1558724817211,
		description: 'Whatever',
		accountId: 1,
		categoryId: 1,
		currencyId: 1,
		typeId: 0,
	},
	5: {
		amount: 32.6,
		amountInAccountCurrency: 884.927,
		createdAt: 1558824817211,
		updatedAt: 1558824817211,
		description: 'Whatever',
		accountId: 1,
		categoryId: 1,
		currencyId: 0,
		typeId: 0,
	},
	6: {
		amount: 765.1,
		amountInAccountCurrency: 765.1,
		createdAt: 1559224817211,
		updatedAt: 1559224817211,
		description: 'Whatever',
		accountId: 1,
		categoryId: 2,
		currencyId: 1,
		typeId: 0,
	},
	7: {
		amount: 1600,
		amountInAccountCurrency: 1600,
		createdAt: 1559478172111,
		updatedAt: 1559478172111,
		description: 'Whatever',
		accountId: 1,
		categoryId: 3,
		currencyId: 1,
		typeId: 0,
	},
	8: {
		amount: 157423,
		amountInAccountCurrency: 157423,
		createdAt: 1568867817211,
		updatedAt: 1568867817211,
		description: 'Whatever',
		accountId: 1,
		categoryId: 1,
		currencyId: 1,
		typeId: 0,
	},
	9: {
		amount: 6242,
		amountInAccountCurrency: 6242,
		createdAt: 1569891817211,
		updatedAt: 1569891817211,
		description: 'Whatever',
		accountId: 1,
		categoryId: 2,
		currencyId: 1,
		typeId: 0,
	},
	10: {
		amount: 1323,
		amountInAccountCurrency: 1323,
		createdAt: 1572869837211,
		updatedAt: 1572869837211,
		description: 'Whatever',
		accountId: 0,
		categoryId: 1,
		currencyId: 0,
		typeId: 1,
	},
	11: {
		amount: 532,
		amountInAccountCurrency: 532,
		createdAt: 1568891867211,
		updatedAt: 1568891867211,
		description: 'Whatever',
		accountId: 1,
		currencyId: 1,
		toAccountId: -99,
		typeId: 2,
	},
};

export function hydrateAccounts( dispatch ) {
	Object.values( accounts ).forEach( ( account ) => {
		dispatch( addNewAccount( account ) );
	} );

	// const account = Object.values( accounts );
	// dispatch( addNewAccount( account[ 0 ] ) );
}

export function hydrateCurrencies( dispatch ) {
	Object.values( currencies ).forEach( ( currency ) => {
		dispatch( addNewCurrency( currency ) );
	} );
}

export function hydrateRecords( dispatch ) {
	Object.values( records ).forEach( ( record ) => dispatch( insertRecordAndUpdateAccounts( addNewRecord, record ) ) );

	// const record = Object.values( records );
	// dispatch( insertRecordAndUpdateAccounts( addNewRecord, record[ 0 ] ) );
}
