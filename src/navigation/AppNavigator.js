/**
 * External dependencies
 */
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

/**
 * Internal dependencies
 */
import MainTabNavigator from './MainTabNavigator';
import NewRecordNavigator from './NewRecordNavigator';
import AppLoadingScreen from '../screens/AppLoadingScreen';
import WelcomeScreen from '../screens/welcome/WelcomeScreen';
import SelectCurrencyScreen from '../screens/welcome/SelectCurrencyScreen';
import AddAccountScreen from '../screens/welcome/AddAccountScreen';
import NewAccountScreen from '../screens/NewAccountScreen';

const MainStack = createStackNavigator( {
	Main: MainTabNavigator,
	NewRecord: NewRecordNavigator,
},
{
	mode: 'modal',
	headerMode: 'none',
}
);

const WelcomeStack = createStackNavigator( {
	Welcome: WelcomeScreen,
	SelectCurrency: SelectCurrencyScreen,
	AddAccount: AddAccountScreen,
	// AddAccount: NewAccountScreen,

	// NewRecord: NewRecordNavigator,
},
{
	// mode: 'modal',
	// headerMode: 'none',
}
);

export default createAppContainer(
	createSwitchNavigator(
		{
			AppLoading: AppLoadingScreen,
			App: MainStack,
			Welcome: WelcomeStack,
		},
		{
			initialRouteName: 'AppLoading',
		}
	)
);
