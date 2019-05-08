export const ADD_NEW_CURRENCY = 'ADD_NEW_CURRENCY';
export const ADD_NEW_ACCOUNT = 'ADD_NEW_ACCOUNT';

// Categories

export const SELECT_RECORD_CATEGORY = 'SELECT_RECORD_CATEGORY';

export function selectRecordCategory( id ) {
	return { type: SELECT_RECORD_CATEGORY, id };
}

// Currencies

export const SELECT_RECORD_CURRENCY = 'SELECT_RECORD_CURRENCY';

export function selectRecordCurrency( id ) {
	return { type: SELECT_RECORD_CURRENCY, id };
}

// Accounts

export const SELECT_RECORD_ACCOUNT = 'SELECT_RECORD_ACCOUNT';

export function selectRecordAccount( id ) {
	return { type: SELECT_RECORD_ACCOUNT, id };
}

export const SELECT_RECORD_TYPE = 'SELECT_RECORD_TYPE';

export function selectRecordType( id ) {
	return { type: SELECT_RECORD_TYPE, id };
}

export function addNewAccount( account ) {
	return { type: ADD_NEW_ACCOUNT, account };
}

export function addNewCurrency( currency ) {
	return { type: ADD_NEW_CURRENCY, currency };
}
