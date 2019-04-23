/**
 * External dependencies
 */
import { createAppContainer, createStackNavigator } from 'react-navigation';

/**
 * Internal dependencies
 */
import MainTabNavigator from './MainTabNavigator';
import NewRecordModal from '../screens/NewRecordModal';
import NewRecordNavigator from './NewRecordNavigator';

// export const ModalStack = createStackNavigator( {
// 	ModalScreen: { screen: NewRecordModal },
// } );

export default createAppContainer( createStackNavigator( {
	// You could add another route here for authentication.
	// Read more at https://reactnavigation.org/docs/en/auth-flow.html
	Main: MainTabNavigator,
	NewRecord: NewRecordNavigator,
},
{
	mode: 'modal',
	headerMode: 'none',
}
) );
