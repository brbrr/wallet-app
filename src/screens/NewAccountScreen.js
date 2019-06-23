/**
 * External dependencies
 */
import React from 'react';
import { Button } from 'react-native';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import { addNewAccount, updateAccount } from '../actions';
import AccountInfo from '../components/AccountInfo';
import { getCurrencyById, getAccountById } from '../selectors';

class NewAccountScreen extends React.Component {
	static navigationOptions = ( { navigation } ) => {
		const rightButtonTitle = navigation.state.params && navigation.state.params.isEdit ? 'Save' : 'Add';

		return {
			title: 'New Account',
			headerRight: (
				<Button
					onPress={ () => navigation.state.params.persistAccountAndGoBack() }
					title={ rightButtonTitle }
				/>
			),
			headerLeft: (
				<Button
					onPress={ () => navigation.goBack() }
					title="Back"
				/>
			),
		};
	};

	constructor( props ) {
		super( props );
		const isEdit = props.navigation.getParam( 'isEdit', false );
		this.state = {
			name: '',
			balance: '',
			colorCode: 'blue',
			iconName: 'car',
			currencyId: 1,
			isEdit,
		};

		if ( isEdit ) {
			const accountId = props.navigation.getParam( 'accountId', null );
			const account = getAccountById( props, accountId );
			this.state = Object.assign( {}, this.state, account );
		}

		this.props.navigation.setParams(
			{ persistAccountAndGoBack: this.persistAccountAndGoBack }
		);
	}

	onStateChange = ( state ) => this.setState( state )

	persistAccountAndGoBack = () => {
		const { name, balance, colorCode, iconName, currencyId, isEdit, id } = this.state;
		const { navigation, _addNewAccount, _updateAccount } = this.props;

		const account = {
			name,
			balance,
			colorCode,
			iconName,
			currencyId,
		};

		if ( ! isEdit ) {
			_addNewAccount( account );
		} else {
			account.id = id;
			_updateAccount( account );
		}

		navigation.goBack();
	}

	render() {
		console.log( '!!!!WWWWWW' );
		console.log( this.state, this.props );

		const { name, balance, colorCode, iconName, currencyId, isEdit } = this.state;
		const { navigation } = this.props;

		const currency = getCurrencyById( this.props, currencyId );

		return (
			<AccountInfo
				name={ name }
				balance={ balance }
				colorCode={ colorCode }
				iconName={ iconName }
				currencyCode={ currency.code }
				navigate={ navigation.navigate }
				onStateChange={ this.onStateChange }
				isEditMode={ isEdit }
			/>
		);
	}
}

const mapStateToProps = ( state ) => {
	const { currencies, accounts } = state;
	return {
		currencies,
		accounts,
	};
};

const mapDispatchToProps = ( dispatch ) => {
	return {
		_addNewAccount: ( account ) => dispatch( addNewAccount( account ) ),
		_updateAccount: ( account ) => dispatch( updateAccount( account ) ),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)( NewAccountScreen );
