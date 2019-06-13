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

	constructor( props ) {
		super( props );
		const isEdit = props.navigation.getParam( 'isEdit', null );

		this.state = { isEdit };
	}

	onPress = ( id ) => {
		const { selectItem, navigation } = this.props;

		if ( this.state.isEdit ) {
			// TODO: Maybe navigate to Account edit screen
			return;
		}

		selectItem( id );
		navigation.goBack( null );
	}

	render() {
		const { accounts, navigation, selectItem } = this.props;
		const isEdit = navigation.getParam( 'isEdit', null );

		return (
			<RecordOptionSelector
				items={ Object.values( accounts.byId ) }
				selectItem={ selectItem }
				navigation={ navigation }
				isEdit={ isEdit }
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

