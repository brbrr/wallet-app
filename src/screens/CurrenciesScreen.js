/**
 * External dependencies
 */
import React from 'react';
import { Button } from 'react-native';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import ItemsList from '../components/ItemsList';

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
		const { currencies } = this.props;

		return (
			<ItemsList
				items={ Object.values( currencies.byId ) }
				selectItem={ ( currencyId ) => this.selectItem( currencyId ) }
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

