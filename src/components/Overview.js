/**
 * External dependencies
 */
import React from 'react';
import {
	Text,
	View,
} from 'react-native';
import { Button } from 'react-native-elements';

/**
 * Internal dependencies
 */
import { getTotalSpent } from '../utils';

const Overview = ( { records, onPress } ) => {
	const totalSpent = getTotalSpent( records );

	return (
		<View style={ { flex: 1, backgroundColor: '#8B9FBB' } }>
			<Text style={ { fontSize: 20, fontWeight: 'bold', padding: 7 } }> Total spent: { totalSpent } </Text>
			<View style={ { flexDirection: 'row', justifyContent: 'space-around' } }>
				<Button
					icon={ {
						name: 'add-alert',
						size: 15,
						color: 'white',
					} }
					title="Button 1"
					onPress={ () => onPress( 0 ) }
				/>
				<Button
					icon={ {
						name: 'add-box',
						size: 15,
						color: 'white',
					} }
					title="Button 2"
					onPress={ () => onPress( 1 ) }
				/>
				<Button
					icon={ {
						name: 'add-circle',
						size: 15,
						color: 'white',
					} }
					title="Button 3"
					onPress={ () => onPress( 2 ) }
				/>
			</View>
			<View style={ { flexDirection: 'row', justifyContent: 'space-around', padding: 10 } }>
				<Button
					icon={ {
						name: 'add-alert',
						size: 15,
						color: 'white',
					} }
					title="Change account"
					onPress={ () => {} }
				/>

			</View>
		</View>
	);
};

export default Overview;
