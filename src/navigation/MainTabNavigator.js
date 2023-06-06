/**
 * External dependencies
 */
import React from 'react';
import { Platform, View } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from '@react-navigation/stack';

/**
 * Internal dependencies
 */
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import SettingsStack from './SettingsNavigator';
import StatisticsStack from './StatisticsNavigator';

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
	StatisticsStack,
	SettingsStack,
} );
