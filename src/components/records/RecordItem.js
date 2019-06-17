/**
 * External dependencies
 */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Icon, ListItem } from 'react-native-elements';
import moment from 'moment';

function getTime( timestamp ) {
	return moment( timestamp ).format( 'HH:mm' );
}

const RecordsItem = ( { category, account, amount, record, navigateEditRecordScreen } ) => {
	return (
		<ListItem
			containerStyle={ { paddingTop: 3, paddingBottom: 3 } }
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
					<View style={ styles.accountIndicator( account.color ) } />
				</View>
			}
			onPress={ () => navigateEditRecordScreen( record ) }
		/>
	);
};

const styles = StyleSheet.create( {
	accountIndicator: ( color ) => ( {
		width: 10,
		height: 10,
		borderRadius: 10 / 2,
		backgroundColor: color,
		position: 'absolute',
		bottom: 8,
		zIndex: 5,
		left: 41,
	} ),
} );

export default RecordsItem;