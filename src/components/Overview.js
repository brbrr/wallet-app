/**
 * External dependencies
 */
import React from 'react';
import {
	Text,
	View,
	StyleSheet,
} from 'react-native';

/**
 * Internal dependencies
 */
import { getAccountsTotalsInCurrency } from '../utils';
import { getDefaultAccount, getCurrencyById } from '../selectors';
import store from '../utils/create-store';

const Overview = ( { account, accounts } ) => {
	const backgroundColor = account ? account.colorCode : '#8B9FBB';
	const state = store.getState();

	let content = '';
	if ( account ) {
		const currency = getCurrencyById( state, account.currencyId );

		content = <>
			<Text style={ styles.subTitle }>
				{ account.name }
			</Text>
			<Text style={ styles.title }>
				{ account.balance } { currency.code }
			</Text>
		</>;
	} else {
		const acc = getDefaultAccount( { accounts } );
		const currency = getCurrencyById( state, acc.currencyId );

		content =
			<>
				<Text style={ styles.subTitle }>
					All wallets
				</Text>
				<Text style={ styles.title }>
					{ getAccountsTotalsInCurrency( accounts.byId ) } { currency.code }
				</Text>
			</>;
	}

	return (
		<View style={ { flex: 1, backgroundColor } }>
			{ content }
		</View>

	);
};

export default Overview;

const styles = StyleSheet.create( {
	container: {},
	title: { fontSize: 20, fontWeight: 'bold', paddingTop: 30, textAlign: 'center' },
	subTitle: { fontSize: 16, fontWeight: 'bold', left: 30 },
} );
