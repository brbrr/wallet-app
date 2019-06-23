/**
 * External dependencies
 */
import React from 'react';
import { Button } from 'react-native';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import { addNewAccount } from '../actions';
import AccountInfo from '../components/AccountInfo';
import { getCurrencyById } from '../selectors';

class NewAccountScreen extends React.Component {
	static navigationOptions = ( { navigation } ) => ( {
		title: 'New Account',
		headerRight: (
			<Button
				onPress={ () => navigation.state.params.createNewAccountAndGoBack() }
				title="Add"
			/>
		),
		headerLeft: (
			<Button
				onPress={ () => navigation.goBack() }
				title="Back"
			/>
		),
	} );

	constructor( props ) {
		super( props );
		this.state = {
			name: null,
			balance: 0.0,
			colorCode: 'blue',
			iconName: 'car',
			currencyId: 1,
		};

		this.props.navigation.setParams(
			{ createNewAccountAndGoBack: this.createNewAccountAndGoBack }
		);
	}

	onStateChange = ( state ) => this.setState( state )

	createNewAccountAndGoBack = () => {
		const { name, balance, colorCode, iconName, currencyId } = this.state;
		const { navigation, _addNewAccount } = this.props;

		_addNewAccount( { name, colorCode, iconName, currencyId, balance } );
		navigation.goBack();
	}

	render() {
		const { name, balance, colorCode, iconName, currencyId } = this.state;
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
				onStateChange={ this.onStateChange } />
		);
	}
}

const mapStateToProps = ( state ) => {
	const { currencies } = state;
	return {
		currencies,
	};
};

const mapDispatchToProps = ( dispatch ) => {
	return {
		_addNewAccount: ( account ) => dispatch( addNewAccount( account ) ),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)( NewAccountScreen );
