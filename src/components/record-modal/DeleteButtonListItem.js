/**
 * External dependencies
 */
import React from 'react';
import { Button } from 'react-native';
import { ListItem } from '@rneui/themed';
/**
 * Internal dependencies
 */
import styles from './styles';

const DeleteButtonListItem = ( { onPress } ) => {
	return <ListItem
		containerStyle={ styles.iconContainer }
		title={
			<Button
				onPress={ onPress }
				title="Delete"
				color="red"
			/>
		}
		bottomDivider={ true }
		topDivider={ true }
	/>;
};

export default DeleteButtonListItem;
