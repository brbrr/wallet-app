/**
 * External dependencies
 */
import React from 'react';
import { ListItem } from '@rneui/themed';
import { StyleSheet } from 'react-native';
/**
 * Internal dependencies
 */
import { getIconConfiguration } from '../helper';

const AccountListItem = ( { account, onPress } ) =>
	<ListItem
		containerStyle={ styles.iconContainer }
		title={ account.name }
		bottomDivider={ true }
		topDivider={ true }
		leftIcon={ getIconConfiguration( account, { size: 20, containerStyle: { margin: -4 } } ) }
		onPress={ onPress }
	/>;

export default AccountListItem;

const styles = StyleSheet.create( {
	iconContainer: {
		paddingTop: 3,
		paddingBottom: 3,
		height: 55,
	},
} );
