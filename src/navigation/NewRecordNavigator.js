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

export default createStackNavigator( {
	New: { screen: NewRecordModal },
	Categories: { screen: CategoriesScreen },
	// Currencies: { screen: CurrenciesScreen },
} );
