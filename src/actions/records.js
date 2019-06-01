export const ADD_NEW_RECORD = 'ADD_NEW_RECORD';
export const UPDATE_RECORD = 'UPDATE_RECORD';

export function createNewRecord( record ) {
	return { type: ADD_NEW_RECORD, record };
}

export function updateRecord( record ) {
	return { type: UPDATE_RECORD, record };
}

