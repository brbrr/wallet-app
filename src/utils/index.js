export function getRecordAmountWithCurrency( { currencyId, amount, typeId }, currencies ) {
	const currency = currencies[ currencyId ];
	switch ( typeId ) {
		case 0:
			return `-${ currency.code }${ amount }`;
		default:
			return `${ currency.code }${ amount }`;
	}
}

export function getRecordAmount( { amount, typeId } ) {
	switch ( typeId ) {
		case 0:
			return -1 * amount;
		default:
			return amount;
	}
}

export function getTotalSpent( records ) {
	return records.reduce( ( acc, record ) => acc += getRecordAmount( record ), 0 );
}
