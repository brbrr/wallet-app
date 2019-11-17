/**
 * External dependencies
 */
import React from 'react';
import { StyleSheet, ScrollView, Platform } from 'react-native';
import { ListItem, Button } from 'react-native-elements';
import { connect } from 'react-redux';

class SettingsScreen extends React.Component {
	static navigationOptions = {
		title: 'Settings',
	};

	render() {
		return (
			<ScrollView style={ styles.container }>
				<ListItem
					containerStyle={ styles.itemContainer }
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
					onPress={ () => this.props.navigation.navigate( 'SettingsAccounts', { enableReorder: true } ) }
				/>

				<ListItem
					containerStyle={ styles.itemContainer }
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

				<ListItem
					containerStyle={ styles.itemContainer }
					contentContainerStyle={ { flex: 2 } }
					rightContentContainerStyle={ { flex: 1 } }
					title="Categories"
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
					onPress={ () => this.props.navigation.navigate( 'SettingsCategories', { isEdit: true } ) }
				/>

				<Button
					containerStyle={ { flexDirection: 'row', alignSelf: 'flex-end' } }
					title="Purge DB"
					onPress={ () => this.restState } />
			</ScrollView>
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
		} ),
	},
	itemContainer: { paddingTop: 3, paddingBottom: 3, height: 55 },
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

const mapStateToProps = () => ( {} );

const mapDispatchToProps = ( dispatch ) => ( { restState: dispatch( { type: 'PURGE_DATA' } ) } );

export default connect(
	mapStateToProps,
	mapDispatchToProps
)( SettingsScreen );

