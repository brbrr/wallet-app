/**
 * External dependencies
 */
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create( {
	accountIndicator: ( color ) => ( {
		width: 10,
		height: 10,
		borderRadius: 10 / 2,
		backgroundColor: color,
		position: 'absolute',
		bottom: 8,
		zIndex: 5,
		left: 41,
	} ),
} );

export default styles;
