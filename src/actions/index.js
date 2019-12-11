export const ADD_NEW_CURRENCY = 'ADD_NEW_CURRENCY';

export function addNewCurrency( currency ) {
	return { type: ADD_NEW_CURRENCY, currency };
}
