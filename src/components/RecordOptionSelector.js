/**
 * External dependencies
 */
import React from 'react';
import { Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';

export default class RecordOptionSelector extends React.Component {
	selectItemAndGoBack( id ) {
		const { selectItem, navigation } = this.props;
		selectItem( id );
		navigation.goBack();
	}

	getIconConfiguration( icon ) {
		let iconConfiguration = null;
		if ( icon ) {
			iconConfiguration = {
				name: icon,
				type: 'font-awesome',
				reverse: true,
				reverseColor: 'white',
				color: 'red',
				size: 20,
				containerStyle: { margin: -2 },
			};
		}

		return iconConfiguration;
	}

	render() {
		const { items } = this.props;
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
								title={ item.name }
								bottomDivider={ true }
								topDivider={ true }
								leftIcon={ this.getIconConfiguration( item.icon ) }
								onPress={ () => this.selectItemAndGoBack( item.id ) }
							/>
						);
					} )
				}
			</ScrollView>
		);
	}
}
