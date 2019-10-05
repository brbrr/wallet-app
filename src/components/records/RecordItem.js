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

const RecordsItem = ( { category, accountColor, amount, record, navigateEditRecordScreen } ) => {
	return (
		<ListItem
			containerStyle={ { paddingTop: 3, paddingBottom: 3 } }
			title={ category.name }

			rightContentContainerStyle={ { flex: 1 } }

			rightTitle={ amount }
			rightTitleStyle={ { fontWeight: 'bold', color: 'black', fontSize: 14 } }

			subtitle={ record.description }
			subtitleStyle={ { fontSize: 12, color: 'gray' } }

			rightSubtitle={ getTime( record.createdAt ) }
			rightSubtitleStyle={ { fontSize: 12 } }
			leftIcon={
				<View >
					<Icon
						name={ category.iconName }
						type="font-awesome"
						reverse
						reverseColor="white"
						color={ category.colorCode }
						size={ 20 }
					/>
					<View style={ styles.accountIndicator( accountColor ) } />
				</View>
			}
			onPress={ () => navigateEditRecordScreen( record.id ) }
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
