/**
 * Internal dependencies
 */
import { getMaxId } from '../utils/reducerHelper';

export const getAccounts = ( state ) => state.accounts;
export const getAccountById = ( state, accountId ) => getAccountsById( state )[ accountId ];
export const getAccountsById = ( state ) => getAccounts( state ).byId;
export const getAccountOrder = ( state ) => getAccounts( state ).allIds;
export const getDefaultAccount = ( state ) => getAccountById( state, getMaxId( getAccountOrder( state ) ) );

export const getCurrencies = ( state ) => state.currencies;
export const getCurrencyById = ( state, currencyId ) => getCurrencies( state ).byId[ currencyId ];

export const getCategories = ( state ) => state.categories;
export const getCategoryById = ( state, categoryId ) => getCategories( state ).byId[ categoryId ];
export const getDefaultCategory = ( state ) => getCategoryById( state, 1 );

