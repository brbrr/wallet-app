/**
 * External dependencies
 */
import React from 'react';
import {
	Text,
	View,
} from 'react-native';

/**
 * Internal dependencies
 */
import { getTotalSpent } from '../utils';

const Overview = ( { records, account } ) => {
	const totalSpent = getTotalSpent( records );
	console.log( account );

	const backgroundColor = account ? account.colorCode : '#8B9FBB';
	return (
		<View style={ { flex: 1, backgroundColor } }>
			<Text style={ { fontSize: 20, fontWeight: 'bold', padding: 7 } }> Total spent: { totalSpent } </Text>
		</View>
	);
};

export default Overview;
