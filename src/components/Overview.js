/**
 * External dependencies
 */
import React from 'react';
import {
	Text,
	View,
	StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import { getAccountsTotalsInCurrency } from '../utils';
import { getDefaultAccount, getCurrencyById } from '../selectors';

const Overview = ( props ) => {
	const { account, accounts } = props;
	let backgroundColor = account ? account.colorCode : '#8B9FBB';

	let content = '';
	if ( account ) {
		const currency = getCurrencyById( props, account.currencyId );

		content = <>
			<Text style={ styles.subTitle }>
				{ account.name }
			</Text>
			<Text style={ styles.title }>
				{ account.balance } { currency.code }
			</Text>
		</>;
	} else {
		const acc = getDefaultAccount( props );
		const currency = getCurrencyById( props, acc.currencyId );
		backgroundColor = acc.colorCode;

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

// export default Overview;

const mapStateToProps = ( state ) => {
	const { categories, currencies, accounts, records } = state;
	return {
		records,
		categories,
		currencies,
		accounts,
	};
};

const mapDispatchToProps = () => ( {} );

export default connect(
	mapStateToProps,
	mapDispatchToProps
)( Overview );

const styles = StyleSheet.create( {
	container: {},
	title: { fontSize: 20, fontWeight: 'bold', textAlign: 'center' },
	subTitle: { fontSize: 16, fontWeight: 'bold', left: 30, paddingTop: 10 },
} );
