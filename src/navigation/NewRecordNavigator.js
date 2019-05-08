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
import NewCategoryScreen from '../screens/NewCategoryScreen';
import IconSelector from '../components/IconSelector';
import ColorSelector from '../components/ColorSelector';
import NewAccountScreen from '../screens/NewAccountScreen';
import NewCurrencyScreen from '../screens/NewCurrencyScreen';

const CategoriesStack = createStackNavigator( {
	CategoriesList: { screen: CategoriesScreen },
	NewCategory: { screen: NewCategoryScreen },
	IconSelector: { screen: IconSelector },
	ColorSelector: { screen: ColorSelector },
} );

const AccountsStack = createStackNavigator( {
	AccountsList: { screen: AccountsScreen },
	NewAccount: { screen: NewAccountScreen },
	IconSelector: { screen: IconSelector },
	ColorSelector: { screen: ColorSelector },
} );

const CurrenciesStack = createStackNavigator( {
	CurrenciesList: { screen: CurrenciesScreen },
	NewCurrency: { screen: NewCurrencyScreen },
} );

export default createStackNavigator( {
	New: { screen: NewRecordModal },
	Currencies: { screen: CurrenciesStack, navigationOptions: { header: null } },
	Accounts: { screen: AccountsStack, navigationOptions: { header: null } },
	Categories: { screen: CategoriesStack, navigationOptions: { header: null } },
} );
