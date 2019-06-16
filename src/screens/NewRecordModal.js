/**
 * External dependencies
 */
import React from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { Input, ListItem, ButtonGroup, Button as EButton } from 'react-native-elements';
import { connect } from 'react-redux';
import moment from 'moment';

/**
 * Internal dependencies
 */
import DatePicker from '../components/DatePickerModal';
import { createNewRecord, updateRecord } from '../actions/records';
import { getCurrencyById, getAccountById, getDefaultAccount, getCategoryById, getDefaultCategory } from '../selectors';

class NewRecordModal extends React.Component {
	static navigationOptions = ( { navigation } ) => {
		const title = navigation.state.params && navigation.state.params.isEdit ? 'Edit' : 'Done';

		return {
			title: 'Add record',
			headerRight: (
				<Button
					onPress={ () => navigation.state.params.createNewRecordAndGoBack() }
					title={ title }
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
			amount: null,
			description: '',
			accountId: account.id,
			currencyId: account.currencyId,
			categoryId: category.id,
			createdAt: Date.now(),
			typeId: 2,
			isEdit,
		};

		if ( isEdit ) {
			const draftRecord = props.draftRecord;
			this.state = Object.assign( {}, this.setState, draftRecord );
		}

		props.navigation.setParams(
			{
				createNewRecordAndGoBack: this.createNewRecordAndGoBack.bind( this ),
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

	createNewRecordAndGoBack() {
		const { amount, description, accountId, currencyId, categoryId, createdAt, typeId } = this.state;
		const { _createNewRecord, _updateRecord, navigation } = this.props;

		const record = {
			amount: amount ? amount : Math.round( 12 * ( 1 + Math.random( 10 ) ) ), // TODO: REMOVE RANDOM
			description,
			currencyId,
			accountId,
			categoryId,
			createdAt,
			typeId,
			type: 'expense',
		};
		// Sanitize record object!
		if ( ! record.id ) {
			_createNewRecord( record );
		} else {
			_updateRecord( record );
		}
		navigation.navigate( 'Main' );
	}

	onStateChange = ( value, name ) => this.setState( { [ name ]: value } )

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
									let d = new Date(); // Today!
									if ( isToday ) {
										d = d.setDate( d.getDate() - 1 ); // Yesterday
									}
									return this.onStateChange( d, 'createdAt' );
								} }
							/>
						}
					/>
				) }
				onDateChanged={ ( { date } ) => this.onStateChange( Date.parse( date ), 'createdAt' ) }
			/>
		);
	}

	render() {
		console.log( '!!!!!!!! NewRecordModal screen render' );

		const { amount, description, accountId, currencyId, categoryId, typeId } = this.state;
		const { navigation } = this.props;

		const category = getCategoryById( this.props, categoryId );
		const account = getAccountById( this.props, accountId );
		const currency = getCurrencyById( this.props, currencyId );

		const buttons = [ 'expense', 'income', 'transfer' ];

		return (
			<View style={ { backgroundColor: '#f9f9f9' } }>
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
							value={ amount }
							placeholder="0.0"
							onChangeText={ ( amnt ) => this.onStateChange( amnt, 'amount' ) }
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
						name: category.icon,
						type: 'font-awesome',
						reverse: true,
						reverseColor: 'white',
						color: category.color,
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
						name: 'ios-wallet',
						type: 'ionicon',
						size: 25,
						containerStyle: { paddingLeft: 15, paddingRight: 14 },
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
			</View>
		);
	}
}

const mapStateToProps = ( state ) => {
	// console.log( state );

	const { draftRecord, categories, currencies, accounts } = state;
	return {
		draftRecord,
		categories,
		currencies,
		accounts,
	};
};

const mapDispatchToProps = ( dispatch ) => {
	return {
		_createNewRecord: ( draftRecord ) => dispatch( createNewRecord( draftRecord ) ),
		_updateRecord: ( draftRecord ) => dispatch( updateRecord( draftRecord ) ),
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

