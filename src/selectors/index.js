export const getAccounts = ( state ) => state.accounts;

export const getCurrencies = ( state ) => state.currencies;

export const getAccountById = ( state, accountId ) => getAccounts( state ).byId[ accountId ];

export const getCurrencyById = ( state, currencyId ) => getCurrencies( state ).byId[ currencyId ];
