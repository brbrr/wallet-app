/**
 * External dependencies
 */
import React from 'react';
import { StyleSheet, Platform, Text, View, Button } from 'react-native';
import { connect } from 'react-redux';
/**
 * Internal dependencies
 */
import { addNewAccount, updateAccount } from '../../actions/accounts';
/**
 * Internal dependencies
 */
import AccountInfo from '../../components/accounts/AccountInfo';
import { getCurrencyById } from '../../selectors';

export class AddAccountScreen extends React.Component {
	constructor( props ) {
		super( props );
		this.state = {
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

	persistAccountAndNavigate() {
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

	render() {
		const { name, balance, colorCode, iconName, currencyId } = this.state;
		const currency = getCurrencyById( this.props, currencyId );

		return (
			<View style={ styles.container }>
				<Text>O, Hi!</Text>
				<Text>Welcome to this new fancy app!</Text>

				<AccountInfo
					name={ name }
					balance={ balance.toString() }
					colorCode={ colorCode }
					iconName={ iconName }
					currencyCode={ currency.code }
					navigate={ this.props.navigation.navigate }
					onStateChange={ this.onStateChange }
					currencyScreen={ this.state.currencyScreen }
				/>

				<Button title="Solid Button" onPress={ () => this.persistAccountAndNavigate() } />
			</View>
		);
	}
}

const styles = StyleSheet.create( {
	container: {
		flex: 1,
		backgroundColor: '#eee',

		...Platform.select( {
			ios: {
				paddingTop: 20,
			},
		} ),
	},
} );

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
)( AddAccountScreen );
