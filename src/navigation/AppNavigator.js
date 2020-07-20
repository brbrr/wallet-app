/**
 * External dependencies
 */
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

/**
 * Internal dependencies
 */
import MainTabNavigator from './MainTabNavigator';
import NewRecordNavigator from './NewRecordNavigator';

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
