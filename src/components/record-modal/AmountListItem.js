/**
 * External dependencies
 */
import React from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import { ListItem } from '@rneui/themed';
import c from 'currency.js';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import { getAmountSign } from '../../utils';
import styles from './styles';
import { TRANSFER } from '../../constants/Records';
import { getCurrencyById, getAccountById } from '../../selectors';

const AmountListItem = ( props ) => {
	const { record, onNavigation, onAmountChange } = props;
	const { amount, amountInAccountCurrency, typeId, accountId, toAccountId, currencyId } = record;
	const currency = getCurrencyById( props, currencyId );
	const account = getAccountById( props, accountId );
	const toAccount = getAccountById( props, toAccountId );

	/**
	 * EXPENSE/INCOME:
	 * When recordCurrency is different from accountCurrency
	 *
	 * Transfer:
	 * recordCurrency/accountCurrency is different from toAccountCurrency
	 */

	/**
	 *
	 * TODO: Instead of showing conversion in the single ListItem, add a new one with converted value
	 */

	let inputComponent =
		<AmountBox
			amount={ amount }
			amountSign={ getAmountSign( typeId ) }
			onAmountChange={ onAmountChange }
		/>;

	// const isShowConversionRatesForExpenseIncome = ( typeId === EXPENSE || typeId === INCOME ) && ( currency.id !== account.currencyId );
	const isShowConversionRates = currency.id !== account.currencyId;

	const isShowConversionRatesForTransfers = ( typeId === TRANSFER ) && ( toAccountId !== -99 ) && ( currency.id !== toAccount.currencyId );

	if ( isShowConversionRates || isShowConversionRatesForTransfers ) {
		const toCurrencyId = isShowConversionRates ? account.currencyId : toAccount.currencyId;
		const toCurrency = getCurrencyById( props, toCurrencyId );

		inputComponent = <InputBoxWithConversion
			amount={ amount }
			onAmountChange={ onAmountChange }
			typeId={ typeId }
			amountInAccountCurrency={ amountInAccountCurrency }
			fromCurrency={ currency }
			toCurrency={ toCurrency }
		/>;
	}

	return (
		<ListItem
			containerStyle={ Object.assign( {}, styles.iconContainer, { height: 100 } ) }
			title="Amount"
			titleStyle={ styles.amountTitle }
			subtitle={ inputComponent }
			bottomDivider={ true }
			topDivider={ true }
			leftElement={
				<Text
					onPress={ onNavigation }
					style={ styles.currencyButton }
				>
					{ currency.code }
				</Text>
			}
		/>
	);
};

const InputBoxWithConversion = ( { amount, onAmountChange, typeId, amountInAccountCurrency, toCurrency, fromCurrency } ) =>
	<View style={ amountStyles.amountBoxStyle }>
		<AmountBox
			amount={ amount }
			amountSign={ getAmountSign( typeId ) }
			onAmountChange={ onAmountChange }
			currencyCode={ fromCurrency.code }
		/>
		<View style={ { width: 30, alignItems: 'center' } } >
			<Text style={ amountStyles.textStyle }>{ '>' }</Text>
		</View>
		<AmountBox
			isIntupt={ false }
			amount={ amountInAccountCurrency }
			amountSign={ getAmountSign( typeId ) }
			onAmountChange={ onAmountChange }
			currencyCode={ toCurrency.code }
		/>
	</View>;

const AmountBox = ( { amount, amountSign, onAmountChange, isInput = true, currencyCode } ) =>
	<View style={ { flexDirection: 'row' } }>
		<Text style={ amountStyles.textStyle }>{ amountSign }</Text>
		{
			isInput ?
				<AmountInput amount={ amount } onAmountChange={ onAmountChange } /> :
				<Text style={ amountStyles.textStyle }>{ c( amount ).value }</Text>
		}

		{ currencyCode && <Text style={ [ amountStyles.textStyle, { paddingLeft: 5 } ] }>{ currencyCode }</Text> }
	</View>;

const AmountInput = ( { amount, onAmountChange } ) =>
	<TextInput
		style={ amountStyles.textStyle }
		keyboardType="numeric"
		value={ amount.toString() }
		placeholder="0"
		placeholderTextColor="black"
		// caretHidden
		onChangeText={ ( amnt ) => onAmountChange( amnt ) }
		autoFocus
	/>;

const amountStyles = StyleSheet.create( {
	amountBoxStyle: {
		flexDirection: 'row',
		flex: 1,
		// borderRadius: 12,
		// borderColor: 'lightgrey',
		// borderWidth: 1,
		// backgroundColor: 'lightgrey',
		// borderLeftWidth: 1,
		// borderRightWidth: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	textStyle: Object.assign( {}, styles.amountInput, { fontSize: 20 } ),
} );

// export AmountListItem;

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
)( AmountListItem );
