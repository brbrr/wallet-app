/**
 * External dependencies
 */
import moment from 'moment';

export const getAccounts = ( state ) => state.accounts;
export const getAccountsById = ( state ) => getAccounts( state ).byId;
export const getAccountOrder = ( state ) => getAccounts( state ).allIds;
export const getAccountById = ( state, accountId ) => getAccountsById( state )[ accountId ];
export const getDefaultAccount = ( state ) => getAccountById( state, getAccountOrder( state )[ 0 ] );

export const getCurrencies = ( state ) => state.currencies;
export const getCurrenciesById = ( state ) => getCurrencies( state ).byId;
export const getCurrencyById = ( state, currencyId ) => getCurrenciesById( state )[ currencyId ];
export const getDefaultAccountCurrency = ( state ) => getCurrencyById( state, getDefaultAccount( state ).currencyId );

export const getCategories = ( state ) => state.categories;
export const getCategoriesById = ( state ) => getCategories( state ).byId;
export const getCategoryById = ( state, categoryId ) => getCategoriesById( state )[ categoryId ];
export const getDefaultCategory = ( state ) => getCategoryById( state, 1 );

export const getRecords = ( state ) => state.records;
export const getRecordsById = ( state ) => getRecords( state ).byId;
export const getRecordById = ( state, recordId ) => getRecordsById( state )[ recordId ];
export const getRecordsByAccount = ( state, recordId ) => getRecordsById( state ).filter( ( r ) => r.id === recordId );

export const getBalanceTrend = ( state ) => state.balanceTrend;
export const getBalanceTrendForAccount = ( state, accountId ) => getBalanceTrend( state )[ accountId ];
export const getBalanceTrendEntryForAccountByDate = ( state, accountId, date ) => {
	const trend = getBalanceTrend( state )[ accountId ];
	if ( ! trend ) {
		return null;
	}
	const formattedDate = moment( date ).format( 'YYYY-MM-DD' );
	return trend[ formattedDate ];
};

export const getLatestBalanceTrendEntryForAccount = ( state, accountId ) => {
	const trend = getBalanceTrendForAccount( state, accountId );
	if ( ! trend ) {
		return null;
	}
	const dates = Object.keys( trend ).sort( ( a, b ) => Date.parse( b ) - Date.parse( a ) );
	return trend[ dates[ 0 ] ];
};
