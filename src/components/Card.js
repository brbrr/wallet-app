/**
 * External dependencies
 */
import React from 'react';
import { StyleSheet } from 'react-native';
import { Card as _Card } from 'react-native-elements';

const Card = ( { title, containerStyle, titleStyle, dividerStyle, children } ) => (
	<_Card
		title={ title }
		containerStyle={ Object.assign( {}, styles.containerStyle, containerStyle ) }
		titleStyle={ Object.assign( {}, styles.titleStyle, titleStyle ) }
		dividerStyle={ Object.assign( {}, styles.dividerStyle, dividerStyle ) }
	>
		{ children }
	</_Card>
);

const styles = StyleSheet.create( {
	containerStyle: {
		borderWidth: 0,
		shadowOpacity: 0,
		padding: 0,
		margin: 0,
		marginTop: 40,
		backgroundColor: 'transparent',
	},
	titleStyle: {
		borderWidth: 0,
		marginBottom: 10,
		margin: 1,
		fontSize: 12,
		textAlign: 'left',
		marginLeft: 18,
	},
	dividerStyle: {
		flex: 1,
		marginBottom: 0,
		borderWidth: 0,
	},
} );

export default Card;
