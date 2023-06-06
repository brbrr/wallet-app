/**
 * External dependencies
 */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SettingsNewAccountStack = createStackNavigator( {
	SettingsNewAccount: { screen: SettingsNewAccountsScreen },
	IconSelector: { screen: IconSelector },
	ColorSelector: { screen: ColorSelector },
}, {
	navigationOptions: { header: null },
} );

const SettingsAccountsStack = createStackNavigator( {
	SettingsAccountsList: { screen: SettingsAccountsScreen },
	SettingsNewAccountStack,
} );

const SettingsCurrenciesStack = createStackNavigator( {
	SettingsCurrenciesList: { screen: SettingsCurrenciesScreen },
	NewCurrency: NewCurrencyStack,
	Currency: CurrencyScreen,
} );

const SettingsDebugStack = createStackNavigator( {
	SettingsDebug: { screen: SettingsDebugScreen },
} );

const SettingsStack = createStackNavigator( {
	Settings: SettingsScreen,
	SettingsAccounts: { screen: SettingsAccountsStack, navigationOptions: { header: null } },
	SettingsCurrencies: { screen: SettingsCurrenciesStack, navigationOptions: { header: null } },
	SettingsCategories: { screen: EditCategoriesStack, navigationOptions: { header: null } },
	SettingsDebugStack,
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

export default SettingsStack;
