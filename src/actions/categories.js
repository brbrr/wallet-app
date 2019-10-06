export const ADD_NEW_CATEGORY = 'ADD_NEW_CATEGORY';
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY';

export function addNewCategory( category ) {
	return { type: 'ADD_NEW_CATEGORY', category };
}
export function updateCategory( category ) {
	return { type: 'UPDATE_CATEGORY', category };
}
