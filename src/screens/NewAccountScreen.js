/**
 * External dependencies
 */
import React from 'react';
import { Button } from 'react-native';
import { connect } from 'react-redux';
/**
 * Internal dependencies
 */
import { addNewAccount, updateAccount } from '../actions/accounts';
import { getCurrencyById } from '../selectors';
import AccountInfo from '../components/accounts/AccountInfo';
class NewAccountScreen extends React.Component {
	constructor( props ) {
		super( props );
		const isEdit = props.route.params?.isEdit;
		this.state = {
			isEdit,
			name: '',
			balance: 0,
			colorCode: 'blue',
			iconName: 'car',
			currencyId: 0,
		};

		this.currencyScreen = 'Currencies';
	}

	componentDidMount() {
		this.props.navigation.setOptions( {
			headerRight: () => (
				<Button
					onPress={ () => this.persistAccountAndNavigate() }
					title={ 'Add' }
				/>
			),
		} );
	}

	persistAccountAndNavigate = () => {
		this.persistAccount();
		this.props.navigation.navigate( 'AppTabsScreen' );
	}

	onStateChange = ( state ) => this.setState( state )

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

	renderAccountInfo() {
		const { name, balance, colorCode, iconName, currencyId } = this.state;
		const currency = getCurrencyById( this.props, currencyId );

		return (
			<AccountInfo
				name={ name }
				balance={ balance.toString() }
				colorCode={ colorCode }
				iconName={ iconName }
				currencyCode={ currency.code }
				navigate={ this.props.navigation.navigate }
				onStateChange={ this.onStateChange }
				currencyScreen={ this.currencyScreen }
			/>
		);
	}

	render() {
		return (
			<>
				{ this.renderAccountInfo() }
				{ this.props.postAccountInfo && this.props.postAccountInfo( this.persistAccountAndNavigate ) }
			</>
		);
	}
}

class SNewAccountsScreen extends NewAccountScreen {
	constructor( props ) {
		super( props );
		this.currencyScreen = 'SettingsCurrencies';
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
)( NewAccountScreen );

export const SettingsNewAccountsScreen = connect(
	mapStateToProps,
	mapDispatchToProps,
)( SNewAccountsScreen );
