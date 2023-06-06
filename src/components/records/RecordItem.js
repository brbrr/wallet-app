/**
 * External dependencies
 */
import React from 'react';
import { View } from 'react-native';
import { Icon, ListItem } from '@rneui/themed';
/**
 * Internal dependencies
 */
import styles from './styles';
import { getTime } from '../../utils/time-helper';

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

export default RecordsItem;
