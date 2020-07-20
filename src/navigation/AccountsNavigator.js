/**
 * External dependencies
 */
import { createStackNavigator } from 'react-navigation-stack';

/**
 * Internal dependencies
 */
import IconSelector from '../components/IconSelector';
import ColorSelector from '../components/ColorSelector';
import { SettingsNewAccountsScreen } from '../screens/NewAccountScreen';

export const NewAccountStack = createStackNavigator( {
	NewAccount: { screen: SettingsNewAccountsScreen },
	IconSelector: { screen: IconSelector },
	ColorSelector: { screen: ColorSelector },
}, {
	navigationOptions: { header: null },
} );
