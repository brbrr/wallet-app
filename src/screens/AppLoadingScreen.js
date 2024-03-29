/**
 * External dependencies
 */
import React from 'react';
import { Text } from 'react-native';
import {
	ActivityIndicator,
	AsyncStorage,
	StatusBar,
	View,
} from 'react-native';

export default class AppLoadingScreen extends React.Component {
	componentDidMount() {
		this._bootstrapAsync();
	}

	// Fetch the token from storage then navigate to our appropriate place
	_bootstrapAsync = async () => {
		const isFirstLoad = await AsyncStorage.getItem( 'isFirstLoad' );

		// This will switch to the App screen or Auth screen and this loading
		// screen will be unmounted and thrown away.
		// this.props.navigation.navigate( isFirstLoad ? 'App' : 'Welcome' );
	};

	// Render any loading content that you like here
	render() {
		return (
			<View>
				<ActivityIndicator />
				<Text> IS LOADING</Text>
				<StatusBar barStyle="default" />
			</View>
		);
	}
}
