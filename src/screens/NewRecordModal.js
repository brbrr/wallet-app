/**
 * External dependencies
 */
import React from 'react';
import { ScrollView, Button, Text, StyleSheet } from 'react-native';
import { Input, ListItem, ButtonGroup, Button as EButton } from 'react-native-elements';
import { connect } from 'react-redux';
import moment from 'moment';

/**
 * Internal dependencies
 */
import DatePicker from '../components/DatePickerModal';
import { createNewRecord, updateRecord, deleteRecord } from '../actions/records';
import { getCurrencyById, getAccountById, getDefaultAccount, getCategoryById, getDefaultCategory, getRecordById } from '../selectors';
import { updateAccountBalance } from '../actions';
import { getAccountsUpdateDirective, convertRecordAmountToAccountCurrency, getUpdatedAccountBalanceAfterDeletedRecord } from '../utils';

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
			amount: 0,
			description: '',
			accountId: account.id,
			currencyId: account.currencyId,
			categoryId: category.id,
			createdAt: Date.now(),
			typeId: 0,
			isEdit,
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
		Object.entries( this.props ).forEach( ( [ key, val ] ) =>
			prevProps[ key ] !== val && console.log( `Prop '${ key }' changed` )
		);
		Object.entries( this.state ).forEach( ( [ key, val ] ) =>
			prevState[ key ] !== val && console.log( `State '${ key }' changed` )
		);
	}

	getRecordFromState() {
		const { amount, description, accountId, currencyId, categoryId, createdAt, typeId, isEdit, id } = this.state;

		const record = {
			amount: amount ? Number( amount ) : Math.round( 12 * ( 1 + Math.random( 10 ) ) ), // TODO: REMOVE RANDOM
			amountInAccountCurrency: 0,
			description,
			currencyId,
			accountId,
			categoryId,
			createdAt,
			typeId,
			type: 'expense',
		};

		// If amount, currencyId, or accountId don't changed - we not need to re-calculate this value. Maybe a room for optimization?
		record.amountInAccountCurrency = convertRecordAmountToAccountCurrency( this.props, record );

		if ( isEdit ) {
			record.id = id;
		}

		return record;
	}

	saveRecordAndGoBack() {
		const { accountId, isEdit } = this.state;
		const { _createNewRecord, _updateRecord, _updateAccountBalance, navigation } = this.props;
		const account = getAccountById( this.props, accountId );
		const record = this.getRecordFromState();

		console.log( record, account );

		// Sanitize record object! e.g. amount value
		// this should be called _before_ updating the account and after record got assigned an id
		const updateDirective = getAccountsUpdateDirective( this.props, record );
		Object.entries( updateDirective ).forEach( ( [ accId, newBalance ] ) => {
			const acc = getAccountById( this.props, accId );
			_updateAccountBalance( acc, newBalance );
		} );
		if ( ! isEdit ) {
			_createNewRecord( record );
		} else {
			_updateRecord( record );
		}

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
			console.log( 'DO SOMETHING!' );
			return null;
		}

		const record = this.getRecordFromState();
		const account = getAccountById( this.props, record.accountId );

		const updatedBalance = getUpdatedAccountBalanceAfterDeletedRecord( this.props, record.id );
		_updateAccountBalance( account, updatedBalance );

		_deleteRecord( record );
		navigation.navigate( 'Main' );
	}

	onStateChange = ( state ) => this.setState( state )

	// Don't allow multiple periods in amount
	onAmountChange( amount ) {
		const periodCount = ( amount.match( /\./g ) || [] ).length;
		if ( periodCount < 2 ) {
			this.onStateChange( { amount } );
		}
	}

	renderDatePicker() {
		const { createdAt } = this.state;
		const isToday = moment( createdAt ).isSame( Date.now(), 'day' );
		const dateTitle = isToday ? 'Today' : moment( createdAt ).format( 'dddd, D MMM' );

		return (
			<DatePicker
				startDate={ new Date( createdAt ) }
				renderDate={ () => (
					<ListItem
						containerStyle={ styles.iconContainer }
						title={ dateTitle }
						bottomDivider={ true }
						topDivider={ true }
						leftIcon={ {
							name: 'ios-calendar',
							type: 'ionicon',
							size: 25,
							containerStyle: { paddingLeft: 15, paddingRight: 14 },
						} }
						rightElement={
							<EButton
								title={ isToday ? 'Yesterday?' : 'Today?' }
								type="clear"
								titleStyle={ { fontSize: 13 } }
								onPress={ () => {
									let date = new Date(); // Today!
									if ( isToday ) {
										date = date.setDate( date.getDate() - 1 ); // Yesterday
									}
									return this.onStateChange( { createdAt: date } );
								} }
							/>
						}
					/>
				) }
				onDateChanged={ ( { date } ) => this.onStateChange( { createdAt: Date.parse( date ) } ) }
			/>
		);
	}

	render() {
		console.log( '!!!!!!!! NewRecordModal screen render' );

		const { amount, description, accountId, currencyId, categoryId, typeId, isEdit } = this.state;
		const { navigation } = this.props;

		const category = getCategoryById( this.props, categoryId );
		const account = getAccountById( this.props, accountId );
		const currency = getCurrencyById( this.props, currencyId );

		const buttons = [ 'expense', 'income', 'transfer' ];

		return (
			<ScrollView style={ { backgroundColor: '#f9f9f9' } }>
				<ButtonGroup
					onPress={ ( id ) => this.setState( { typeId: id } ) }
					selectedIndex={ typeId }
					buttons={ buttons }
					containerStyle={ { borderRadius: 5, height: 25 } }
				/>

				<ListItem
					containerStyle={ Object.assign( {}, styles.iconContainer, { height: 100 } ) }
					title="Amount"
					titleStyle={ styles.amountTitle }
					subtitle={
						<Input
							containerStyle={ { paddingHorizontal: 0 } }
							inputContainerStyle={ { borderBottomWidth: 0 } }
							inputStyle={ styles.amountInput }
							keyboardType="numeric"
							value={ amount.toString() }
							placeholder="0.0"
							onChangeText={ ( amnt ) => this.onAmountChange( amnt ) }
							autoFocus
						/>
					}
					bottomDivider={ true }
					topDivider={ true }
					leftElement={
						<Text
							onPress={ () => navigation.navigate( 'Currencies', { onStateChange: this.onStateChange } ) }
							style={ styles.currencyButton }
						>
							{ currency.code }
						</Text>
					}
				/>

				<ListItem
					containerStyle={ styles.iconContainer }
					title={ category.name }
					bottomDivider={ true }
					topDivider={ true }
					leftIcon={ {
						name: category.iconName,
						type: 'font-awesome',
						reverse: true,
						reverseColor: 'white',
						color: category.colorCode,
						size: 20,
						containerStyle: { margin: -4 },
					} }
					onPress={ () => navigation.navigate( 'Categories', { onStateChange: this.onStateChange } ) }
				/>

				<ListItem
					containerStyle={ styles.iconContainer }
					title={ account.name }
					bottomDivider={ true }
					topDivider={ true }
					leftIcon={ {
						name: account.iconName,
						type: 'font-awesome',
						reverse: true,
						reverseColor: 'white',
						color: account.colorCode,
						size: 20,
						containerStyle: { margin: -4 },
					} }
					onPress={ () => navigation.navigate( 'Accounts', { onStateChange: this.onStateChange } ) }
				/>

				{ this.renderDatePicker() }

				<ListItem
					containerStyle={ Object.assign( {}, styles.iconContainer, { height: 70 } ) }
					title={
						<Input
							containerStyle={ { paddingHorizontal: 0 } }
							inputContainerStyle={ { borderBottomWidth: 0 } }
							value={ description }
							placeholder="Description"
							onChangeText={ ( desc ) => this.setState( { description: desc } ) }
						/>
					}
					bottomDivider={ true }
					topDivider={ true }
					leftIcon={ {
						name: 'md-text',
						type: 'ionicon',
						size: 25,
						containerStyle: { paddingLeft: 15, paddingRight: 14 },
					} }
				/>

				{ isEdit && <ListItem
					containerStyle={ styles.iconContainer }
					title={
						<Button
							onPress={ this.deleteRecordAndGoBack }
							title="Delete"
							color="red"
						/>
					}
					bottomDivider={ true }
					topDivider={ true }
				/> }
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
		_createNewRecord: ( record ) => dispatch( createNewRecord( record ) ),
		_updateRecord: ( record ) => dispatch( updateRecord( record ) ),
		_updateAccountBalance: ( account, newBalance ) => dispatch( updateAccountBalance( account, newBalance ) ),
		_deleteRecord: ( record ) => dispatch( deleteRecord( record ) ),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)( NewRecordModal );

const styles = StyleSheet.create( {
	iconContainer: {
		paddingTop: 3,
		paddingBottom: 3,
		height: 55,
	},
	currencyButton: {
		color: 'grey',
		padding: 3,
		borderWidth: 1,
		borderColor: 'grey',
		borderRadius: 3,
		backgroundColor: '#f9f9f9',
		marginLeft: 7,
		marginRight: 9,
	},
	amountTitle: { fontSize: 14, marginTop: 2 },
	amountInput: { fontSize: 26, color: 'black' },
} );

