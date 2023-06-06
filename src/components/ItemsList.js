/**
 * External dependencies
 */
import React from 'react';
import { FlatList } from 'react-native';
import { ListItem } from '@rneui/themed';
/**
 * Internal dependencies
 */
import { getIconConfiguration } from './helper';

export default class ItemsList extends React.Component {
	static defaultProps = {
		nameValue: 'name',
	};

	renderItem = ( { item } ) => {
		const { selectItem, nameValue, itemProps } = this.props;
		const icon = getIconConfiguration( item, { size: 20 } );

		return (
			<Item
				title={ item[ nameValue ] }
				selectItem={ selectItem }
				icon={ icon }
				id={ item.id }
				{ ...itemProps }
			/>
		);
	};

	keyExtractor = ( item ) => item.id.toString();

	render() {
		const { items, style } = this.props;

		return (
			<FlatList
				keyExtractor={ this.keyExtractor }
				data={ items }
				renderItem={ this.renderItem }
				style={ style }
			/>
		);
	}
}

export const Item = ( { id, icon, title, selectItem, ...props } ) => {
	return (
		<ListItem
			containerStyle={ { paddingTop: 3, paddingBottom: 3, height: 55 } }
			title={ title }
			bottomDivider={ true }
			topDivider={ true }
			leftIcon={ icon }
			onPress={ () => selectItem( id ) }
			{ ...props }
		/>
	);
};
