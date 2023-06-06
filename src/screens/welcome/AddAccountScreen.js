/**
 * External dependencies
 */
import React from 'react';
import { StatusBar } from 'react-native';
import { StyleSheet, Platform, Text, View, Button } from 'react-native';
/**
 * Internal dependencies
 */
import NewAccountScreen from '../NewAccountScreen';

export default class AddAccountScreen extends React.Component {
	render() {
		return (
			<View style={ { flex: 1 } }>
				<StatusBar
					backgroundColor="blue"
					barStyle="dark-content"
				/>
				<View style={ styles.container }>
					<Text>O, Hi!</Text>
					<Text>Welcome to this new fancy app!</Text>

					<NewAccountScreen navigation={ this.props.navigation } route={ this.props.route } postAccountInfo={
						( onPress ) => <Button title="Solid Button" onPress={ onPress } />
					} />
				</View>
			</View>

		);
	}
}

const styles = StyleSheet.create( {
	container: {
		flex: 1,
		backgroundColor: '#eee',

		...Platform.select( {
			ios: {
				paddingTop: 20,
			},
		} ),
	},
} );

