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
	size: 42,
	containerStyle: { margin: -2 },
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
		flex: 1,
		backgroundColor: '#eee',

		...Platform.select( {
			ios: {
				paddingTop: 20,
			},
		} ),
	},
	contentContainer: { flex: 2 },
	rightContentContainer: { flex: 1 },
} );

DeleteListItem.propTypes = {
	onPress: PropTypes.func.isRequired,
	title: PropTypes.string,
	icon: PropTypes.object,
};
