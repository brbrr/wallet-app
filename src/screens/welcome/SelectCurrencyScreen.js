/**
 * External dependencies
 */
import React from 'react';
import { StatusBar } from 'react-native';
import { View, Text } from 'react-native';
/**
 * Internal dependencies
 */
import CurrencyList from '../../components/currencies/CurrenciesList';

export default class SelectCurrencyScreen extends React.Component {
	render() {
		return (

			<View style={ { flex: 1 } }>
				<View style={ { flex: 1 } }>
					<StatusBar
						backgroundColor="blue"
						barStyle="dark-content"
					/>
					<View style={ { height: 60, marginTop: 20 } }>
						<Text>Select your default currency</Text>
					</View>
					<CurrencyList navigation={ this.props.navigation } />
				</View>
			</View>

		);
	}
}

