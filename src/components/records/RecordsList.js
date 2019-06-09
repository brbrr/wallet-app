/**
 * External dependencies
 */
import React from 'react';
import { Text, ScrollView } from 'react-native';

/**
 * Internal dependencies
 */
import RecordsItem from './RecordItem';
import { getRecordAmountWithCurrency } from '../../utils';
import DayHeader from './DayHeader';

// TODO: separate in two components: RecordsList & FullList(?) components
export const RecordsList = ( { records, accounts, categories, currencies, navigateEditRecordScreen } ) => {
	if ( records.length === 0 ) {
		return (
			<Text style={ styles.getStartedText }>{ 'No records yet.' }</Text>
		);
	}

	records.sort( ( a, b ) => a.createdAt < b.createdAt );

	const list = records.reduce( ( acc, record ) => {
		const date = new Date( record.createdAt );
		const recordDate = date.toISOString().split( 'T' )[ 0 ];

		if ( ! acc[ recordDate ] ) {
			acc[ recordDate ] = [ record ];
		} else {
			acc[ recordDate ].push( record );
		}
		return acc;
	}, {} );

	const listRecords = Object.values( list ).sort( ( a, b ) => a[ 0 ].createdAt < b[ 0 ].createdAt );

	const result = [];
	const scrollIndexes = [];

	// Complex-ish way to generate a list of records with relevant dates and amounts
	listRecords.forEach( ( itemsList, idx ) => {
		scrollIndexes.push( result.length );
		result.push(
			<DayHeader
				key={ `${ idx }-header` }
				records={ itemsList }
			/>
		);

		itemsList.forEach( ( record, index ) => {
			const category = categories[ record.categoryId ];
			const account = accounts[ record.accountId ];
			const amount = getRecordAmountWithCurrency( record, currencies );
			result.push( <RecordsItem
				key={ `${ idx }-${ index }` }
				record={ record }
				category={ category }
				account={ account }
				amount={ amount }
				navigateEditRecordScreen={ navigateEditRecordScreen }
			/> );
		} );
	} );

	return (
		<ScrollView stickyHeaderIndices={ scrollIndexes } style={ styles.containerStyle }>
			{ result }
		</ScrollView>
	);
};

const styles = {
	flexView: {
		flex: 1,
		flexDirection: 'row',
	},
	containerStyle: {
		borderBottomWidth: 0,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
		elevation: 1,
	},
};

