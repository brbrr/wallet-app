/**
 * External dependencies
 */
import React from 'react';
import { StyleSheet, ScrollView, Platform } from 'react-native';
import { ListItem, SearchBar } from '@rneui/themed';
import { connect } from 'react-redux';
/**
 * Internal dependencies
 */
import { addNewCurrency } from '../../actions';
import currenciesListData from '../../utils/currenciesListData';

class CurrencyList extends React.Component {
	constructor( props ) {
		super( props );
		this.state = {
			searchTerm: '',
		};
	}

	updateSearch = ( searchTerm ) => {
		this.setState( { searchTerm } );
	};

	addNewCurrencyAndNavigate = ( code, name ) => {
		const { navigation, _addNewCurrency } = this.props;
		_addNewCurrency( { code, name } );
		navigation.navigate( 'AddAccount' );
	};

	filterAvailableCurrencies() {
		const { searchTerm } = this.state;
		const addedCurrenciesList = Object.values( this.props.currencies.byId );

		return Object.entries( currenciesListData )
			.filter( ( [ code ] ) => ! addedCurrenciesList.find( ( c ) => c.code === code ) )
			.filter( ( [ code, name ] ) => {
				if ( searchTerm.length > 1 ) {
					return code.toLowerCase().includes( searchTerm.toLowerCase() ) || name.toLowerCase().includes( searchTerm.toLowerCase() );
				}
				return true;
			} );
	}

	renderCurrencyItems() {
		const availableCurrencies = this.filterAvailableCurrencies();

		return availableCurrencies.map( ( [ code, name ], id ) => (
			<ListItem
				key={ id }
				containerStyle={ styles.listItemContainer }
				contentContainerStyle={ styles.listItemContent }
				rightContentContainerStyle={ styles.listItemRightContent }
				title={ name }
				rightTitle={ code }
				bottomDivider={ true }
				topDivider={ true }
				onPress={ () => this.addNewCurrencyAndNavigate( code, name ) }
			/>
		) );
	}

	render() {
		return (
			<ScrollView style={ styles.container } keyboardShouldPersistTaps="always" >
				<SearchBar
					placeholder="Type Here..."
					onChangeText={ this.updateSearch }
					value={ this.state.searchTerm }
					platform={ Platform.OS }
				/>
				{ this.renderCurrencyItems() }
			</ScrollView>
		);
	}
}

const mapStateToProps = ( { currencies } ) => ( { currencies } );
const mapDispatchToProps = ( dispatch ) => {
	return {
		_addNewCurrency: ( currency ) => dispatch( addNewCurrency( currency ) ),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)( CurrencyList );

const styles = StyleSheet.create( {
	container: { backgroundColor: '#f9f9f9', flex: 1 },
	listItemContainer: { paddingTop: 3, paddingBottom: 3, height: 55 },
	listItemContent: { flex: 2 },
	listItemRightContent: { flex: 1 },
} );
