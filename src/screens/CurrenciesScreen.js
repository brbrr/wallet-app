/**
 * External dependencies
 */
import React from 'react';
import { Button } from 'react-native';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import OptionSelector from '../components/OptionSelector';

class CurrenciesScreen extends React.Component {
	static navigationOptions = ( { navigation } ) => ( {
		title: 'Currencies',
		headerRight: (
			<Button
				onPress={ () => navigation.navigate( 'NewCurrency' ) }
				title="Add"
			/>
		),
		headerLeft: (
			<Button
				onPress={ () => navigation.goBack( null ) }
				title="Back"
			/>
		),
	} );

	selectItem = ( currencyId ) => {
		const { navigation } = this.props;
		const onStateChange = navigation.getParam( 'onStateChange' );

		onStateChange( { currencyId } );
		navigation.goBack( null );
	}

	render() {
		const { currencies, navigation } = this.props;

		return (
			<OptionSelector
				items={ Object.values( currencies.byId ) }
				selectItem={ ( currencyId ) => this.selectItem( currencyId ) }
				navigation={ navigation }
				nameValue="code"
			/>
		);
	}
}

const mapStateToProps = ( { currencies } ) => ( { currencies } );

const mapDispatchToProps = () => ( {} );

export default connect(
	mapStateToProps,
	mapDispatchToProps
)( CurrenciesScreen );

class SCurrenciesScreen extends CurrenciesScreen {
	selectItem = ( currencyId ) => {
		this.props.navigation.navigate( 'Currency', { currencyId } );
	}
}

export const SettingsCurrenciesScreen = connect(
	mapStateToProps,
	mapDispatchToProps
)( SCurrenciesScreen );

