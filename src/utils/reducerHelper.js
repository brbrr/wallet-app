/**
 * External dependencies
 */
import v1 from 'uuid';

export function addNewItem( item, state ) {
	const newId = getNewId( state.allIds );
	const itemObject = Object.assign( {}, item, { id: newId } );

	return {
		byId: { ...state.byId, [ newId ]: itemObject },
		allIds: [ ...state.allIds, newId ],
	};
}

export function getMaxId( ids ) {
	return ids.length > 0 ? Math.max( ...ids ) : 0;
}

export function getNewId( ids ) {
	return ids.length > 0 ? Math.max( ...ids ) + 1 : 0;
}

export const insert = ( state, item ) => {
	const { byId = {}, allIds = [] } = state;
	const id = getNewId( allIds );

	return {
		byId: {
			...byId,
			[ id ]: { id, ...item },
		},
		allIds: [ id, ...allIds ],
	};
};

export const insertWithUUID = ( state, item ) => {
	const { byId = {}, ids = [] } = state;
	const id = v1();

	return {
		byId: {
			...byId,
			[ id ]: { id, ...item },
		},
		ids: [ id, ...ids ],
	};
};

