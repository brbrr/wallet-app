/**
 * External dependencies
 */
import React from 'react';
import { StyleSheet, ScrollView, Platform } from 'react-native';
import { ListItem } from 'react-native-elements';
import DraggableFlatList from 'react-native-draggable-flatlist';

export default class SettingsScreen extends React.Component {
	static navigationOptions = {
		title: 'Settings',
	};

	render() {
		return (
			<ScrollView style={ styles.container }>
				<ListItem
					containerStyle={ { paddingTop: 3, paddingBottom: 3, height: 55 } }
					contentContainerStyle={ { flex: 2 } }
					rightContentContainerStyle={ { flex: 1 } }
					title="Accounts"
					bottomDivider={ true }
					topDivider={ true }
					leftIcon={ {
						name: 'circle',
						type: 'font-awesome',
						color: 'blue',
						size: 42,
						containerStyle: { margin: -2 },
					} }
					chevron
					rightTitle={ 'Select' }
					onPress={ () => this.props.navigation.navigate( 'SettingsAccounts', { isEdit: true } ) }
				/>

				<ListItem
					containerStyle={ { paddingTop: 3, paddingBottom: 3, height: 55 } }
					contentContainerStyle={ { flex: 2 } }
					rightContentContainerStyle={ { flex: 1 } }
					title="Currencies"
					bottomDivider={ true }
					topDivider={ true }
					leftIcon={ {
						name: 'circle',
						type: 'font-awesome',
						color: 'blue',
						size: 42,
						containerStyle: { margin: -2 },
					} }
					chevron
					rightTitle={ 'Select' }
					onPress={ () => this.props.navigation.navigate( 'SettingsCurrencies', { isEdit: true } ) }
				/>
			</ScrollView>
		);
	}
}

export class SettingsScreen12 extends React.Component {
	static navigationOptions = {
		title: 'Settings',
	};

	state = {
		data: [ {
			key: `item-0`,
			name: 'Accounts',
			backgroundColor: `rgb(${ Math.floor( Math.random() * 255 ) }, ${ 0 * 5 }, ${ 132 })`,
		},
		{
			key: `item-1`,
			name: 'Currencies',
			backgroundColor: `rgb(${ Math.floor( Math.random() * 255 ) }, ${ 1 * 5 }, ${ 132 })`,
		} ],
	}

	renderItem = ( { item, index, move, moveEnd, isActive } ) => {
		return (
			<ListItem
				containerStyle={ { paddingTop: 3, paddingBottom: 3, height: 55 } }
				contentContainerStyle={ { flex: 2 } }
				rightContentContainerStyle={ { flex: 1 } }
				title={ item.name }
				bottomDivider={ true }
				topDivider={ true }
				leftIcon={ {
					name: item.icon ? item.icon : 'circle',
					type: 'font-awesome',
					color: 'blue',
					size: 42,
					containerStyle: { margin: -2 },
				} }
				chevron
				rightTitle={ 'Select' }
				onPress={ () => this.props.navigation.navigate( 'SettingsAccounts' ) }
				onLongPress={ move }
				onPressOut={ moveEnd }
			/>
		);
	}

	render() {
		return (
			<DraggableFlatList
				data={ this.state.data }
				renderItem={ this.renderItem }
				keyExtractor={ ( item, index ) => `draggable-item-${ item.key }` }
				scrollPercent={ 5 }
				onMoveEnd={ ( { data } ) => this.setState( { data } ) }
			/>
		);
	}
}

const styles = StyleSheet.create( {
	container: {
		backgroundColor: '#f9f9f9',
		flex: 1,

		...Platform.select( {
			ios: {
				paddingTop: 20,
			},
		} ) },
	iconContainer: {
		marginTop: 20,
		marginBottom: 20,
		height: 55,
		flexDirection: 'row',
	},
	currencyButton: {
		color: 'grey',
		padding: 3,
		borderWidth: 1,
		borderColor: 'grey',
		borderRadius: 3,
		backgroundColor: '#f9f9f9',
		marginLeft: 7,
		marginRight: 9,
	},
	amountTitle: { fontSize: 12, marginTop: 2 },
	amountInput: { color: 'black', textAlign: 'right' },
	colorBox: ( size, color ) => ( {
		width: size,
		height: size,
		backgroundColor: color,
		margin: 3,
	} ),
} );
