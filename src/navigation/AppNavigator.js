/**
 * External dependencies
 */
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
// import { createStackNavigator } from '@react-navigation/stack';

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
import HomeScreen from '../screens/HomeScreen';
// import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SignInScreen from '../screens/auth/SignInScreen';

import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

function RootStack() {
	return (
		<Stack.Navigator
			initialRouteName="Home"
			screenOptions={ { gestureEnabled: false } }
		>
			<Stack.Screen
				name="Home"
				component={ HomeScreen }
				options={ { title: 'My app' } }
			/>
			{ /* <Stack.Screen
				name="Profile"
				component={ ProfileScreen }
				initialParams={ { user: 'me' } }
			/> */ }
		</Stack.Navigator>
	);
}

const isFirstLaunch = true; // TODO: move it into a default
const AppNavigator = () => {
	return (
		<Stack.Navigator>
			{ isFirstLaunch ? (
				<>
					<Stack.Screen name="Home" component={ HomeScreen } />
					<Stack.Screen name="Settings" component={ SettingsScreen } />
				</>
			) : (
				<Stack.Screen name="SignIn" component={ SignInScreen } />
			) }
		</Stack.Navigator>
	);
};

const MainStack = createStackNavigator( {
	Main: MainTabNavigator,
	NewRecord: NewRecordNavigator,
},
{
	mode: 'modal',
	headerMode: 'none',
},
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
},
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
		},
	),
);
