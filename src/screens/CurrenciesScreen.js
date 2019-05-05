/**
 * External dependencies
 */
import React from 'react';
import { Button } from 'react-native';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import { selectRecordCurrency } from '../actions';
import RecordOptionSelector from '../components/records/RecordOptionSelector';

class CurrenciesScreen extends React.Component {
	static navigationOptions = ( { navigation } ) => ( {
		title: 'Currencies',
		headerRight: (
			<Button
				onPress={ () => {} }
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

	render() {
		const { currencies, selectItem, navigation } = this.props;

		return (
			<RecordOptionSelector
				items={ Object.values( currencies.byId ) }
				selectItem={ selectItem }
				navigation={ navigation }
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

const mapDispatchToProps = ( dispatch ) => {
	return {
		selectItem: ( id ) => dispatch( selectRecordCurrency( id ) ),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)( CurrenciesScreen );

