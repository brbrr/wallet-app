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
	render() {

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

