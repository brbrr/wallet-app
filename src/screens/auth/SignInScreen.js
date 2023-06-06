/**
 * External dependencies
 */
import AsyncStorage from '@react-native-async-storage/async-storage';

import React from 'react';
import { Text, Button } from 'react-native';

export default class SignInScreen extends React.Component {
	constructor() {
		super();
		this.state = {
			items: null,
		};
	}

	fetchAllItems = async () => {
		try {
			const keys = await AsyncStorage.getAllKeys();
			const items = await AsyncStorage.multiGet( keys );

			this.setState( { items: items[ 0 ][ 1	 ] } );
			console.log( items );
		} catch ( error ) {
			console.log( error, 'problemo' );
		}
	};

	componentDidMount() {
		this.fetchAllItems();
	}

	render() {
		console.log( '!!QWEQWEQWE' );
		return (
			<>
				<Text> { this.state.items }</Text>
				<Button title="Sign In" onPress={ () => alert( 'todo!' ) } />
				<Button title="Sign Up" onPress={ () => this.props.navigation.push( 'SignUp' ) } />
				<Button title="Skip" onPress={ () => this.props.navigation.push( 'AppTabsScreen' ) } />
			</>
		);
	}
}
