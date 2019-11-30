/**
 * External dependencies
 */
import React from 'react';
import { Button, Text, View } from 'react-native';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import { render, fireEvent } from 'react-native-testing-library';

/**
 * Internal dependencies
 */
import walletApp from '../../reducers';
import AccountsScreen from '../AccountsScreen';

function renderWithRedux( ui, { initialState, store = createStore( walletApp, initialState ) } = {} ) {
	return {
		...render( <Provider store={ store }>{ ui }</Provider> ),
		store,
	};
}

function setAnswer( question, answer ) {
	fireEvent.changeText( question, answer );
}

test( 'can render with redux with defaults', () => {
	const props = { navigation: {
		setParams: () => {},
		getParam: () => false,
	} };
	const { getAllByA11yRole, getByText, getAllByTestId, getByTestId } = renderWithRedux( <AccountsScreen { ...props } /> );

	// const allQuestions = getAllByA11yRole( 'header' );
	const testIDs = getAllByTestId( 'headerRight' );

	console.log( testIDs );

	// setAnswer( allQuestions[ 0 ], 'a1' );
	// setAnswer( allQuestions[ 1 ], 'a2' );

	// fireEvent.press( getByText( 'submit' ) );

	// expect( props.verifyQuestions ).toHaveBeenCalledWith( {
	// 	1: { q: 'q1', a: 'a1' },
	// 	2: { q: 'q2', a: 'a2' },
	// } );
} );

test( '2can render with asdasdasda with defaults2', () => {
	const { getByTestId, getByText } = renderWithRedux( <AccountsScreen />, { initialState: 0 } );
	fireEvent.press( getByText( '+' ) );
	expect( getByTestId( 'count-value' ).props.children ).toBe( 1 );
} );

test( 'can render with redux with custom initial state', () => {
	const { getByTestId, getByText } = renderWithRedux( <AccountsScreen />, {
		initialState: { count: 3 },
	} );
	fireEvent.press( getByText( '-' ) );
	expect( getByTestId( 'count-value' ).props.children ).toBe( 2 );
} );

test( 'can render with redux with custom store', () => {
	const store = createStore( () => ( { count: 1000 } ) );
	const { getByTestId, getByText } = renderWithRedux( <AccountsScreen />, {
		store,
	} );
	fireEvent.press( getByText( '+' ) );
	expect( getByTestId( 'count-value' ).props.children ).toBe( 1000 );
	fireEvent.press( getByText( '-' ) );
	expect( getByTestId( 'count-value' ).props.children ).toBe( 1000 );
} );
