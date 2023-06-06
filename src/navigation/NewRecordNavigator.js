/**
 * External dependencies
 */
import { createStackNavigator } from '@react-navigation/stack';

/**
 * Internal dependencies
 */
import NewRecordModal from '../screens/NewRecordModal';
import CurrenciesScreen from '../screens/CurrenciesScreen';
import AccountsScreen from '../screens/AccountsScreen';
import { NewAccountStack } from './AccountsNavigator';
import { NewCurrencyStack } from './CurrenciesNavigator';
import { EditCategoriesStack, ViewCategoriesStack, EditSubCategoriesStack } from './CategoriesStack';

export const CategoriesListStack = createStackNavigator( {
	ViewCategories: ViewCategoriesStack,
	EditCategoriesStack: { screen: EditCategoriesStack, navigationOptions: { header: null, navMode: 'modal' } },
	EditSubCategoriesStack: { screen: EditSubCategoriesStack, navigationOptions: { header: null, navMode: 'modal' } },
}, {
	mode: 'modal',
	headerMode: 'none',
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
	CategoriesStack: { screen: CategoriesListStack, navigationOptions: { header: null } },
} );
