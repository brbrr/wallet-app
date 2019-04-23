/**
 * External dependencies
 */
import React from 'react';
import { View, Image, Text } from 'react-native';
import { Button, Input, Card, ListItem, Avatar } from 'react-native-elements';

const categoriesMapping = {
	general: 'shopping-basket',
	groceries: 'shopping-basket',
	cafe: 'coffee',
	restaurant: 'utensils',
};

function getAmount( { currency, amount, type } ) {
	switch ( type ) {
		case 'expense':
			return `-${ currency }${ amount }`;
		default:
			return `${ currency }${ amount }`;
	}
}

function getTime( timestamp ) {
	const date = new Date( timestamp );
	const hours = date.getHours();
	const minutes = ( date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes() );
	return hours + ':' + minutes;
}

export const RecordsList = ( props ) => {
	const { records } = props;
	records.sort( ( a, b ) => a.id < b.id );

	if ( records.length === 0 ) {
		return (
			<Text style={ styles.getStartedText }>{ 'No records yet.' }</Text>
		);
	}

	return (
		<View>
			{
				records.map( ( record, idx ) => (
					<ListItem
						containerStyle={ { paddingTop: 3, paddingBottom: 3 } }
						key={ idx }
						title={ record.category }

						rightContentContainerStyle={ { flex: 1 } }

						rightTitle={ getAmount( record ) }
						rightTitleStyle={ { fontWeight: 'bold', color: 'black' } }

						subtitle={ record.description }
						subtitleStyle={ { fontSize: 12 } }

						rightSubtitle={ getTime( record.createdAt ) }
						rightSubtitleStyle={ { fontSize: 12 } }

						leftIcon={ { name: categoriesMapping[ record.category.toLowerCase() ],
							type: 'font-awesome', reverse: true, reverseColor: 'white', color: 'red', size: 20 } }
						bottomDivider={ true }
					/>
				) )
			}
		</View>
	);
};

const styles = {
	flexView: {
		flex: 1,
		flexDirection: 'row',
	},
	containerStyle: {
		borderWidth: 1,
		borderRadius: 2,
		borderColor: '#ddd',
		borderBottomWidth: 0,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
		elevation: 1,
		marginLeft: 5,
		marginRight: 5,
		marginTop: 10,
	},
};

