/**
 * External dependencies
 */
import { createStackNavigator } from 'react-navigation';

/**
 * Internal dependencies
 */
import IconSelector from '../components/IconSelector';
import ColorSelector from '../components/ColorSelector';
import CategoriesScreen, { EditCategoriesScreen } from '../screens/categories/CategoriesScreen';
import EditSubCategoriesScreen from '../screens/categories/EditSubCategoriesScreen';
import SubCategoriesScreen from '../screens/categories/SubCategoriesScreen';
import NewCategoryScreen from '../screens/categories/NewCategoryScreen';

export const NewCategoryStack = createStackNavigator( {
	NewCategory: { screen: NewCategoryScreen },
	IconSelector: { screen: IconSelector },
	ColorSelector: { screen: ColorSelector },
}, { navigationOptions: { header: null } } );

export const EditSubCategoriesStack = createStackNavigator( {
	EditSubCategories: { screen: EditSubCategoriesScreen },
	IconSelector: { screen: IconSelector },
	ColorSelector: { screen: ColorSelector },
	NewCategory: NewCategoryStack,
}, { navigationOptions: { header: null } } );

export const EditCategoriesStack = createStackNavigator( {
	EditCategories: { screen: EditCategoriesScreen },
	EditSubCategories: { screen: EditSubCategoriesStack },
	// IconSelector: { screen: IconSelector },
	// ColorSelector: { screen: ColorSelector },
	// NewCategory: NewCategoryStack,
} );

export const ViewCategoriesStack = createStackNavigator( {
	Categories: { screen: CategoriesScreen },
	SubCategories: { screen: SubCategoriesScreen },
} );
