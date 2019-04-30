/**
 * External dependencies
 */
import React from 'react';
import { Button } from 'react-native';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import { selectRecordCategory } from '../actions';
import RecordOptionSelector from '../components/RecordOptionSelector';

class CategoriesScreen extends React.Component {
	static navigationOptions = ( { navigation } ) => ( {
		title: 'Categories',
		headerRight: (
			<Button
				onPress={ () => navigation.navigate( 'NewCategory' ) }
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
		const { categories, selectItem, navigation } = this.props;

		return (
			<RecordOptionSelector
				items={ Object.values( categories.byId ) }
				selectItem={ selectItem }
				navigation={ navigation }
			/>
		);
	}
}

const mapStateToProps = ( state ) => {
	const { categories } = state;

	return {
		categories,
	};
};

const mapDispatchToProps = ( dispatch ) => {
	return {
		selectItem: ( id ) => dispatch( selectRecordCategory( id ) ),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)( CategoriesScreen );

