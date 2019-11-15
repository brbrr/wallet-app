/**
 * External dependencies
 */
import React from 'react';
import { View } from 'react-native';
import { Icon, ListItem } from 'react-native-elements';
/**
 * Internal dependencies
 */
import styles from './styles';
import { getTime } from '../../utils/time-helper';

const TransferItem = ( { accountColor, amount, record, navigateEditRecordScreen } ) =>
	<ListItem
		containerStyle={ { paddingTop: 3, paddingBottom: 3 } }
		title="Transfer"

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
					name="exchange"
					type="font-awesome"
					reverse
					reverseColor="white"
					color={ 'black' }
					size={ 20 }
				/>
				<View style={ styles.accountIndicator( accountColor ) } />
			</View>
		}
		onPress={ () => navigateEditRecordScreen( record.id ) }
	/>;

export default TransferItem;
