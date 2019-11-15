/**
 * External dependencies
 */
import React from 'react';
import { ListItem } from 'react-native-elements';

/**
 * Internal dependencies
 */
import { TRANSFER } from '../../constants/Records';
import { getIconConfiguration } from '../helper';
import styles from './styles';

const CategoryListItem = ( { category, typeId, onNavigation } ) => {
	if ( typeId === TRANSFER ) {
		return null;
	}

	return (
		<ListItem
			containerStyle={ styles.iconContainer }
			title={ category.name }
			bottomDivider={ true }
			topDivider={ true }
			leftIcon={ getIconConfiguration( category, { size: 20, containerStyle: { margin: -4 } } ) }
			onPress={ onNavigation }
		/>
	);
};

export default CategoryListItem;
