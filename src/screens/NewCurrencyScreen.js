/**
 * External dependencies
 */
import React from 'react';
import { Button, StyleSheet, ScrollView, Platform } from 'react-native';
import { connect } from 'react-redux';
// import { ListItem, SearchBar } from '@rneui/themed';

/**
 * Internal dependencies
 */
import { addNewCurrency } from '../actions';
import CurrencyList from '../components/currencies/CurrenciesList';

class NewCurrencyScreen extends React.Component {
	static navigationOptions = ( { navigation } ) => ( {
		title: 'New Currency',
		headerLeft: (
			<Button
				onPress={ () => navigation.goBack( null ) }
				title="Back"
			/>
		),
	} );

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
		navigation.goBack( null );
	};

	render() {
		return (
			<CurrencyList
				searchTerm={ this.state.searchTerm }
				currencies={ this.props.currencies }
				updateSearch={ this.updateSearch }
				onCurrencyPress={ this.addNewCurrencyAndGoBack }
			/>
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
	mapDispatchToProps,
)( NewCurrencyScreen );
