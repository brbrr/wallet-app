/**
 * External dependencies
 */
import React from 'react';
import { StyleSheet, ScrollView, Platform, View, Text } from 'react-native';
import { connect } from 'react-redux';
/**
 * Internal dependencies
 */
import { addNewCurrency } from '../../actions';
import CurrencyList from '../../components/currencies/CurrenciesList';

class SelectCurrencyScreen extends React.Component {
	constructor( props ) {
		super( props );
		this.state = {
			name: null,
			balance: null,
			searchTerm: '',
		};
	}

	updateSearch = ( searchTerm ) => {
		this.setState( { searchTerm } );
	};

	addNewCurrencyAndGoBack = ( code, name ) => {
		const { navigation, _addNewCurrency } = this.props;
		_addNewCurrency( { code, name } );
		navigation.navigate( 'AddAccount' );
	}

	render() {
		return (
			<View style={ { flex: 1 } }>
				<View style={ { height: 60, marginTop: 20 } }>
					<Text>Select your default currency</Text>
				</View>
				<CurrencyList
					searchTerm={ this.state.searchTerm }
					currencies={ this.props.currencies }
					updateSearch={ this.updateSearch }
					noCurrencyPress={ this.addNewCurrencyAndGoBack }
				/>
			</View>
		);
	}
}

const mapStateToProps = ( { currencies } ) => ( { currencies } );
const mapDispatchToProps = ( dispatch ) => {
	return {
		_addNewCurrency: ( account ) => dispatch( addNewCurrency( account ) ),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)( SelectCurrencyScreen );
