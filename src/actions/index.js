export const SELECT_RECORD_CATEGORY = 'SELECT_RECORD_CATEGORY';
export const SELECT_RECORD_CURRENCY = 'SELECT_RECORD_CURRENCY';
export const ADD_NEW_CURRENCY = 'ADD_NEW_CURRENCY';
export const SELECT_RECORD_ACCOUNT = 'SELECT_RECORD_ACCOUNT';
export const ADD_NEW_ACCOUNT = 'ADD_NEW_ACCOUNT';
export const UPDATE_ACCOUNT = 'UPDATE_ACCOUNT';
export const UPDATE_ACCOUNT_BALANCE = 'UPDATE_ACCOUNT_BALANCE';
export const UPDATE_ACCOUNTS_ORDER = 'UPDATE_ACCOUNTS_ORDER';
export const DELETE_ACCOUNT = 'DELETE_ACCOUNT';
export const SELECT_RECORD_TYPE = 'SELECT_RECORD_TYPE';
export const SELECT_RECORD_DATE = 'SELECT_RECORD_DATE';
export const UPDATE_DRAFT_WITH_RECORD = 'UPDATE_DRAFT_WITH_RECORD';
export const RESET_DRAFT_RECORD = 'RESET_DRAFT_RECORD';

// Categories
export function selectRecordCategory( id ) {
	return { type: SELECT_RECORD_CATEGORY, id };
}

// Currencies
export function selectRecordCurrency( id ) {
	return { type: SELECT_RECORD_CURRENCY, id };
}

export function addNewCurrency( currency ) {
	return { type: ADD_NEW_CURRENCY, currency };
}

// Accounts
export function selectRecordAccount( id ) {
	return { type: SELECT_RECORD_ACCOUNT, id };
}

export function addNewAccount( account ) {
	return { type: ADD_NEW_ACCOUNT, account };
}

export function updateAccount( account ) {
	return { type: UPDATE_ACCOUNT, account };
}

export function updateAccountBalance( account, newBalance ) {
	return { type: UPDATE_ACCOUNT_BALANCE, account, newBalance };
}

export function updateAccountsOrder( newOrder ) {
	return { type: UPDATE_ACCOUNTS_ORDER, newOrder };
}

export function deleteAccount( accountId ) {
	return { type: DELETE_ACCOUNT, accountId };
}

// Records / Drafts

export function selectRecordType( id ) {
	return { type: SELECT_RECORD_TYPE, id };
}

export function selectRecordDate( date ) {
	return { type: SELECT_RECORD_DATE, date };
}

export function updateDraftWithRecord( record ) {
	return { type: UPDATE_DRAFT_WITH_RECORD, record };
}

export const resetDraftRecord = () => ( { type: RESET_DRAFT_RECORD } );
