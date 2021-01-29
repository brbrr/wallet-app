/**
 * External dependencies
 */
import React from 'react';
import {
	View,
	Text,
	StyleSheet,
} from 'react-native';
import { Button } from 'react-native-elements';

export default class WelcomeScreen extends React.Component {
	componentDidMount() {
		this._bootstrapAsync();
	}

	// Fetch the token from storage then navigate to our appropriate place
	_bootstrapAsync = async () => {
		// await AsyncStorage.setItem( 'isFirstLoadss', 'true' );
	};
	render() {
		const { navigation } = this.props;
		return (
			<View style={ styles.container }>
				<Text>O, Hi!</Text>
				<Text>Welcome to this new fancy app!</Text>
				<Button
					title="Solid Button"
					onPress={ () => navigation.navigate( 'SelectCurrency' ) }
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create( {
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#eee',
	},

	list: {
		flex: 1,
	},

	contentContainer: {
		width: window.width,

		// ...Platform.select( {
		// 	ios: {
		// 		// paddingHorizontal: 30,
		// 	},

		// 	android: {
		// 		paddingHorizontal: 0,
		// 	},
		// } ),
	},
} );
