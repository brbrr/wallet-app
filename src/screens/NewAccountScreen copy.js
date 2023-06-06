/**
 * External dependencies
 */
import React from 'react';
import { Button } from 'react-native';

/**
 * Internal dependencies
 */
import NewAccount from '../components/accounts/NewAccount';

export default class NewAccountScreen extends React.Component {
	static navigationOptions = ( { navigation } ) => {
		const rightButtonTitle = navigation.state.params && navigation.state.params.isEdit ? 'Save' : 'Add';

		return {
			title: 'New Account',
			headerRight: (
				<Button
					onPress={ () => navigation.state.params.persistAccountAndNavigate() }
					title={ rightButtonTitle }
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
		const isEdit = props.navigation.getParam( 'isEdit', false );
		this.state = {
			isEdit,
			currencyScreen: 'Currencies',
		};
	}

	navigateAfterPersist = () => this.props.navigation.goBack( null )

	bindMethodForHeader = ( func ) => this.props.navigation.setParams( { persistAccountAndNavigate: func } );

	render() {
		const { navigation } = this.props;

		const isEdit = navigation.getParam( 'isEdit', false );
		const accountId = navigation.getParam( 'accountId', null );

		return (
			<NewAccount
				isEdit={ isEdit }
				accountId={ accountId }
				bindMethodForHeader={ this.bindMethodForHeader }
				navigateAfterPersist={ this.navigateAfterPersist }
				navigate={ this.props.navigation.navigate }
				currencyScreen={ this.state.currencyScreen }
			/>
		);
	}
}

export class SettingsNewAccountsScreen extends NewAccountScreen {
	// onPressCurrency = () => {
	// 	if ( ! this.state.isEdit ) {
	// 		this.doNavigate( 'SettingsCurrencies' );
	// 	}
	// }
	constructor( props ) {
		super( props );
		const isEdit = props.navigation.getParam( 'isEdit', false );
		this.state = {
			isEdit,
			currencyScreen: 'SettingsCurrencies',
		};
	}
}
