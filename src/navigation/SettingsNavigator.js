/**
 * External dependencies
 */
import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';

/**
 * Internal dependencies
 */
import TabBarIcon from '../components/TabBarIcon';
import SettingsScreen from '../screens/SettingsScreen';
import { SettingsAccountsScreen } from '../screens/AccountsScreen';
import { NewAccountStack } from './AccountsNavigator';
import { SettingsCategoriesScreen } from '../screens/CategoriesScreen';
import { NewCategoryStack } from './CategoriesStack';
import { SettingsCurrenciesScreen } from '../screens/CurrenciesScreen';
import CurrencyScreen from '../screens/CurrencyScreen';
import { NewCurrencyStack } from './CurrenciesNavigator';

const SettingsAccountsStack = createStackNavigator( {
	SettingsAccountsList: { screen: SettingsAccountsScreen },
	NewAccount: NewAccountStack,
} );

const SettingsCategoriesStack = createStackNavigator( {
	SettingsCategoriesList: { screen: SettingsCategoriesScreen },
	NewCategory: NewCategoryStack,
} );

const SettingsCurrenciesStack = createStackNavigator( {
	SettingsCurrenciesList: { screen: SettingsCurrenciesScreen },
	NewCurrency: NewCurrencyStack,
	Currency: CurrencyScreen,
} );

const SettingsStack = createStackNavigator( {
	Settings: SettingsScreen,
	SettingsAccounts: { screen: SettingsAccountsStack, navigationOptions: { header: null } },
	SettingsCurrencies: { screen: SettingsCurrenciesStack, navigationOptions: { header: null } },
	SettingsCategories: { screen: SettingsCategoriesStack, navigationOptions: { header: null } },
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
