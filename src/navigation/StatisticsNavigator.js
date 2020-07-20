/**
 * External dependencies
 */
import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';

/**
 * Internal dependencies
 */
import TabBarIcon from '../components/TabBarIcon';
import StatsScreen from '../screens/stats/StatsScreen';
import BalanceStatsScreen from '../screens/stats/BalanceStatsScreen';

const StatisticsStack = createStackNavigator( {
	Stats: StatsScreen,
	BalanceStats: BalanceStatsScreen,
} );

StatisticsStack.navigationOptions = {
	tabBarLabel: 'Statistics',
	tabBarIcon: ( { focused } ) => (
		<TabBarIcon
			focused={ focused }
			name={ Platform.OS === 'ios' ? 'ios-options' : 'md-options' }
		/>
	),
};

export default StatisticsStack;
