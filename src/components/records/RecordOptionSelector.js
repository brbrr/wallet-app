/**
 * External dependencies
 */
import React from 'react';
import { Text, ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements';

export default class RecordOptionSelector extends React.Component {
	static defaultProps = {
		nameValue: 'name',
	}

	// TODO: extract into shared function
	getIconConfiguration( item ) {
		let iconConfiguration = null;
		if ( item.iconName ) {
			iconConfiguration = {
				name: item.iconName,
				type: 'font-awesome',
				reverse: true,
				reverseColor: 'white',
				color: item.colorCode,
				size: 20,
				containerStyle: { margin: -2 },
			};
		}

		return iconConfiguration;
	}

	render() {
		const { items, nameValue, selectItem } = this.props;

		if ( items.length === 0 ) {
			return (
				<Text>{ 'No items yet.' }</Text>
			);
		}

		return (
			<ScrollView style={ { backgroundColor: '#f9f9f9', flex: 1 } }>
				{
					items.map( ( item, idx ) => {
						return (
							<ListItem
								containerStyle={ { paddingTop: 3, paddingBottom: 3, height: 55, marginTop: idx === 0 ? 20 : 0 } }
								key={ idx }
								title={ item[ nameValue ] }
								bottomDivider={ true }
								topDivider={ true }
								leftIcon={ this.getIconConfiguration( item ) }
								onPress={ () => selectItem( item.id ) }
							/>
						);
					} )
				}
			</ScrollView>
		);
	}
}
