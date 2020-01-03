/**
 * External dependencies
 */
import { createStackNavigator } from 'react-navigation';

/**
 * Internal dependencies
 */
import NewRecordModal from '../screens/NewRecordModal';
import CategoriesScreen, { EditCategoriesScreen } from '../screens/CategoriesScreen';
import CurrenciesScreen from '../screens/CurrenciesScreen';
import AccountsScreen from '../screens/AccountsScreen';
import { NewAccountStack } from './AccountsNavigator';
import { NewCurrencyStack } from './CurrenciesNavigator';
import { NewCategoryStack } from './CategoriesStack';
import SubCategoriesScreen, { EditSubCategoriesScreen } from '../screens/SubCategoriesScreen';

export const EditCategoriesStack = createStackNavigator( {
	EditCategories: { screen: EditCategoriesScreen },
	EditSubCategories: { screen: EditSubCategoriesScreen },
	NewCategory: NewCategoryStack,
} );

export const ViewCategoriesStack = createStackNavigator( {
	Categories: { screen: CategoriesScreen },
	SubCategories: { screen: SubCategoriesScreen },
} );

export const CategoriesListStack = createStackNavigator( {
	ViewCategories: ViewCategoriesStack,
	EditCategories: { screen: EditCategoriesStack, navigationOptions: { header: null } },
},
{
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
	Categories: { screen: CategoriesListStack, navigationOptions: { header: null } },
} );
