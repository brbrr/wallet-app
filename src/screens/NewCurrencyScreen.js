/**
 * External dependencies
 */
import React from 'react';
import { Button, StyleSheet, ScrollView, Platform } from 'react-native';
import { connect } from 'react-redux';
import { ListItem, SearchBar } from 'react-native-elements';

/**
 * Internal dependencies
 */
import { addNewCurrency } from '../actions';
import currenciesList from '../utils/currenciesList';

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
			search: '',
		};
	}

	updateSearch = ( search ) => {
		this.setState( { search } );
	};

	addNewCurrencyAndGoBack = ( code, name ) => {
		const { navigation, _addNewCurrency } = this.props;
		_addNewCurrency( { code, name } );
		navigation.goBack( null );
	}

	render() {
		const { search } = this.state;

		const currencies = Object.entries( currenciesList )
			.filter( ( [ code, name ] ) => code.toLowerCase().includes( search.toLowerCase() ) || name.toLowerCase().includes( search.toLowerCase() ) )
			.map( ( [ code, name ], id ) => {
				return (
					<ListItem
						key={ id }
						containerStyle={ { paddingTop: 3, paddingBottom: 3, height: 55 } }
						contentContainerStyle={ { flex: 2 } }
						rightContentContainerStyle={ { flex: 1 } }
						title={ name }
						rightTitle={ code }
						bottomDivider={ true }
						topDivider={ true }
						onPress={ () => this.addNewCurrencyAndGoBack( code, name ) }
					/>
				);
			} );
		return (
			<ScrollView style={ styles.container } keyboardShouldPersistTaps="always" >
				<SearchBar
					placeholder="Type Here..."
					onChangeText={ this.updateSearch }
					value={ search }
					platform={ Platform.OS }
				/>
				{ currencies }
			</ScrollView>
		);
	}
}

const mapDispatchToProps = ( dispatch ) => {
	return {
		_addNewCurrency: ( account ) => dispatch( addNewCurrency( account ) ),
	};
};

export default connect(
	() => ( {} ),
	mapDispatchToProps
)( NewCurrencyScreen );

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
