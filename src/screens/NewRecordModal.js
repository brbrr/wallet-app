/**
 * External dependencies
 */
import React from 'react';
import { ScrollView, Button, Alert, View } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import { addNewRecord, updateRecord, deleteRecord, insertRecordAndUpdateAccounts } from '../actions/records';
import { getAccountById, getDefaultAccount, getCategoryById, getDefaultCategory, getRecordById } from '../selectors';
import { updateAccountBalance } from '../actions/accounts';
import { convertRecordAmountToAccountCurrency, getUpdatedAccountBalanceAfterDeletedRecord } from '../utils';
import { logComponentUpdates } from '../utils/debug-utils';
import { TRANSFER } from '../constants/Records';
import AccountListItem from '../components/record-modal/AccountListItem';
import AmountListItem from '../components/record-modal/AmountListItem';
import DatePickerListItem from '../components/record-modal/DatePickerListItem';
import DescriptionListItem from '../components/record-modal/DescriptionListItem';
import DeleteButtonListItem from '../components/record-modal/DeleteButtonListItem';
import CategoryListItem from '../components/record-modal/CategoryListItem';

class NewRecordModal extends React.Component {
	static navigationOptions = ( { navigation } ) => {
		return {
			title: 'Add record',
			headerRight: (
				<Button
					onPress={ () => navigation.state.params.saveRecordAndGoBack() }
					title={ 'Save' }
				/>
			),
			headerLeft: (
				<Button
					// FIXME: goBack to the previous route instead of default `Home` route
					// onPress={ () => this.props.navigation.goBack(null) }
					onPress={ () => navigation.navigate( 'Main' ) }
					title="Dismiss"
				/>
			),
		};
	};

	constructor( props ) {
		super( props );
		const isEdit = props.navigation.getParam( 'isEdit', null );

		const account = getDefaultAccount( props );
		const category = getDefaultCategory( props );
		this.state = {
			amount: Math.round( 12 * ( 1 + Math.random( 10 ) ) ), // TODO: REMOVE RANDOM,
			amountInAccountCurrency: '0',
			description: '',
			accountId: account.id,
			currencyId: account.currencyId,
			categoryId: category.id,
			createdAt: Date.now(),
			updatedAt: Date.now(),
			typeId: 0,
			isEdit,
			toAccountId: -99, // Out of wallet
		};

		if ( isEdit ) {
			const recordId = props.navigation.getParam( 'recordId', null );
			const record = getRecordById( props, recordId );
			this.state = Object.assign( {}, this.state, record );
		}

		props.navigation.setParams(
			{
				saveRecordAndGoBack: this.saveRecordAndGoBack.bind( this ),
				isEdit,
			}
		);
	}

	shouldComponentUpdate( nextProps ) {
		if ( this.props.navigation !== nextProps.navigation ) {
			return false;
		}
		return true;
	}

	componentDidUpdate( prevProps, prevState ) {
		logComponentUpdates( this, prevProps, prevState );
	}

	getRecordFromState() {
		const { amount, description, accountId, currencyId, categoryId, createdAt, updatedAt, typeId, isEdit, id, toAccountId } = this.state;

		const record = {
			amount,
			amountInAccountCurrency: 0,
			description,
			currencyId,
			accountId,
			categoryId,
			createdAt,
			updatedAt,
			typeId,
		};

		// If amount, currencyId, or accountId don't changed - we not need to re-calculate this value. Maybe a room for optimization?
		record.amountInAccountCurrency = convertRecordAmountToAccountCurrency( this.props, record );

		if ( isEdit ) {
			record.id = id;
			record.updatedAt = Date.now();
		}

		if ( typeId === TRANSFER ) {
			record.toAccountId = toAccountId;
			//FIXME: This is a hacky way to force `convertRecordAmountToAccountCurrency` to use `toAccountId` for amount calculations.
			const hackyRecord = Object.assign( {}, record, { accountId: toAccountId } );
			record.amountInToAccountCurrency = convertRecordAmountToAccountCurrency( this.props, hackyRecord );

			delete record.categoryId;
		}

		return record;
	}

	saveRecordAndGoBack() {
		const { isEdit } = this.state;
		const { _insertRecordAndUpdateAccounts, navigation } = this.props;
		const record = this.getRecordFromState();

		// Sanitize record object! e.g. amount value
		let recordAction = addNewRecord;
		if ( isEdit ) {
			recordAction = updateRecord;
		}

		_insertRecordAndUpdateAccounts( recordAction, record );

		navigation.navigate( 'Main' );
	}

