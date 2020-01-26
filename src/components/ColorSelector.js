
/**
 * External dependencies
 */
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

// const colors = '#e6194B, #3cb44b, #ffe119, #4363d8, #f58231, #911eb4, #42d4f4, #f032e6, #bfef45, #fabebe, #469990, #e6beff, #9A6324, #fffac8, #800000, #aaffc3, #808000, #ffd8b1, #000075, #a9a9a9, #ffffff, #000000'.split( ', ' );

const colors2 = [ '#c0392b', '#e74c3c', '#9b59b6', '#8e44ad', '#2980b9', '#3498db', '#1abc9c', '#16a085', '#27ae60', '#2ecc71', '#f1c40f', '#f39c12', '#e67e22', '#d35400', '#ecf0f1', '#bdc3c7', '#95a5a6', '#7f8c8d', '#34495e', '#2c3e50' ];
const colors3 = [
	'#d98880', '#c39bd3', '#7fb3d5', '#76d7c4', '#7dcea0', '#f7dc6f', '#f0b27a', '#f4f6f7', '#bfc9ca', '#85929e',
	'#cb4335', '#7d3c98', '#2e86c1', '#138d75', '#28b463', '#d68910', '#ba4a00', '#a6acaf', '#707b7c', '#273746',
	'#d81b60', '#5e35b1', '#1e88e5', '#00acc1', '#43a047', '#c0ca33', '#ffb300', '#f4511e', '#757575' ];

// fluent colors
const colors = [ '#FFB900', '#E74856', '#0078D7', '#0099BC', '#7A7574', '#767676', '#FF8C00', '#E81123', '#0063B1', '#2D7D9A', '#5D5A58', '#4C4A48', '#F7630C', '#EA005E', '#8E8CD8', '#00B7C3', '#68768A', '#69797E', '#CA5010', '#C30052', '#6B69D6', '#038387', '#515C6B', '#4A5459', '#DA3B01', '#E3008C', '#8764B8', '#00B294', '#567C73', '#647C64', '#EF6950', '#BF0077', '#744DA9', '#018574', '#486860', '#525E54', '#D13438', '#C239B3', '#B146C2', '#00CC6A', '#498205', '#847545', '#FF4343', '#9A0089', '#881798', '#10893E', '#107C10', '#7E735F' ];

// more colors: https://flatuicolors.com/palette/us
// Also maybe check A8C color studio

const tileSize = ( Dimensions.get( 'window' ).width / 6 ) - ( 3 * 2 ); // 4 items in a row, double margin 3px

const ColorSelector = ( { navigation } ) => {
	const onStateChange = navigation.getParam( 'onStateChange' );
	const updateAndGoBack = ( colorCode ) => {
		onStateChange( { colorCode } );
		navigation.pop();
	};

	let allColors = colors.reduce( ( resultArray, colorCode, index ) => {
		const chunkIndex = Math.floor( index / 6 ); // items per chunk
		if ( ! resultArray[ chunkIndex ] ) {
			resultArray[ chunkIndex ] = []; // start a new chunk
		}

		const colorComponent = <TouchableOpacity
			style={ StyleSheet.flatten( [ styles.tileBox, { backgroundColor: colorCode } ] ) }
			key={ index }
			onPress={ () => updateAndGoBack( colorCode ) }
		/>;
		resultArray[ chunkIndex ].push( colorComponent );
		return resultArray;
	}, [] );

	allColors = allColors.map( ( comp, idx ) =>
		<View
			style={ { flexDirection: 'row' } }
			key={ idx }>
			{ comp }
		</View> );

	return (
		<ScrollView style={ styles.container } keyboardShouldPersistTaps="always" >
			{ allColors }
		</ScrollView>
	);
};

const styles = StyleSheet.create( {
	container: { backgroundColor: '#f9f9f9', flex: 1 },
	tileBox: {
		width: tileSize,
		height: tileSize,
		margin: 3,
	},
} );

ColorSelector.navigationOptions = {
	title: 'Select a Color',
};
export default ColorSelector;
