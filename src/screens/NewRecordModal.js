/**
 * External dependencies
 */
import React from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { Input, ListItem, ButtonGroup } from 'react-native-elements';
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
		this.state = {
			amount: null,
			selectedIndex: 2,
		};
		this.updateIndex = this.updateIndex.bind( this );
		this.props.navigation.setParams(
			{ createNewRecordAndGoBack: this.createNewRecordAndGoBack.bind( this ) }
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

	updateIndex( selectedIndex ) {
		this.setState( { selectedIndex } );
	}

	createNewRecordAndGoBack() {
		const { amount } = this.state;
		const { _createNewRecord, navigation, draftRecord } = this.props;
		const record = Object.assign( {
			amount: amount ? amount : Math.round( 12 * ( 1 + Math.random( 10 ) ) ),
			createdAt: Date.now(),
			description: 'test',
			type: 'expense',
		}, draftRecord );
		_createNewRecord( record );
		navigation.navigate( 'Main' );
	}

	render() {
		const { amount, selectedIndex } = this.state;
		const { draftRecord, categories, currencies, accounts } = this.props;

		const category = categories.byId[ draftRecord.categoryId ];
		const currency = currencies.byId[ draftRecord.currencyId ];
		const account = accounts.byId[ draftRecord.accountId ];

		const buttons = [ 'Hello', 'World', 'Buttons' ];

		return (
			<View style={ { backgroundColor: '#f9f9f9' } }>
				<ButtonGroup
					onPress={ this.updateIndex }
					selectedIndex={ selectedIndex }
					buttons={ buttons }
					containerStyle={ { borderRadius: 5, height: 20 } }
				/>

				<ListItem
					containerStyle={ Object.assign( {}, styles.iconContainer, { height: 70 } ) }
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
		_createNewRecord: ( draftRecord ) => {
			dispatch( createNewRecord( draftRecord ) );
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

