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
import { Divider } from 'react-native-elements';

/**
 * Internal dependencies
 */
import { getAccountsTotalsInCurrency } from '../utils';
import { getDefaultAccount, getCurrencyById } from '../selectors';

const Overview = ( props ) => {
	const { account, accounts } = props;
	let backgroundColor = account ? account.colorCode : '#8B9FBB';

	let title = '';
	let accountBalance = '';
	if ( account ) {
		const currency = getCurrencyById( props, account.currencyId );
		title = account.name;
		accountBalance = `${ account.balance } ${ currency.code }`;
	} else if ( accounts.allIds < 1 ) {
		title = 'No accounts';
		accountBalance = `Add new account!`;
	} else {
		const acc = getDefaultAccount( props );
		const currency = getCurrencyById( props, acc.currencyId );
		backgroundColor = acc.colorCode;
		title = 'All wallets';
		accountBalance = `${ getAccountsTotalsInCurrency( props, accounts.byId ) } ${ currency.code }`;
	}

	return (
		<View style={ styles.container( backgroundColor ) }>
			<View style={ styles.rect }>
				<View style={ { flex: 10 } }>
					<Text style={ styles.subTitle }>
						{ title }
					</Text>
					<Text style={ styles.title }>
						{ accountBalance }
					</Text>
				</View>
				<View
					style={ {
						flex: 0.1,
						backgroundColor: 'black',
						width: 0.1,

					} }
				/>
				<View style={ { flex: 10 } }>
					<Text style={ styles.subTitle }>
						{ 'total spent' }
					</Text>
					<Text style={ styles.title }>
						{ 'totalSpend' }
					</Text>
				</View>
			</View>
		</View>
	);
};

const mapStateToProps = ( state ) => {
	const { currencies, accounts } = state;
	return {
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
	container: ( backgroundColor ) => ( { flex: 1, backgroundColor, justifyContent: 'center', alignItems: 'center' } ),
	title: { fontSize: 20, fontWeight: 'bold', textAlign: 'center' },
	subTitle: { fontSize: 16, fontWeight: 'bold', left: 30, paddingTop: 10 },
	rect: {
		height: 100,
		marginLeft: 15,
		marginRight: 15,
		backgroundColor: 'rgba(230, 230, 230,1)',
		borderRadius: 18,
		borderColor: '#000000',
		borderWidth: 0,
		flexDirection: 'row',
	},
} );
