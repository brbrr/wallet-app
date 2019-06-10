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
import { selectRecordType, selectRecordDate, resetDraftRecord } from '../actions';
import { getCurrencyById, getAccountById } from '../selectors';

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

		const draftRecord = props.draftRecord;
		const isEdit = props.navigation.getParam( 'isEdit', null );

		this.state = {
			amount: draftRecord.amount ? `${ draftRecord.amount }` : null,
			selectedIndex: 2,
			description: draftRecord.description ? draftRecord.description : '',
		};
		props.navigation.setParams(
			{
				createNewRecordAndGoBack: this.createNewRecordAndGoBack.bind( this ),
				isEdit,
			}
		);
		// NOTE: We need to reset draftRecord to clean-up all the leftovers from previous drafts
		if ( ! isEdit ) {
			props._resetDraftRecord();
		}
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
		const { amount, description } = this.state;
		const { _createNewRecord, _updateRecord, navigation, draftRecord } = this.props;

		const account = getAccountById( this.props, draftRecord.accountId );
		const currency = getCurrencyById( this.props, account.currencyId );
		const record = Object.assign( draftRecord, {
			amount: amount ? amount : Math.round( 12 * ( 1 + Math.random( 10 ) ) ), // TODO: REMOVE RANDOM
			description,
			currencyId: currency.id,
			type: 'expense',
		} );

		if ( ! record.id ) {
			_createNewRecord( record );
		} else {
			_updateRecord( record );
		}
		navigation.navigate( 'Main' );
	}

	// TODO: here we might be using _old_ date for new records.
	renderDatePicker() {
		const { _selectRecordDate, draftRecord } = this.props;
		const isToday = moment( draftRecord.createdAt ).isSame( Date.now(), 'day' );
		const dateTitle = isToday ? 'Today' : moment( draftRecord.createdAt ).format( 'dddd, D MMM' );

		return (
			<DatePicker
				startDate={ new Date( draftRecord.createdAt ) }
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
									return _selectRecordDate( d );
								} }
							/>
						}
					/>
				) }
				onDateChanged={ ( { date } ) => _selectRecordDate( Date.parse( date ) ) }
			/>
		);
	}

	render() {
		console.log( '!!!!!!!! NewRecordModal screen render' );

		const { amount, description } = this.state;
		const { draftRecord, categories, _selectRecordType } = this.props;

		const category = categories.byId[ draftRecord.categoryId ];
		const account = getAccountById( this.props, draftRecord.accountId );
		const currency = getCurrencyById( this.props, account.currencyId );

		const buttons = [ 'expense', 'income', 'transfer' ];

		return (
			<View style={ { backgroundColor: '#f9f9f9' } }>
				<ButtonGroup
					onPress={ ( id ) => _selectRecordType( id ) }
					selectedIndex={ draftRecord.typeId }
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
							value={ amount }
							placeholder="0.0"
							onChangeText={ ( amnt ) => this.setState( { amount: amnt } ) }
							autoFocus
						/>
					}
					bottomDivider={ true }
					topDivider={ true }
					leftElement={
						<Text
							onPress={ () => this.props.navigation.navigate( 'Currencies' ) }
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
					onPress={ () => this.props.navigation.navigate( 'Categories' ) }
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
					onPress={ () => this.props.navigation.navigate( 'Accounts' ) }
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
	console.log( state );

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
		_selectRecordType: ( id ) => dispatch( selectRecordType( id ) ),
		_selectRecordDate: ( date ) => dispatch( selectRecordDate( date ) ),
		_resetDraftRecord: () => dispatch( resetDraftRecord() ),
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

