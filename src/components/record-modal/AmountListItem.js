/**
 * External dependencies
 */
import React from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import { ListItem } from 'react-native-elements';
import c from 'currency.js';

/**
 * Internal dependencies
 */
import { getAmountSign } from '../../utils';
import styles from './styles';
import { TRANSFER, INCOME, EXPENSE } from '../../constants/Records';

const AmountListItem = ( { amount, amountInAccountCurrency, typeId, account, toAccount, currency, onNavigation, onAmountChange } ) => {
	/**
	 * EXPENSE/INCOME:
	 * When recordCurrency is different from accountCurrency
	 *
	 * Transfer:
	 * recordCurrency/accountCurrency is different from toAccountCurrency
	 */

	let inputComponent = <AmountBox
		amount={ amountInAccountCurrency }
		amountSign={ getAmountSign( typeId ) }
		onAmountChange={ onAmountChange }

	/>;

	if (
		( ( typeId === EXPENSE || typeId === INCOME ) && ( currency.id !== account.currencyId ) ) ||
		( ( typeId === TRANSFER ) && ( currency.id !== toAccount.currencyId ) )
	) {
		inputComponent = <InputBoxWithConversion amount={ amount } onAmountChange={ onAmountChange } typeId={ typeId } amountInAccountCurrency={ amountInAccountCurrency } />;
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

const InputBoxWithConversion = ( { amount, onAmountChange, typeId, amountInAccountCurrency } ) =>
	<View style={ { flexDirection: 'row' } }>
		<AmountBox
			isInput
			amount={ amount }
			amountSign={ getAmountSign( typeId ) }
			onAmountChange={ onAmountChange }
		/>
		<View style={ { flex: 1, justifyContent: 'center', alignItems: 'center' } }>
			<Text style={ amountStyles.textStyle }>{ '>' }</Text>
		</View>
		<AmountBox
			amount={ amountInAccountCurrency }
			amountSign={ getAmountSign( typeId ) }
			onAmountChange={ onAmountChange }
		/>
	</View>;

const AmountBox = ( { amount, amountSign, onAmountChange, isInput } ) =>
	<View style={ amountStyles.amountBoxStyle }>
		<Text style={ amountStyles.textStyle }>{ amountSign }</Text>
		{
			isInput ?
				<AmountInput amount={ amount } onAmountChange={ onAmountChange } /> :
				<Text style={ amountStyles.textStyle }>{ c( amount ).value }</Text>
		}
	</View>;

const InputBox = ( { amount, onAmountChange, typeId } ) =>
	<View style={ { flexDirection: 'row' } }>
		<Text style={ amountStyles.textStyle }>{ getAmountSign( typeId ) }</Text>
		<AmountInput amount={ amount } onAmountChange={ onAmountChange } />
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

export default AmountListItem;

const amountStyles = StyleSheet.create( {
	amountBoxStyle: {
		flexDirection: 'row',
		flex: 4,
		// borderRadius: 12,
		// borderColor: 'lightgrey',
		// borderWidth: 1,
		// backgroundColor: 'lightgrey',
		// borderLeftWidth: 1,
		// borderRightWidth: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	textStyle: Object.assign( {}, styles.amountInput, { fontSize: 20 } ),
} );
