
/**
 * External dependencies
 */
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const colors = '#e6194B, #3cb44b, #ffe119, #4363d8, #f58231, #911eb4, #42d4f4, #f032e6, #bfef45, #fabebe, #469990, #e6beff, #9A6324, #fffac8, #800000, #aaffc3, #808000, #ffd8b1, #000075, #a9a9a9, #ffffff, #000000'.split( ', ' );

const ColorSelector = ( { navigation } ) => {
	const parent = navigation.getParam( 'parent' );
	let allColors = colors.reduce( ( resultArray, colorCode, index ) => {
		const chunkIndex = Math.floor( index / 4 );// items per chunk
		if ( ! resultArray[ chunkIndex ] ) {
			resultArray[ chunkIndex ] = []; // start a new chunk
		}

		const size = ( Dimensions.get( 'window' ).width / 4 ) - ( 3 * 2 ); // 4 items in a row, double margin 3px

		const colorComponent = <TouchableOpacity
			style={ styles.colorBox( size, colorCode ) }
			key={ index }
			onPress={ () => navigation.navigate( parent, { colorCode } ) }
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
	colorBox: ( size, color ) => ( {
		width: size,
		height: size,
		backgroundColor: color,
		margin: 3,
	} ),
} );

ColorSelector.navigationOptions = {
	title: 'Select a Color',
};
export default ColorSelector;