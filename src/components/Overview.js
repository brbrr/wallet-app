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
import { getAccountsTotalsInCurrency } from '../utils';
import { getDefaultAccount } from '../selectors';

const Overview = ( { account, accounts } ) => {
	const backgroundColor = account ? account.colorCode : '#8B9FBB';

	return (
		<View style={ { flex: 1, backgroundColor } }>
			<Text style={ { fontSize: 20, fontWeight: 'bold', padding: 7 } }>
				{ account ? `${ account.balance } ${ account.name } | ${ account.currencyId }` :
					`All | ${ getAccountsTotalsInCurrency( accounts.byId ) } ${ getDefaultAccount( { accounts } ).name }` }
			</Text>
		</View>

	);
};

export default Overview;
