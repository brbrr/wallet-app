export function addNewItem( item, state ) {
	const lastId = state.allIds.slice( -1 )[ 0 ] || 0;
	const newId = lastId + 1;
	const itemObject = Object.assign( {}, { id: newId }, item );
	return {
		byId: { ...state.byId, [ newId ]: itemObject },
		allIds: [ ...state.allIds, newId ],
	};
}

