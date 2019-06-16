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
		const { categories, navigation } = this.props;
		const onStateChange = navigation.getParam( 'onStateChange' );

		return (
			<RecordOptionSelector
				items={ Object.values( categories.byId ) }
				selectItem={ ( id ) => onStateChange( id, 'categoryId' ) }
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

const mapDispatchToProps = () => ( {} );

export default connect(
	mapStateToProps,
	mapDispatchToProps
)( CategoriesScreen );

