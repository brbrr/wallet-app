/**
 * External dependencies
 */
import { createStackNavigator } from '@react-navigation/stack';

/**
 * Internal dependencies
 */
import NewCurrencyScreen from '../screens/NewCurrencyScreen';

export const NewCurrencyStack = createStackNavigator( {
	NewCurrency: { screen: NewCurrencyScreen },
}, {
	navigationOptions: { header: null },
} );
