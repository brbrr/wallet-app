/**
 * External dependencies
 */
import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

/**
 * Internal dependencies
 */
import TabBarIcon from '../components/TabBarIcon';
import SettingsScreen from '../screens/SettingsScreen';
import { NewAccountStack } from './AccountsNavigator';
import { EditCategoriesStack } from './CategoriesStack';
import { SettingsCurrenciesScreen } from '../screens/CurrenciesScreen';
import CurrencyScreen from '../screens/CurrencyScreen';
import { NewCurrencyStack } from './CurrenciesNavigator';
import { SettingsAccountsScreen } from '../screens/settings/SettingsAccountsScreen';
import { SettingsDebugScreen } from '../screens/settings/Debug';
import { SettingsNewAccountsScreen } from '../screens/NewAccountScreen';
import IconSelector from '../components/IconSelector';
import ColorSelector from '../components/ColorSelector';

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
