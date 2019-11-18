/**
 * External dependencies
 */
import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import * as Icon from '@expo/vector-icons';
import { Provider } from 'react-redux';
// Before rendering any navigation stack
import { useScreens } from 'react-native-screens';
import { PersistGate } from 'redux-persist/integration/react';

/**
 * Internal dependencies
 */
import AppNavigator from './src/navigation/AppNavigator';
import getStore from './src/utils/create-store';

useScreens();

const { persistor, store } = getStore();

export default class App extends React.Component {
	state = {
		isLoadingComplete: false,
	};

	render() {
		if ( ! this.state.isLoadingComplete ) {
			return (
				<AppLoading
					startAsync={ () => new Promise( ( resolve ) => setTimeout( () => {
						console.log( 'QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ' );
						resolve( 'Promise A win!' );
					}, 2000 ) ) }
					onError={ this._handleLoadingError }
					onFinish={ this._handleFinishLoading }
				/>
			);
		}
		return (
			<Provider store={ store }>
				<PersistGate
					loading={ null }
					persistor={ persistor }
				>
					<View style={ styles.container }>
						{ Platform.OS === 'ios' && <StatusBar barStyle="default" /> }
						<AppNavigator />
					</View>
				</PersistGate>
			</Provider>
		);
	}

	_loadResourcesAsync = async () => {
		return Promise.all( [
			Asset.loadAsync( [
				require( './assets/images/robot-dev.png' ),
				require( './assets/images/robot-prod.png' ),
			] ),
			Font.loadAsync( {
				// This is the font that we are using for our tab bar
				...Icon.Ionicons.font,
				// We include SpaceMono because we use it in HomeScreen.js. Feel free
				// to remove this if you are not using it in your app
				'space-mono': require( './assets/fonts/SpaceMono-Regular.ttf' ),
			} ),
		] );
	};

	_handleLoadingError = ( error ) => {
		// In this case, you might want to report the error to your error
		// reporting service, for example Sentry
		console.warn( error );
	};

	_handleFinishLoading = () => {
		this.setState( { isLoadingComplete: true } );
	};
}

const styles = StyleSheet.create( {
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
} );
