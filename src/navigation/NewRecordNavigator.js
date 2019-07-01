/**
 * External dependencies
 */
import { createStackNavigator } from 'react-navigation';

/**
 * Internal dependencies
 */
import NewRecordModal from '../screens/NewRecordModal';
import CategoriesScreen from '../screens/CategoriesScreen';
import CurrenciesScreen from '../screens/CurrenciesScreen';
import AccountsScreen from '../screens/AccountsScreen';
import { NewAccountStack } from './AccountsNavigator';
import { NewCurrencyStack } from './CurrenciesNavigator';
import { NewCategoryStack } from './CategoriesStack';

export const CategoriesStack = createStackNavigator( {
	CategoriesList: { screen: CategoriesScreen },
	NewCategory: NewCategoryStack,
} );

export const AccountsStack = createStackNavigator( {
	AccountsList: { screen: AccountsScreen },
	NewAccount: NewAccountStack,
} );

export const CurrenciesStack = createStackNavigator( {
	CurrenciesList: { screen: CurrenciesScreen },
	NewCurrencyStack,
} );

export default createStackNavigator( {
	New: { screen: NewRecordModal },
	Currencies: { screen: CurrenciesStack, navigationOptions: { header: null } },
	Accounts: { screen: AccountsStack, navigationOptions: { header: null } },
	Categories: { screen: CategoriesStack, navigationOptions: { header: null } },
} );
