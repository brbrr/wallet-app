export const getRecords = ( state ) => state.records;
export const getRecordsById = ( state ) => getRecords( state ).byId;
export const getRecordById = ( state, recordId ) => getRecordsById( state )[ recordId ];

export const getRecordsByType = ( state, typeId ) => getRecordsById( state ).filter( ( record ) => record.typeId === typeId );
