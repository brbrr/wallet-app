/**
 * Internal dependencies
 */
import { addNewCurrency } from '../actions';
import { insertRecordAndUpdateAccounts, addNewRecord } from '../actions/records';
import { addNewAccount } from '../actions/accounts';
import { recordsInitialState } from '../reducers/records';
import { currenciesInitialState } from '../reducers/currencies';
import { accountsInitialState } from '../reducers/accounts';

const accounts = accountsInitialState;
const currencies = currenciesInitialState;
const records = recordsInitialState;

export function hydrateAccounts( dispatch ) {
	Object.values( accounts.byId ).forEach( ( account ) => {
		dispatch( addNewAccount( account ) );
	} );
}

export function hydrateCurrencies( dispatch ) {
	Object.values( currencies.byId ).forEach( ( currency ) => {
		dispatch( addNewCurrency( currency ) );
	} );
}

export function hydrateRecords( dispatch ) {
	Object.values( records.byId ).forEach( ( record ) => dispatch( insertRecordAndUpdateAccounts( addNewRecord, record ) ) );
}

export function hydrateState( dispatch ) {
	hydrateAccounts( dispatch );
	hydrateCurrencies( dispatch );
	hydrateRecords( dispatch );
}
