/**
 * External dependencies
 */
import React from 'react';
import { StyleSheet } from 'react-native';
import { Platform } from 'react-native';
import { Text, View, Button } from 'react-native';
/**
 * Internal dependencies
 */
import NewAccount from '../../components/accounts/NewAccount';

export default class AddAccountScreen extends React.Component {
	static navigationOptions = ( { navigation } ) => {
		return {
			title: 'Add Account',
			headerRight: (
				<Button
					onPress={ () => navigation.state.params.persistAccountAndNavigate() }
					title={ 'Add' }
				/>
			),
			headerLeft: (
				<Button
					onPress={ () => navigation.goBack( null ) }
					title="Back"
				/>
			),
		};
	};

	constructor( props ) {
		super( props );
		this.state = {
			currencyScreen: 'Currencies',
		};
	}

	navigateAfterPersist = () => this.props.navigation.navigate( 'Main' )

	bindMethodForHeader = ( func ) => this.props.navigation.setParams( { persistAccountAndNavigate: func } );

	render() {
		const { navigation } = this.props;

		const accountId = navigation.getParam( 'accountId', null );

		return (
			<View style={ styles.container }>
				<Text>O, Hi!</Text>
				<Text>Welcome to this new fancy app!</Text>

				<NewAccount
					isEdit={ false }
					accountId={ accountId }
					bindMethodForHeader={ this.bindMethodForHeader }
					navigateAfterPersist={ this.navigateAfterPersist }
					navigate={ this.props.navigation.navigate }
					currencyScreen={ this.state.currencyScreen }
				/>
				<Button
					title="Solid Button"
					onPress={ () => this.props.navigation.state.params.persistAccountAndNavigate() }
				/>
			</View>

		);
	}
}

const styles = StyleSheet.create( {
	container: {
		flex: 1,
		backgroundColor: '#eee',

		...Platform.select( {
			ios: {
				paddingTop: 20,
			},
		} ),
	},
} );
