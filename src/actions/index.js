export const ADD_NEW_CURRENCY = 'ADD_NEW_CURRENCY';

export function addNewCurrency( currency ) {
	return { type: ADD_NEW_CURRENCY, currency };
}

export const ADD_BALANCE_TREND_ENTRY = 'ADD_BALANCE_TREND_ENTRY';
export const BACKFILL_MISSING_ENTRIES = 'BACKFILL_MISSING_ENTRIES';

export function addBalanceTrendEntry( entry ) {
	return { type: ADD_BALANCE_TREND_ENTRY, entry };
}
