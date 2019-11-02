/**
 * External dependencies
 */
import React from 'react';
import { Text, ScrollView } from 'react-native';

/**
 * Internal dependencies
 */
import RecordsItem, { TransferItem } from './RecordItem';
import { getRecordAmountWithCurrency } from '../../utils';
import DayHeader from './DayHeader';

// TODO: separate in two components: RecordsList & FullList(?) components
export const RecordsList = ( { recordsArray, accounts, categories, currencies, navigateEditRecordScreen } ) => {
	if ( recordsArray.length === 0 ) {
		return (
			<Text style={ styles.getStartedText }>{ 'No records yet.' }</Text>
		);
	}

	recordsArray.sort( ( a, b ) => a.createdAt < b.createdAt );

	const list = recordsArray.reduce( ( acc, record ) => {
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
			const category = categories.byId[ record.categoryId ];
			const account = accounts.byId[ record.accountId ];
			const amount = getRecordAmountWithCurrency( record, currencies.byId );
			if ( category ) {
				result.push( <RecordsItem
					key={ `${ idx }-${ index }` }
					record={ record }
					category={ category }
					accountColor={ account.colorCode }
					amount={ amount }
					navigateEditRecordScreen={ navigateEditRecordScreen }
				/> );
			} else {
				result.push( <TransferItem
					key={ `${ idx }-${ index }` }
					record={ record }
					accountColor={ account.colorCode }
					amount={ amount }
					navigateEditRecordScreen={ navigateEditRecordScreen }
				/> );
			}
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

