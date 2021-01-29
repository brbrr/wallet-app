/**
 * External dependencies
 */
import React from 'react';
import { StyleSheet, ScrollView, Platform } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
/**
 * Internal dependencies
 */
import currenciesListData from '../../utils/currenciesListData';

const CurrencyList = ( { searchTerm, updateSearch, noCurrencyPress, currencies } ) => {
	const addedCurrenciesList = Object.values( currencies.byId );
	const currencyItems = Object.entries( currenciesListData )
		.filter( ( [ code ] ) => ! addedCurrenciesList.find( ( c ) => c.code === code ) )
		.filter( ( [ code, name ] ) => {
			if ( searchTerm.length > 1 ) {
				return code.toLowerCase().includes( searchTerm.toLowerCase() ) || name.toLowerCase().includes( searchTerm.toLowerCase() );
			}
			return true;
		} )
		.map( ( [ code, name ], id ) => (
			<ListItem
				key={ id }
				containerStyle={ styles.listItemContainer }
				contentContainerStyle={ styles.listItemContent }
				rightContentContainerStyle={ styles.listItemRightContent }
				title={ name }
				rightTitle={ code }
				bottomDivider={ true }
				topDivider={ true }
				onPress={ () => noCurrencyPress( code, name ) }
			/>
		) );

	return (
		<ScrollView style={ styles.container } keyboardShouldPersistTaps="always" >
			<SearchBar
				placeholder="Type Here..."
				onChangeText={ updateSearch }
				value={ searchTerm }
				platform={ Platform.OS }
			/>
			{ currencyItems }
		</ScrollView>
	);
};

export default CurrencyList;

const styles = StyleSheet.create( {
	container: { backgroundColor: '#f9f9f9', flex: 1 },
	listItemContainer: { paddingTop: 3, paddingBottom: 3, height: 55 },
	listItemContent: { flex: 2 },
	listItemRightContent: { flex: 1 },
} );
