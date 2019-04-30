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

const CategoriesStack = createStackNavigator( {
	CategoriesList: { screen: CategoriesScreen },
	NewCategory: { screen: NewCategoryScreen },
	IconSelector: { screen: IconSelector },
	ColorSelector: { screen: ColorSelector },
} );

export default createStackNavigator( {
	New: { screen: NewRecordModal },
	Currencies: { screen: CurrenciesScreen },
	Accounts: { screen: AccountsScreen },
	Categories: { screen: CategoriesStack, navigationOptions: { header: null } },
	// Categories: { screen: CategoriesScreen },
	// NewCategory: { screen: NewCategoryScreen },
	// IconSelector: { screen: IconSelectorScreen },
	// ColorSelector: { screen: ColorSelectorScreen },
} );
