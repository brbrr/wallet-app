export const ADD_NEW_CATEGORY = 'ADD_NEW_CATEGORY';
export const SELECT_RECORD_CATEGORY = 'SELECT_RECORD_CATEGORY';

export function selectRecordCategory( id ) {
	return { type: 'SELECT_RECORD_CATEGORY', id };
}
