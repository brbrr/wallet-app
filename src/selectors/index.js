/**
 * External dependencies
 */
import { createSelector } from 'reselect';

export const getAccounts = ( state ) => state.accounts;
export const getAccountsById = createSelector( getAccounts, ( accs ) => accs.byId );
// export const getAccountsById = ( state ) => getAccounts( state ).byId;
export const getAccountsListById = createSelector( getAccountsById, ( accsById ) => Object.values( accsById ) );
// export const getAccountsListById = ( state ) => Object.values( getAccountsById( state ) );
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
export const getCategoryFromNavProps = ( _, props ) => props ? props.navigation.getParam( 'categoryId' ) : null;
export const getCategoriesByParentId = createSelector( [ getCategoriesById, getCategoryFromNavProps ], ( catsById, parentId ) => Object.values( catsById ).filter( ( c ) => c.parentId === parentId ) );
// export const getCategoriesByParentId = ( state, parentId ) => Object.values( getCategoriesById( state ) ).filter( ( c ) => c.parentId === parentId );
export const getParentCategories = ( state ) => getCategoriesByParentId( state, null );

export const getRecords = ( state ) => state.records;
export const getRecordById = ( state, recordId ) => getRecordsById( state )[ recordId ];
export const getRecordsById = createSelector( getRecords, ( r ) => r.byId );
export const getRecordsListById = createSelector( getRecordsById, ( r ) => Object.values( r ) );
export const getRecordsByAccount = ( state, recordId ) => getRecordsById( state ).filter( ( r ) => r.id === recordId );

/**
 * generates a map indexed by categoryId with records count with specific category
 */
export const getCategoriesStats = createSelector( getRecordsListById, ( recordsList ) => (
	recordsList.reduce( ( acc, rec ) => {
		const catId = rec.categoryId;

		if ( ! catId ) {
			return acc;
		}

		if ( ! acc[ catId ] ) {
			acc[ catId ] = { id: catId, count: 0 };
		}
		acc[ catId ] = { ...acc[ catId ], count: acc[ catId ].count + 1 };
		return acc;
	}, {} )
) );
