/**
 * Internal dependencies
 */
import { getMaxId } from '../utils/reducerHelper';

export const getAccounts = ( state ) => state.accounts;
export const getAccountsById = ( state ) => getAccounts( state ).byId;
export const getAccountOrder = ( state ) => getAccounts( state ).allIds;
export const getAccountById = ( state, accountId ) => getAccountsById( state )[ accountId ];
export const getDefaultAccount = ( state ) => getAccountById( state, getMaxId( getAccountOrder( state ) ) );

export const getCurrencies = ( state ) => state.currencies;
export const getCurrencyById = ( state, currencyId ) => getCurrencies( state ).byId[ currencyId ];

export const getCategories = ( state ) => state.categories;
export const getCategoriesById = ( state ) => getCategories( state ).byId;
export const getCategoryById = ( state, categoryId ) => getCategoriesById( state )[ categoryId ];
export const getDefaultCategory = ( state ) => getCategoryById( state, 1 );

export const getRecords = ( state ) => state.records;
export const getRecordsById = ( state ) => getRecords( state ).byId;
export const getRecordById = ( state, recordId ) => getRecordsById( state )[ recordId ];

