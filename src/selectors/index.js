
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

