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

export function hydrateState( dispatch ) {
	hydrateAccounts( dispatch );
	hydrateCurrencies( dispatch );
	hydrateRecords( dispatch );
}
