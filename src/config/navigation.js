/**
 * External dependencies
 */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
	CardStyleInterpolators,
	createStackNavigator,
	TransitionPresets,
} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

/**
 * Internal dependencies
 */
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SignInScreen from '../screens/auth/SignInScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import AppLoadingScreen from '../screens/AppLoadingScreen';
import NewRecordModal from '../screens/NewRecordModal';
import WelcomeScreen from '../screens/welcome/WelcomeScreen';
import SelectCurrencyScreen from '../screens/welcome/SelectCurrencyScreen';
import AddAccountScreen from '../screens/welcome/AddAccountScreen';

const HomeStack = createStackNavigator();
const HomeStackScreen = () => (
	<HomeStack.Navigator>
		<HomeStack.Screen name="Home" component={HomeScreen} />
	</HomeStack.Navigator>
);

const NewRecordPlaceholder = () => (
	<View style={{ flex: 1, backgroundColor: 'blue' }} />
);

const SettingsStack = createStackNavigator();
const SettingsStackScreen = () => (
	<SettingsStack.Navigator options={{ headerShown: false }}>
		<SettingsStack.Screen
			name="Settings"
			component={SettingsScreen}
			options={{ headerShown: false }}
		/>
	</SettingsStack.Navigator>
);

const AppTabs = createBottomTabNavigator();
const AppTabsScreen = () => (
	<AppTabs.Navigator>
		<AppTabs.Screen
			name="Home"
			component={HomeScreen}
			options={{
				headerShown: false,
				tabBarIcon: (props) => (
					<Ionicons
						name="ios-information-circle"
						size={props.size}
						color={props.color}
					/>
				),
			}}
		/>
		<AppTabs.Screen
			name="New Record"
			component={NewRecordPlaceholder}
			options={{
				headerShown: false,
				tabBarIcon: (props) => (
					<Ionicons
						name="ios-add"
						size={props.size}
						color={props.color}
					/>
				),
			}}
			listeners={({ navigation }) => ({
				tabPress: (e) => {
					e.preventDefault();
					navigation.navigate('NewRecord');
				},
			})}
		/>
		<AppTabs.Screen
			name="SettingsStack"
			component={SettingsStackScreen}
			options={{
				headerShown: false,
				tabBarIcon: (props) => (
					<Ionicons
						name="ios-options"
						size={props.size}
						color={props.color}
					/>
				),
			}}
		/>
	</AppTabs.Navigator>
);

const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
	<AuthStack.Navigator>
		<AuthStack.Screen name="SignIn" component={SignInScreen} />
		<AuthStack.Screen name="SignUp" component={SignUpScreen} />
	</AuthStack.Navigator>
);

const WelcomeStack = createStackNavigator();
const WelcomeStackScreen = () => (
	<WelcomeStack.Navigator options={{ headerShown: false }}>
		<WelcomeStack.Screen name="Welcome" component={WelcomeScreen} />
		<WelcomeStack.Screen
			name="SelectCurrency"
			component={SelectCurrencyScreen}
		/>
		<WelcomeStack.Screen
			name="AddAccount"
			component={AddAccountScreen}
			options={({ navigation, route }) => ({
				title: 'Add Account',
				// headerLeft: (
				// 	<Button
				// 		onPress={ () => navigation.goBack( null ) }
				// 		title="Back"
				// 	/>
				// ),
			})}
		/>
	</WelcomeStack.Navigator>
);

const NewRecordStack = createStackNavigator();
const NewRecordStackScreen = () => (
	<NewRecordStack.Navigator>
		<RootStack.Screen
			name="NewRecord"
			component={NewRecordModal}
			screenOptions={{ animationEnabled: true }}
			headerMode="screen"
			options={{
				title: 'NewRecord',
			}}
		/>
	</NewRecordStack.Navigator>
);

const RootStack = createStackNavigator();
const RootStackScreen = ({ isFirstLaunch }) => {
	const [isLoading, setIsLoading] = React.useState(true);
	const [user, setUser] = React.useState(null);

	React.useEffect(() => {
		setTimeout(() => {
			setIsLoading(!isLoading);
			setUser({});
		}, 500);
	}, []);

	return (
		<RootStack.Navigator
			presentation="modal"
			options={{ headerShown: false }}
			screenOptions={{
				gestureEnabled: true,
				cardOverlayEnabled: true,
				...TransitionPresets.ModalPresentationIOS,
			}}
		>
			{/* { isLoading ? (
				<RootStack.Screen name="AppLoadingScreen" component={ AppLoadingScreen } />
			) : isFirstLaunch ? (
				<RootStack.Screen name="WelcomeStack" component={ WelcomeStackScreen } />
			) : (
				<RootStack.Screen name="AuthStackScreen" component={ AuthStackScreen } />
			// 	<RootStack.Screen name="WelcomeStack" component={ WelcomeStackScreen } />
			)
			} */}

			<RootStack.Screen
				name="AppTabsScreen"
				component={AppTabsScreen}
				options={{ headerShown: false }}
			/>

			<RootStack.Screen
				name="NewRecord"
				component={NewRecordStackScreen}
				screenOptions={{ animationEnabled: true }}
				options={{
					title: 'NewRecord',
					headerShown: false,
				}}
			/>
		</RootStack.Navigator>
	);
};

const mapStateToProps = (state) => {
	return {
		isFirstLaunch: state.config.isFirstLaunch,
	};
};

const Root = connect(mapStateToProps)(RootStackScreen);

export default () => {
	return (
		<NavigationContainer>
			<Root />
			{/* <RootStackScreen /> */}
		</NavigationContainer>
	);
};
