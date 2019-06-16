/**
 * External dependencies
 */
import React from 'react';
import { Button } from 'react-native';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import RecordOptionSelector from '../components/records/RecordOptionSelector';

class CurrenciesScreen extends React.Component {
	static navigationOptions = ( { navigation } ) => ( {
		title: 'Currencies',
		headerRight: (
			<Button
				onPress={ () => navigation.navigate( 'NewCurrency' ) }
				title="Add"
			/>
		),
		headerLeft: (
			<Button
				onPress={ () => navigation.goBack( null ) }
				title="Back"
			/>
		),
	} );

	render() {
		const { currencies, navigation } = this.props;
		const onStateChange = navigation.getParam( 'onStateChange' );

		return (
			<RecordOptionSelector
				items={ Object.values( currencies.byId ) }
				selectItem={ ( id ) => onStateChange( id, 'currencyId' ) }
				navigation={ navigation }
				nameValue="code"
			/>
		);
	}
}

const mapStateToProps = ( state ) => {
	const { currencies } = state;

	return {
		currencies,
	};
};

const mapDispatchToProps = () => ( {} );

export default connect(
	mapStateToProps,
	mapDispatchToProps
)( CurrenciesScreen );

