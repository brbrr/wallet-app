/**
 * External dependencies
 */
import React from 'react';
import { Button, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { ListItem } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import fx from 'money';
import { round } from 'lodash';

/**
 * Internal dependencies
 */
import data from '../utils/conversion-rates';

/**
 * Internal dependencies
 */
import { getCurrencyById, getDefaultAccountCurrency } from '../selectors';

class CurrencyScreen extends React.Component {
	static navigationOptions = ( { navigation } ) => {
		return {
			title: 'Edit Currency',
			headerRight: (
				<Button
					onPress={ () => navigation.state.params.saveCurrency() }
					title="Save (n/i)"
				/>
			),
			headerLeft: (
				<Button
					onPress={ () => navigation.goBack( null ) }
					title="Back"
				/>
			) };
	};

	constructor( props ) {
		super( props );
		const currencyId = props.navigation.getParam( 'currencyId', null );
		const currency = getCurrencyById( props, currencyId );

		this.state = currency;

		this.props.navigation.setParams(
			{ saveCurrency: this.saveCurrency }
		);
	}

	saveCurrency = () => {
		console.log( 'SAVE CURRENCY!' );
	}

	render() {
		const { code } = this.state;

		fx.base = data.base;
		fx.rates = data.rates;

		const defaultAccountCurrency = getDefaultAccountCurrency( this.props );
		const conversionRate = fx.convert( 1, { to: defaultAccountCurrency.code, from: code } );

		return (
			<ScrollView style={ styles.container }>
				<ListItem
					title="Code"
					rightTitle={ code }
					containerStyle={ styles.rowContainer }
					contentContainerStyle={ styles.wideContainer }
					rightTitleStyle={ styles.smallText }
					bottomDivider={ true }
					topDivider={ true }
				/>

				<ListItem
					title="Conversion rate"
					rightTitle={ `${ round( conversionRate, 2 ) } ${ defaultAccountCurrency.code }` }
					containerStyle={ styles.rowContainer }
					rightTitleStyle={ styles.smallText }
					bottomDivider={ true }
					topDivider={ true }
				/>
			</ScrollView>
		);
	}
}

const mapStateToProps = ( { currencies, accounts } ) => ( { currencies, accounts } );

const mapDispatchToProps = () => ( {} );

export default connect(
	mapStateToProps,
	mapDispatchToProps
)( CurrencyScreen );

const styles = StyleSheet.create( {
	container: { backgroundColor: '#f9f9f9', flex: 1 },
	wideContainer: { flex: 2 },
	rowContainer: { paddingTop: 3, paddingBottom: 3, height: 55 },
	amountInput: { color: 'black', textAlign: 'right' },
	smallText: { fontSize: 14 },
} );
