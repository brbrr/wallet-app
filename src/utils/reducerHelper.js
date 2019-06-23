export function addNewItem( item, state ) {
	const lastId = getMaxId( state.allIds );
	const newId = lastId + 1;
	const itemObject = Object.assign( {}, item, { id: newId } );
	return {
		byId: { ...state.byId, [ newId ]: itemObject },
		allIds: [ ...state.allIds, newId ],
	};
}

export function getMaxId( ids ) {
	const sortedIds = ids.sort( ( a, b ) => a > b );
	return sortedIds.slice( -1 )[ 0 ] || 0;
}

