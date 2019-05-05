/**
 * External dependencies
 */
import React from 'react';
import { Button } from 'react-native';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import { selectRecordAccount } from '../actions';
import RecordOptionSelector from '../components/records/RecordOptionSelector';

class AccountsScreen extends React.Component {
	static navigationOptions = ( { navigation } ) => ( {
		title: 'Accounts',
		headerRight: (
			<Button
				onPress={ () => navigation.navigate( 'NewAccount' ) }
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
		const { accounts, selectItem, navigation } = this.props;

		return (
			<RecordOptionSelector
				items={ Object.values( accounts.byId ) }
				selectItem={ selectItem }
				navigation={ navigation }
			/>
		);
	}
}

const mapStateToProps = ( state ) => {
	const { accounts } = state;

	return {
		accounts,
	};
};

const mapDispatchToProps = ( dispatch ) => {
	return {
		selectItem: ( id ) => dispatch( selectRecordAccount( id ) ),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)( AccountsScreen );

