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

export const NewCategoryStack = createStackNavigator( {
	NewCategory: { screen: NewCategoryScreen },
	IconSelector: { screen: IconSelector },
	ColorSelector: { screen: ColorSelector },
}, { navigationOptions: { header: null } } );
