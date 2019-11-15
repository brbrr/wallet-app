/**
 * External dependencies
 */
import React from 'react';
import { Input, ListItem } from 'react-native-elements';

/**
 * Internal dependencies
 */
import styles from './styles';

const DescriptionListItem = ( { description, onStateChange } ) =>
	<ListItem
		containerStyle={ Object.assign( {}, styles.iconContainer, { height: 70 } ) }
		title={
			<Input
				containerStyle={ { paddingHorizontal: 0 } }
				inputContainerStyle={ { borderBottomWidth: 0 } }
				value={ description }
				placeholder="Description"
				onChangeText={ ( desc ) => onStateChange( { description: desc } ) }
			/>
		}
		bottomDivider={ true }
		topDivider={ true }
		leftIcon={ {
			name: 'md-text',
			type: 'ionicon',
			size: 25,
			containerStyle: { paddingLeft: 15, paddingRight: 14 },
		} }
	/>;

export default DescriptionListItem;
