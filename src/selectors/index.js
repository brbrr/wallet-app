export const getAccounts = ( state ) => state.accounts;

export const getCurrencies = ( state ) => state.currencies;

export const getAccountsById = ( state ) => getAccounts( state ).byId;
export const getAccountOrder = ( state ) => getAccounts( state ).allIds;
export const getAccountById = ( state, accountId ) => getAccountsById( state )[ accountId ];

export const getCurrencyById = ( state, currencyId ) => getCurrencies( state ).byId[ currencyId ];
