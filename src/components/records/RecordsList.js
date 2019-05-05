/**
 * External dependencies
 */
import React from 'react';
import { Text, ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements';
import moment from 'moment';

/**
 * Internal dependencies
 */
import RecordsItem from './RecordItem';
import { getRecordAmountWithCurrency } from '../../utils';

// TODO: separate in two components: RecordsList & FullList(?) components
export const RecordsList = ( { records, accounts, categories, currencies } ) => {
	if ( records.length === 0 ) {
		return (
			<Text style={ styles.getStartedText }>{ 'No records yet.' }</Text>
		);
	}

	records.sort( ( a, b ) => a.createdAt < b.createdAt );

	const list = records.reduce( ( acc, record, id ) => {
		const date = new Date( record.createdAt );
		const recordDate = date.toISOString().split( 'T' )[ 0 ];

		if ( ! acc[ recordDate ] ) {
			acc[ recordDate ] = [ record ];
		} else {
			acc[ recordDate ].push( record );
		}
		return acc;
	}, {} );

	const result = [];
	const scrollIndexes = [];

	// Complex-ish way to generate a list of records with relevant dates and amounts
	Object.entries( list ).forEach( ( [ _, itemsList ], idx ) => {
		const niceDate = moment( itemsList[ 0 ].createdAt ).format( 'MMMM D' );
		const totalPerDay = itemsList.reduce( ( acc, rec ) => acc += rec.amount, 0 );

		scrollIndexes.push( result.length );
		result.push(
			<ListItem
				key={ `${ idx }-${ niceDate }` }
				containerStyle={ { paddingTop: 3, paddingBottom: 3 } }
				title={ niceDate }
				rightContentContainerStyle={ { flex: 1 } }
				rightTitle={ totalPerDay.toString() }

				rightTitleStyle={ { fontWeight: 'bold', color: 'black' } }
				bottomDivider={ true }
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
			/> );
		} );
	} );

	// let prevDate = null;
	// const result = [];
	// records.forEach( ( record, idx ) => {
	// 	const category = categories[ record.categoryId ];
	// 	const currency = currencies[ record.currencyId ];
	// 	const account = accounts[ record.accountId ];
	// 	const amount = getAmount( currency.name, record.amount, record.typeId );
	// 	const niceDate = new Date( record.createdAt ).toISOString().split( 'T' )[ 0 ];
	// 	if ( ! prevDate || ! prevDate.isSame( moment( record.createdAt ), 'day' ) ) {
	// 		prevDate = moment( record.createdAt );
	// 		result.push( <Text key={ `${ idx }-${ niceDate }` } >{ niceDate }</Text> );
	// 	}
	// 	result.push( <RecordsItem
	// 		key={ idx }
	// 		record={ record }
	// 		category={ category }
	// 		account={ account }
	// 		amount={ amount }
	// 	/> );
	// } );

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

