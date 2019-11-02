/**
 * External dependencies
 */
import { ListItem } from 'react-native-elements';
import { StyleSheet } from 'react-native';

const AccountListItem = ( { account, onPress } ) =>
	<ListItem
		containerStyle={ styles.iconContainer }
		title={ account.name }
		bottomDivider={ true }
		topDivider={ true }
		leftIcon={ {
			name: account.iconName,
			type: 'font-awesome',
			reverse: true,
			reverseColor: 'white',
			color: account.colorCode,
			size: 20,
			containerStyle: { margin: -4 },
		} }
		onPress={ onPress }
	/>;

export default AccountListItem;

const styles = StyleSheet.create( {
	iconContainer: {
		paddingTop: 3,
		paddingBottom: 3,
		height: 55,
  }
);
