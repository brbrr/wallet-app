/**
 * External dependencies
 */
import React from 'react';
import { Platform, View } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

/**
 * Internal dependencies
 */
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';

const HomeStack = createStackNavigator( {
	Home: HomeScreen,
} );

HomeStack.navigationOptions = {
	tabBarLabel: 'Home',
	tabBarIcon: ( { focused } ) => (
		<TabBarIcon
			focused={ focused }
			name={
				Platform.OS === 'ios' ?
					`ios-information-circle${ focused ? '' : '-outline' }` :
					'md-information-circle'
			}
		/>
	),
};

const SettingsStack = createStackNavigator( {
	Settings: SettingsScreen,
} );

SettingsStack.navigationOptions = {
	tabBarLabel: 'Settings',
	tabBarIcon: ( { focused } ) => (
		<TabBarIcon
			focused={ focused }
			name={ Platform.OS === 'ios' ? 'ios-options' : 'md-options' }
		/>
	),
};

export default createBottomTabNavigator( {
	HomeStack,
	New: {
		screen: View,
		navigationOptions: ( { navigation } ) => ( {
			title: 'New Record',
			tabBarIcon: ( { focused } ) => (
				<TabBarIcon
					focused={ focused }
					name={ Platform.OS === 'ios' ? 'ios-add' : 'md-add' }
				/>

			),
			tabBarOnPress: () => navigation.navigate( 'NewRecord' ),
		} ),
	},
	SettingsStack,
} );
