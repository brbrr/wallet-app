/**
 * External dependencies
 */
import { createStackNavigator } from 'react-navigation';

/**
 * Internal dependencies
 */
import NewCategoryScreen from '../screens/NewCategoryScreen';
import IconSelector from '../components/IconSelector';
import ColorSelector from '../components/ColorSelector';
import SubCategoriesScreen from '../screens/SubCategoriesScreen';

export const NewCategoryStack = createStackNavigator( {
	SubCategories: { screen: SubCategoriesScreen },
	NewCategory: { screen: NewCategoryScreen },
	IconSelector: { screen: IconSelector },
	ColorSelector: { screen: ColorSelector },
}, { navigationOptions: { header: null } } );
