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

		return (
			<ListItem
				containerStyle={ { paddingTop: 3, paddingBottom: 3, height: 55, marginTop: item.id === 0 ? 20 : 0 } }
				title={ item[ nameValue ] }
				bottomDivider={ true }
				topDivider={ true }
				leftIcon={ getIconConfiguration( item, { size: 20 } ) }
				onPress={ () => selectItem( item.id ) }
			/>
		);
	}

	keyExtractor = ( item ) => item.id.toString()

	render() {
		const { items } = this.props;

		return (
			<View style={ { backgroundColor: '#f9f9f9', flex: 1, paddingTop: 20 } }>
				<FlatList
					keyExtractor={ this.keyExtractor }
					data={ items }
					renderItem={ this.renderItem }
				/>
			</View>
		);
	}
}
