/**
 * External dependencies
 */
import React from 'react';
import { Button, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { ListItem, Input } from 'react-native-elements';

/**
 * Internal dependencies
 */
import { addNewAccount } from '../actions';

class NewAccountScreen extends React.Component {
	static navigationOptions = ( { navigation } ) => ( {
		title: 'New Account',
		headerRight: (
			<Button
				onPress={ () => navigation.state.params.createNewAccountAndGoBack() }
				title="Add"
			/>
		),
		headerLeft: (
			<Button
				onPress={ () => navigation.goBack() }
				title="Back"
			/>
		),
	} );

	constructor( props ) {
		super( props );
		this.state = {
			name: null,
			balance: null,
		};
		this.props.navigation.setParams(
			{ createNewAccountAndGoBack: this.createNewAccountAndGoBack.bind( this ) }
		);
	}

	createNewAccountAndGoBack() {
		const { name, balance } = this.state;
		const { navigation, _addNewAccount } = this.props;
		const color = navigation.getParam( 'colorCode', 'blue' );
		const icon = navigation.getParam( 'iconName', 'car' );
		const currencyId = navigation.getParam( 'currencyId', 1 );

		_addNewAccount( { name, color, icon, currencyId, balance } );
		navigation.goBack();
	}

	render() {
		const { name, balance } = this.state;
		const { navigation } = this.props;
		const colorCode = navigation.getParam( 'colorCode', 'blue' );
		const iconName = navigation.getParam( 'iconName', 'car' );
		return (
			<ScrollView style={ styles.container } keyboardShouldPersistTaps="always" >
				<ListItem
					containerStyle={ styles.iconContainer }
					title="Name"
					rightTitle={ <Input
						inputContainerStyle={ { borderBottomWidth: 0 } }
						inputStyle={ styles.amountInput }
						value={ name }
						placeholder="Account name"
						onChangeText={ ( n ) => this.setState( { name: n } ) }
						autoFocus
					/> }
					contentContainerStyle={ { flex: 2 } }
					rightContentContainerStyle={ { flex: 4 } }
					bottomDivider={ true }
					topDivider={ true }
				/>

				<ListItem
					containerStyle={ styles.iconContainer }
					title="Balance"
					rightTitle={ <Input
						inputContainerStyle={ { borderBottomWidth: 0 } }
						inputStyle={ styles.amountInput }
						value={ balance }
						placeholder="0.0"
						keyboardType="numeric"
						onChangeText={ ( b ) => this.setState( { balance: b } ) }
					/> }
					contentContainerStyle={ { flex: 2 } }
					rightContentContainerStyle={ { flex: 4 } }
					bottomDivider={ true }
					topDivider={ true }
				/>

				<ListItem
					containerStyle={ { paddingTop: 3, paddingBottom: 3, height: 55 } }
					contentContainerStyle={ { flex: 2 } }
					rightContentContainerStyle={ { flex: 1 } }
					title={ 'Color' }
					bottomDivider={ true }
					topDivider={ true }
					leftIcon={ {
						name: 'circle',
						type: 'font-awesome',
						color: colorCode,
						size: 42,
						containerStyle: { margin: -2 },
					} }
					chevron
					rightTitle={ 'Select' }
					onPress={ () => navigation.navigate( 'ColorSelector', { parent: 'NewAccount' } ) }
				/>

				<ListItem
					containerStyle={ { paddingTop: 3, paddingBottom: 3, height: 55 } }
					contentContainerStyle={ { flex: 2 } }
					rightContentContainerStyle={ { flex: 1 } }

					title={ 'Icon ' + iconName }
					bottomDivider={ true }
					topDivider={ true }
					leftIcon={ {
						name: iconName,
						type: 'font-awesome',
						color: 'black',
						size: 42,
						containerStyle: { margin: -2 },
					} }
					chevron
					rightTitle={ 'Select' }
					onPress={ () => navigation.navigate( 'IconSelector', { parent: 'NewAccount' } ) }
				/>
			</ScrollView>
		);
	}
}

const mapDispatchToProps = ( dispatch ) => {
	return {
		_addNewAccount: ( account ) => dispatch( addNewAccount( account ) ),
	};
};

export default connect(
	() => ( {} ),
	mapDispatchToProps
)( NewAccountScreen );

const styles = StyleSheet.create( {
	container: { backgroundColor: '#f9f9f9', flex: 1 },
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
