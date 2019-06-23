/**
 * External dependencies
 */
import React, { Component } from 'react';
import { Button } from 'react-native';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';
/**
 * Internal dependencies
 */
import { selectRecordAccount, updateAccountsOrder } from '../actions';
import { getAccountsById, getAccountOrder } from '../selectors';
import AccountsList from '../components/AccountsList';

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
					onPress={ headersConfig.rightOnPress }
					title={ headersConfig.rightTitle }
				/>
			),
			headerLeft: (
				<Button
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
			updateAccountsOrder: this.props._updateAccountsOrder.bind( this ),
			localAccountOrder: props.accountOrder,
		} );
	}

	componentDidUpdate( prevProps, prevState ) {
		Object.entries( this.props ).forEach( ( [ key, val ] ) =>
			prevProps[ key ] !== val && console.log( `Prop '${ key }' changed` )
		);
		Object.entries( this.state ).forEach( ( [ key, val ] ) =>
			prevState[ key ] !== val && console.log( `State '${ key }' changed` )
		);
	}

	componentWillReceiveProps( nextProps ) {
		if ( ! isEqual( this.state.localAccountOrder, nextProps.accountOrder ) ) {
			this.setState( { localAccountOrder: nextProps.accountOrder } );
		}
	}

	onReorderToggle = () => this.props.navigation.setParams( { isReorderEnabled: true } )

	onChangeOrder = ( key, newAccountOrder ) => {
		this.setState( { localAccountOrder: newAccountOrder } );
		this.props.navigation.setParams( { localAccountOrder: newAccountOrder } ); // We need this to update order in redux state within screen header
	}

	onListRowPress = ( accountId ) => {
		const { navigation } = this.props;
		const onStateChange = navigation.getParam( 'onStateChange' );

		onStateChange( { accountId } );
		navigation.goBack( null );
	}

	render() {
		const { accountsById, navigation } = this.props;
		const { localAccountOrder } = this.state;
		const isReorderEnabled = navigation.getParam( 'isReorderEnabled', false );

		return (
			<AccountsList
				accounts={ accountsById }
				accountOrder={ localAccountOrder }
				onChangeOrder={ this.onChangeOrder }
				onReorderToggle={ this.onReorderToggle }
				onListRowPress={ this.onListRowPress }
				isReorderEnabled={ isReorderEnabled }
			/>
		);
	}
}

const mapStateToProps = ( state ) => {
	return {
		accountsById: getAccountsById( state ),
		accountOrder: getAccountOrder( state ),
	};
};

const mapDispatchToProps = ( dispatch ) => {
	return {
		selectItem: ( id ) => dispatch( selectRecordAccount( id ) ),
		_updateAccountsOrder: ( newOrder ) => dispatch( updateAccountsOrder( newOrder ) ),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)( AccountsScreen );

class SAccountsScreen extends AccountsScreen {
	onListRowPress = ( accountId ) => {
		console.log( 'QWEQWEQW', accountId );
		const { navigation } = this.props;
		navigation.navigate( 'NewAccount', { accountId, isEdit: true } );
	}
}

export const SettingsAccountsScreen = connect(
	mapStateToProps,
	mapDispatchToProps
)( SAccountsScreen );

