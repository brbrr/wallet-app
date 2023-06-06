export const ADD_NEW_CURRENCY = 'ADD_NEW_CURRENCY';
export const UPDATE_IS_FIRST_LAUNCH = 'UPDATE_IS_FIRST_LAUNCH';

export function addNewCurrency( currency ) {
	return { type: ADD_NEW_CURRENCY, currency };
}

export function updateIsFirstLaunch( isFirstLaunch ) {
	return { type: UPDATE_IS_FIRST_LAUNCH, isFirstLaunch };
}
