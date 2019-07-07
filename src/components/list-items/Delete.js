/**
 * External dependencies
 */
import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { ListItem } from 'react-native-elements';
import PropTypes from 'prop-types';

const defaultIcon = {
	name: 'trash',
	type: 'font-awesome',
	color: 'black',
	size: 25,
	containerStyle: { paddingLeft: 15, paddingRight: 14 },
};

const defaultTitle = 'Delete';

const DeleteListItem = ( { title, icon, onPress } ) => {
	return (
		<ListItem
			title={ title ? title : defaultTitle }
			bottomDivider={ true }
			topDivider={ true }
			leftIcon={ icon ? icon : defaultIcon }
			// chevron
			// rightTitle={ 'Select' }
			onPress={ onPress }

			containerStyle={ styles.itemContainer }
			contentContainerStyle={ styles.contentContainer }
			rightContentContainerStyle={ styles.rightContentContainer }
		/>
	);
};

export default DeleteListItem;

const styles = StyleSheet.create( {
	container: {
		paddingTop: 3,
		paddingBottom: 3,
		height: 55,
	},
	// contentContainer: { flex: 2 },
	// rightContentContainer: { flex: 1 },
} );

DeleteListItem.propTypes = {
	onPress: PropTypes.func.isRequired,
	title: PropTypes.string,
	icon: PropTypes.object,
};
