/**
 * External dependencies
 */
import React from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { Input, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import { createNewRecord } from '../actions/records';

class NewRecordModal extends React.Component {
	static navigationOptions = ( { navigation } ) => ( {
		title: 'Add record',
		headerRight: (
			<Button
				onPress={ () => navigation.state.params.createNewRecordAndGoBack() }
				title="Done"
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
	} );

	constructor( props ) {
		super( props );
		this.state = { text: 'amount', currency: '', realm: null, category: 'default', account: 'Cash' };
		this.props.navigation.setParams( { createNewRecordAndGoBack: this.createNewRecordAndGoBack.bind( this ) } );
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
		const { _createNewRecord, navigation, draftRecord } = this.props;
		_createNewRecord();
		navigation.navigate( 'Main' );
	}

	render() {
		const { amount } = this.state;
		const { draftRecord, categories, currencies, accounts } = this.props;

		const category = categories.byId[ draftRecord.categoryId ];
		const currency = currencies.byId[ draftRecord.currencyId ];
		const account = accounts.byId[ draftRecord.accountId ];

		return (
			<View style={ { backgroundColor: '#f9f9f9' } }>
				<ListItem
					containerStyle={ styles.iconContainer }
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
						/>
					}
					bottomDivider={ true }
					topDivider={ true }
					leftElement={
						<Text
							onPress={ () => this.props.navigation.navigate( 'Currencies' ) }
							style={ styles.currencyButton }
						>
							{ currency.name }
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
						color: 'red',
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
			</View>
		);
	}
}

const mapStateToProps = ( state, ownProps ) => {
	console.log( state );

	const { records, draftRecord, categories, currencies, accounts } = state;
	return {
		records,
		draftRecord,
		categories,
		currencies,
		accounts,
	};
};

const mapDispatchToProps = ( dispatch ) => {
	return {
		_createNewRecord: ( amount, currency, category ) => {
			dispatch( createNewRecord( amount, currency, category ) );
		},
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
	amountTitle: { fontSize: 12, marginTop: 2 },
	amountInput: { fontSize: 20, color: 'black' },
} );

