/**
 * External dependencies
 */
import React from 'react';
import { Text } from 'react-native';
import { ListItem } from 'react-native-elements';
// import { ScrollView } from 'react-native-gesture-handler';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';

export default class RecordOptionSelector extends React.Component {
	static defaultProps = {
		nameValue: 'name',
	}

	constructor( props ) {
		super( props );

		this.state = { isMoving: true };
	}

	selectItemAndGoBack( id ) {
		const { selectItem, navigation, isEdit } = this.props;
		if ( isEdit ) {
			// TODO: Maybe navigate to Account edit screen
			return;
		}

		selectItem( id );
		navigation.goBack( null );
	}

	getIconConfiguration( item ) {
		let iconConfiguration = null;
		if ( item.icon ) {
			iconConfiguration = {
				name: item.icon,
				type: 'font-awesome',
				reverse: true,
				reverseColor: 'white',
				color: item.color,
				size: 20,
				containerStyle: { margin: -2 },
			};
		}

		return iconConfiguration;
	}

	renderItem = ( { item, index, move, moveEnd, isActive } ) => {
		const { nameValue, isEdit } = this.props;
		const { isMoving } = this.state;

		const _onPress = isEdit && isMoving ? move : () => this.selectItemAndGoBack( item.id );

		console.log( _onPress );
		return (
			<ListItem
				containerStyle={ { paddingTop: 3, paddingBottom: 3, height: 55, backgroundColor: isActive ? 'blue' : 'red' } }
				Component={ TouchableOpacity }
				contentContainerStyle={ { flex: 2 } }
				rightContentContainerStyle={ { flex: 1 } }
				title={ item[ nameValue ] }
				bottomDivider={ true }
				topDivider={ true }
				chevron
				rightTitle={ 'Select' }
				leftIcon={ this.getIconConfiguration( item ) }
				onPressIn={ _onPress }
				onPressOut={ moveEnd }
			/>
		);
	}

	render() {
		const { items, nameValue } = this.props;

		if ( items.length === 0 ) {
			return (
				<Text>{ 'No items yet.' }</Text>
			);
		}

		console.log( items );

		return (
			<DraggableFlatList
				data={ items }
				renderItem={ this.renderItem }
				keyExtractor={ ( item, id ) => `draggable-item-${ id }` }
				// scrollPercent={ 5 }
				onMoveEnd={ ( { data } ) => this.setState( { data } ) }
			/>
		);

		// return (
		// 	<ScrollView style={ { backgroundColor: '#f9f9f9', flex: 1 } }>
		// 		{
		// 			items.map( ( item, idx ) => {
		// 				return (
		// 					<ListItem
		// 						containerStyle={ { paddingTop: 3, paddingBottom: 3, height: 55, marginTop: idx === 0 ? 20 : 0 } }
		// 						key={ idx }
		// 						title={ item[ nameValue ] }
		// 						bottomDivider={ true }
		// 						topDivider={ true }
		// 						leftIcon={ this.getIconConfiguration( item ) }
		// 						onPress={ () => this.selectItemAndGoBack( item.id ) }
		// 					/>
		// 				);
		// 			} )
		// 		}
		// 	</ScrollView>
		// );
	}
}
