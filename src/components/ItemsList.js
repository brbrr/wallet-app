/**
 * External dependencies
 */
import React from 'react';
import { FlatList, View } from 'react-native';
import { ListItem } from 'react-native-elements';
/**
 * Internal dependencies
 */
import { getIconConfiguration } from './helper';

export default class ItemsList extends React.Component {
	static defaultProps = {
		nameValue: 'name',
	}

	renderItem = ( { item } ) => {
		const { selectItem, nameValue } = this.props;
		const icon = getIconConfiguration( item, { size: 20 } );

		return (
			<Item
				title={ item[ nameValue ] }
				selectItem={ selectItem }
				icon={ icon }
				id={ item.id }
			/>
		);
	}

	keyExtractor = ( item ) => item.id.toString()

	render() {
		const { items } = this.props;

		return (
			<View>
				<FlatList
					keyExtractor={ this.keyExtractor }
					data={ items }
					renderItem={ this.renderItem }
				/>
			</View>
		);
	}
}

export const Item = ( { id, icon, title, selectItem } ) => {
	return (
		<ListItem
			containerStyle={ { paddingTop: 3, paddingBottom: 3, height: 55 } }
			title={ title }
			bottomDivider={ true }
			topDivider={ true }
			leftIcon={ icon }
			onPress={ () => selectItem( id ) }
		/>
	);
};
