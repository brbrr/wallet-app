/**
 * External dependencies
 */
import React from 'react';
import { View, Text } from 'react-native';
import { Icon, ListItem } from 'react-native-elements';

function getAmount( currency, amount, type ) {
	switch ( type ) {
		case 0:
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
	const { records, accounts, categories, currencies } = props;

	records.sort( ( a, b ) => a.id < b.id );

	if ( records.length === 0 ) {
		return (
			<Text style={ styles.getStartedText }>{ 'No records yet.' }</Text>
		);
	}

	return (
		<View>
			{
				records.map( ( record, idx ) => {
					const category = categories[ record.categoryId ];
					const currency = currencies[ record.currencyId ];
					const account = accounts[ record.accountId ];

					const amount = getAmount( currency.name, record.amount, record.typeId );

					return (
						<ListItem
							containerStyle={ { paddingTop: 3, paddingBottom: 3 } }
							key={ idx }
							title={ category.name }

							rightContentContainerStyle={ { flex: 1 } }

							rightTitle={ amount }
							rightTitleStyle={ { fontWeight: 'bold', color: 'black' } }

							subtitle={ record.description }
							subtitleStyle={ { fontSize: 12 } }

							rightSubtitle={ getTime( record.createdAt ) }
							rightSubtitleStyle={ { fontSize: 12 } }
							bottomDivider={ true }
							leftIcon={
								<View >
									<Icon
										name={ category.icon }
										type="font-awesome"
										reverse
										reverseColor="white"
										color={ category.color }
										size={ 20 }
									/>
									<View style={
										{
											width: 10,
											height: 10,
											borderRadius: 10 / 2,
											backgroundColor: account.color,
											position: 'absolute',
											bottom: 8,
											zIndex: 5,
											left: 41,
										}
									} />
								</View>
							}
						/>
					);
				} )
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

