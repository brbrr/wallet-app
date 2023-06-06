/**
 * External dependencies
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import { addNewAccount, updateAccount } from '../../actions/accounts';
import AccountInfo from './AccountInfo';
import { getCurrencyById, getAccountById } from '../../selectors';

class NewAccount extends Component {
	constructor( props ) {
		super( props );
		this.state = {
			name: '',
			balance: 0,
			colorCode: 'blue',
			iconName: 'car',
			currencyId: 0,
		};

		if ( props.isEdit ) {
			const accountId = props.accountId;
			const account = getAccountById( props, accountId );
			this.state = Object.assign( {}, this.state, account );
		}
	}

	onStateChange = ( state ) => this.setState( state )

	doNavigate = ( screen ) => this.props.navigate( screen, { onStateChange: this.onStateChange } )

	onPressCurrency = () => {
		if ( ! this.props.isEdit ) {
			this.doNavigate( this.props.currencyScreen );
		}
	}

	persistAccount = () => {
		const { name, balance, colorCode, iconName, currencyId, id } = this.state;
		const { _addNewAccount, _updateAccount, isEdit } = this.props;

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
	}

	render() {
		const { name, balance, colorCode, iconName, currencyId } = this.state;
		const currency = getCurrencyById( this.props, currencyId );

		return (
			<AccountInfo
				name={ name }
				balance={ balance.toString() }
				colorCode={ colorCode }
				iconName={ iconName }
				currencyCode={ currency.code }
				navigate={ this.doNavigate }
				onStateChange={ this.onStateChange }
				onPressCurrency={ this.onPressCurrency }
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
	mapDispatchToProps,
	null,
	{ forwardRef: true }
)( NewAccount );

