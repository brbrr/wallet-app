/**
 * External dependencies
 */
import React, { Component } from 'react';
import { Button } from 'react-native';
import { connect } from 'react-redux';
import { omit } from 'lodash';
/**
 * Internal dependencies
 */
import { selectRecordAccount, updateAccountsOrder } from '../actions';
import { getAccountsById, getAccountOrder } from '../selectors';
import AccountsList from '../components/AccountsList';
import { logComponentUpdates } from '../utils/debug-utils';

export class AccountsScreen extends Component {
	static navigationOptions = ( { navigation } ) => {
		const isReorderEnabled = navigation.getParam( 'isReorderEnabled', false );
		const _updateAccountsOrder = navigation.getParam( 'updateAccountsOrder', false );
		const localAccountOrder = navigation.getParam( 'localAccountOrder' );

		const headersConfig = {
			rightTitle: 'Add',
			leftTitle: 'Back',
			leftOnPress: () => navigation.goBack( null ),
			rightOnPress: () => navigation.navigate( 'NewAccount' ),
		};

		if ( isReorderEnabled ) {
			headersConfig.rightTitle = 'Done';
			headersConfig.rightOnPress = () => _updateAccountsOrder( localAccountOrder ) && navigation.setParams( { isReorderEnabled: false } );
			headersConfig.leftTitle = 'Cancel';
			headersConfig.leftOnPress = () => navigation.setParams( { isReorderEnabled: false } );
		}
		return {
			title: 'Accounts',
			headerRight: (
				<Button
					testID="headerRight"
					onPress={ headersConfig.rightOnPress }
					title={ headersConfig.rightTitle }
				/>
			),
			headerLeft: (
				<Button
					testID="headerLeft"
					onPress={ headersConfig.leftOnPress }
					title={ headersConfig.leftTitle }
				/>
			),
		};
	};

	constructor( props ) {
		super( props );

		this.state = { localAccountOrder: props.accountOrder };

		props.navigation.setParams( {
			updateAccountsOrder: props._updateAccountsOrder.bind( this ),
			localAccountOrder: props.accountOrder,
		} );
	}

	componentDidUpdate( prevProps, prevState ) {
		logComponentUpdates( this, prevProps, prevState );
	}

	onReorderToggle = () => this.props.navigation.setParams( { isReorderEnabled: true } )

	onChangeOrder = ( key, newAccountOrder ) => {
		this.setState( { localAccountOrder: newAccountOrder } );
		this.props.navigation.setParams( { localAccountOrder: newAccountOrder } ); // We need this to update order in redux state within screen header
	}

	onListRowPress = ( accountId ) => {
		const { navigation } = this.props;
		const onStateChange = navigation.getParam( 'onStateChange' );
		const idName = navigation.getParam( 'idName', 'accountId' );

		onStateChange( { [ idName ]: accountId } );
		navigation.goBack( null );
	}

	render() {
		const { accountsById, navigation, serviceAccountId } = this.props;
		let { localAccountOrder } = this.state;
		const isReorderEnabled = navigation.getParam( 'isReorderEnabled', false );
		const enableReorder = navigation.getParam( 'enableReorder', false );
		let accounts = accountsById;

		/**
		 * hideId is a param used to hide specific account from the list.
		 * It's useful _only_ for account selection for transfers (to hide already selected account)
		 */
		const hideId = navigation.getParam( 'hideId', false );
		if ( hideId ) {
			accounts = omit( accountsById, hideId );
			localAccountOrder = localAccountOrder.filter( ( id ) => id !== hideId );
			if ( hideId !== serviceAccountId ) {
				localAccountOrder.push( serviceAccountId );
			}
		}

		console.log( '### ACCOUNTS BY ID ###' );
		console.log( accounts );

		return (
			<AccountsList
				accounts={ accounts }
				accountOrder={ localAccountOrder }
				onChangeOrder={ this.onChangeOrder }
				onReorderToggle={ this.onReorderToggle }
				onListRowPress={ this.onListRowPress }
				isReorderEnabled={ isReorderEnabled }
				enableReorder={ enableReorder }
			/>
		);
	}
}

export const mapStateToProps = ( state ) => {
	return {
		accountsById: getAccountsById( state ),
		accountOrder: getAccountOrder( state ),
		serviceAccountId: state.accounts.serviceAccountId,
	};
};

export const mapDispatchToProps = ( dispatch ) => {
	return {
		selectItem: ( id ) => dispatch( selectRecordAccount( id ) ),
		_updateAccountsOrder: ( newOrder ) => dispatch( updateAccountsOrder( newOrder ) ),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)( AccountsScreen );