	/**
	 * Removes a record from the redux state. Also updates the account balance.
	 * Redirect back to home screen after removal
	 *
	 * @return {void}
	 */
	deleteRecordAndGoBack = () => {
		const { isEdit } = this.state;

		const { _deleteRecord, _updateAccountBalance, navigation } = this.props;

		if ( ! isEdit ) {
			return null;
		}

		const record = this.getRecordFromState();
		const account = getAccountById( this.props, record.accountId );

		const updatedBalance = getUpdatedAccountBalanceAfterDeletedRecord( this.props, record.id );

		Alert.alert(
			'Delete record',
			'Are you sure you want to delete this record?',
			[
				{
					text: 'Cancel',
					onPress: () => console.log( 'Cancel Pressed' ),
					style: 'cancel',
				},
				{ text: 'OK', onPress: () => {
					_updateAccountBalance( account, updatedBalance );

					_deleteRecord( record );
					navigation.navigate( 'Main' );
				} },
			],
			{ cancelable: false },
		);
	}

	onStateChange = ( state ) => {
		if ( state.currencyId || state.accountId ) {
			const { amount } = this.state;
			const accountId = state.accountId || this.state.accountId;
			const currencyId = state.currencyId || this.state.currencyId;
			const amountInAccountCurrency = convertRecordAmountToAccountCurrency( this.props, { amount, accountId, currencyId } );
			this.setState( { amountInAccountCurrency } );
		}
		this.setState( state );
	}

	// Don't allow multiple periods in amount
	onAmountChange = ( amount ) => {
		if ( this.state.amount === '0' && amount.length === 2 ) {
			return this.onStateChange( { amount: amount[ 1 ] } );
		}

		const periodCount = ( amount.match( /\./g ) || [] ).length;
		if ( periodCount < 2 ) {
			const { accountId, currencyId } = this.state;
			const amountInAccountCurrency = convertRecordAmountToAccountCurrency( this.props, { amount, accountId, currencyId } );

			this.onStateChange( { amount, amountInAccountCurrency } );
		}
	}

	renderAccountItem() {
		const { accountId, typeId } = this.state;
		const { navigation } = this.props;

		if ( typeId === TRANSFER ) {
			return this.renderAccountTransferItems();
		}

		const account = getAccountById( this.props, accountId );

		return <AccountListItem account={ account } onPress={ () => navigation.navigate( 'Accounts', { onStateChange: this.onStateChange } ) } />;
	}

	renderAccountTransferItems() {
		const { accountId, toAccountId } = this.state;
		const { navigation } = this.props;

		const fromAccount = getAccountById( this.props, accountId );
		const toAccount = getAccountById( this.props, toAccountId );
		return (
			<View>
				<AccountListItem account={ fromAccount } onPress={ () => navigation.navigate( 'Accounts', { onStateChange: this.onStateChange, hideId: toAccount.id } ) } />
				<AccountListItem account={ toAccount } onPress={ () => navigation.navigate( 'Accounts', { onStateChange: this.onStateChange, idName: 'toAccountId', hideId: fromAccount.id } ) } />
			</View>
		);
	}

	render() {
		console.log( '!!!!!!!! NewRecordModal screen render' );

		const { description, categoryId, typeId, isEdit, createdAt } = this.state;
		const { navigation } = this.props;

		const category = getCategoryById( this.props, categoryId );

		return (
			<ScrollView style={ { backgroundColor: '#f9f9f9' } }>
				<ButtonGroup
					onPress={ ( id ) => this.setState( { typeId: id } ) }
					selectedIndex={ typeId }
					buttons={ [ 'expense', 'income', 'transfer' ] }
					containerStyle={ { borderRadius: 5, height: 25 } }
				/>

				<AmountListItem
					record={ this.getRecordFromState() }
					onNavigation={ () => navigation.navigate( 'Currencies', { onStateChange: this.onStateChange } ) }
					onAmountChange={ this.onAmountChange }
				/>

				<CategoryListItem
					category={ category }
					typeId={ typeId }
					onNavigation={ () => navigation.navigate( 'Categories', { onStateChange: this.onStateChange } ) }
				/>

				{ this.renderAccountItem() }

				<DatePickerListItem
					createdAt={ createdAt }
					onStateChange={ this.onStateChange } />

				<DescriptionListItem
					description={ description }
					onStateChange={ this.onStateChange } />

				{ isEdit && <DeleteButtonListItem onPress={ this.deleteRecordAndGoBack } /> }
			</ScrollView>
		);
	}
}

const mapStateToProps = ( state ) => {
	const { categories, currencies, accounts, records } = state;
	return {
		records,
		categories,
		currencies,
		accounts,
	};
};

const mapDispatchToProps = ( dispatch ) => {
	return {
		_updateAccountBalance: ( account, newBalance ) => dispatch( updateAccountBalance( account, newBalance ) ),
		_deleteRecord: ( record ) => dispatch( deleteRecord( record ) ),
		_insertRecordAndUpdateAccounts: ( recordAction, record ) => dispatch( insertRecordAndUpdateAccounts( recordAction, record ) ),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)( NewRecordModal );
