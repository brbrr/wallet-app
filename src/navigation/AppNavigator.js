/**
 * External dependencies
 */
import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

/**
 * Internal dependencies
 */
import MainTabNavigator from './MainTabNavigator';
import NewRecordModal from '../screens/NewRecordModal';

export default createAppContainer( createSwitchNavigator( {
	// You could add another route here for authentication.
	// Read more at https://reactnavigation.org/docs/en/auth-flow.html
	Main: MainTabNavigator,
	Modal: { screen: NewRecordModal },
}, {
	mode: 'modal',
} ) );
