/**
 * External dependencies
 */
import React, { Component } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function withStatusBar( WrappedComponent, backgroundColor ) {
	// ...and returns another component...
	return class extends Component {
		render() {
			// ... and renders the wrapped component with the fresh data!
			// Notice that we pass through any additional props
			return (
				<View style={ styles.container }>
					<View style={ { backgroundColor: 'black' } }>
						<StatusBar />
					</View>

					<WrappedComponent { ...this.props } />
				</View>
			);
		}
	};
}

const styles = StyleSheet.create( {
	container: {
		backgroundColor: '#f9f9f9',
		flex: 1,

		...Platform.select( {
			ios: {
				paddingTop: 20,
			},
		} ),
	},
} );
