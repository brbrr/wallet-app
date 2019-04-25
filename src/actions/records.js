export const ADD_NEW_RECORD = 'ADD_NEW_RECORD';

export function createNewRecord( record ) {
	return { type: 'ADD_NEW_RECORD', record };
}

