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
import { CurrenciesStack } from './NewRecordNavigator';
import { SettingsAccountsScreen } from '../screens/AccountsScreen';
import { NewAccountStack } from './AccountsNavigator';
import { SettingsCategoriesScreen } from '../screens/CategoriesScreen';
import { NewCategoryStack } from './CategoriesStack';

const SettingsAccountsStack = createStackNavigator( {
	SettingsAccountsList: { screen: SettingsAccountsScreen, params: { isSettings: true } },
	NewAccount: NewAccountStack,
} );

const SettingsCategoriesStack = createStackNavigator( {
	SettingsCategoriesList: { screen: SettingsCategoriesScreen, params: { isSettings: true } },
	NewCategory: NewCategoryStack,
} );

const SettingsStack = createStackNavigator( {
	Settings: SettingsScreen,
	SettingsAccounts: { screen: SettingsAccountsStack, navigationOptions: { header: null } },
	SettingsCurrencies: { screen: CurrenciesStack, navigationOptions: { header: null } },
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
