/**
 * External dependencies
 */
import React from 'react';
import { Button } from 'react-native';

export default ( { navigation } ) => (
	<>
		<Button title="Sign Up" onPress={ () => navigation.push( 'SignUp' ) } />
	</>
);
