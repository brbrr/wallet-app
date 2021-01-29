/**
 * External dependencies
 */
import React from 'react';
import { createAppContainer } from 'react-navigation';
import { render, fireEvent } from 'react-native-testing-library';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import { createStackNavigator } from 'react-navigation-stack';

/**
 * Internal dependencies
 */
import walletApp from '../../reducers';
/**
 * Internal dependencies
 */
import AppNavigator from '../navigation/AppNavigator';

jest.mock( 'NativeAnimatedHelper' ).mock( 'react-native-gesture-handler', () => {
	const View = require( 'react-native/Libraries/Components/View/View' );
	return {
		State: {},
		PanGestureHandler: View,
		BaseButton: View,
		Directions: {},
	};
} );

export function renderWithNavigation( { screens = {}, navigatorConfig = {} } = {} ) {
	const Navigator = createStackNavigator(
		{
			Home,
			About,
			Location,
			...screens,
		},
		{ initialRouteName: 'Home', ...navigatorConfig },
	);

	const App = createAppContainer( Navigator );

	return { ...render( <App /> ), navigationContainer: App };
}

export function renderWithAppNavigation() {
	const App = createAppContainer( AppNavigator );

	return { ...render( <App /> ), navigationContainer: App };
}

export function renderWithRedux( ui, { initialState, store = createStore( walletApp, initialState ) } = {} ) {
	return {
		...render( <Provider store={ store }>{ ui }</Provider> ),
		store,
	};
}
