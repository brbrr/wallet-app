export const ADD_NEW_ACCOUNT = 'ADD_NEW_ACCOUNT';
export const UPDATE_ACCOUNT = 'UPDATE_ACCOUNT';
export const UPDATE_ACCOUNT_BALANCE = 'UPDATE_ACCOUNT_BALANCE';
export const UPDATE_ACCOUNTS_ORDER = 'UPDATE_ACCOUNTS_ORDER';

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
