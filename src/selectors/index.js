/**
 * External dependencies
 */
import moment from 'moment';

export const getAccounts = ( state ) => state.accounts;
export const getAccountsById = ( state ) => getAccounts( state ).byId;
export const getAccountIds = ( state ) => getAccounts( state ).allIds;
export const getAccountOrder = ( state ) => getAccountIds( state );
export const getAccountById = ( state, accountId ) => getAccountsById( state )[ accountId ];
export const getDefaultAccount = ( state ) => getAccountById( state, getAccountOrder( state )[ 0 ] );

export const getCurrencies = ( state ) => state.currencies;
export const getCurrenciesById = ( state ) => getCurrencies( state ).byId;
export const getCurrencyById = ( state, currencyId ) => getCurrenciesById( state )[ currencyId ];
export const getAccountCurrency = ( state, accountId ) => {
	const currencyId = getAccountById( state, accountId ).currencyId;
	return getCurrencyById( state, currencyId );
};
export const getDefaultAccountCurrency = ( state ) => {
	const accountId = getDefaultAccount( state ).id;
	return getAccountCurrency( state, accountId );
};

export const getCategories = ( state ) => state.categories;
export const getCategoriesById = ( state ) => getCategories( state ).byId;
export const getCategoryById = ( state, categoryId ) => getCategoriesById( state )[ categoryId ];
export const getDefaultCategory = ( state ) => getCategoryById( state, 1 );

export const getRecords = ( state ) => state.records;
export const getRecordsById = ( state ) => getRecords( state ).byId;
export const getRecordById = ( state, recordId ) => getRecordsById( state )[ recordId ];
export const getRecordsByAccount = ( state, recordId ) => getRecordsById( state ).filter( ( r ) => r.id === recordId );
