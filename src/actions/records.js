export const ADD_NEW_RECORD = 'ADD_NEW_RECORD';

export function createNewRecord( amount = Math.round( 12 * ( 1 + Math.random( 10 ) ) ), currency = 'USD', category = 'General', account = 'Cash', description = 'Ice cream' ) {
	const record = {
		amount,
		currency,
		category,
		account,
		createdAt: Date.now(),
		description,
		type: 'expense',
	};
	return { type: 'ADD_NEW_RECORD', record };
}

