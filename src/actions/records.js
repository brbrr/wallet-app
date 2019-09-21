export const ADD_NEW_RECORD = 'ADD_NEW_RECORD';
export const UPDATE_RECORD = 'UPDATE_RECORD';
export const DELETE_RECORD = 'DELETE_RECORD';

export function createNewRecord( record ) {
	return { type: ADD_NEW_RECORD, record };
}

export function updateRecord( record ) {
	return { type: UPDATE_RECORD, record };
}

export function deleteRecord( record ) {
	return { type: DELETE_RECORD, record };
}
