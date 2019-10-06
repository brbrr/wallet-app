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

	selectItem = ( categoryId ) => {
		const { navigation } = this.props;
		const onStateChange = navigation.getParam( 'onStateChange' );

		onStateChange( { categoryId } );
		navigation.goBack( null );
	}

	render() {
		const { categories, navigation } = this.props;

		return (
			<RecordOptionSelector
				items={ Object.values( categories.byId ) }
				selectItem={ ( categoryId ) => this.selectItem( categoryId ) }
				navigation={ navigation }
			/>
		);
	}
}

const mapStateToProps = ( { categories } ) => ( { categories } );

const mapDispatchToProps = () => ( {} );

export default connect(
	mapStateToProps,
	mapDispatchToProps
)( CategoriesScreen );

class SCategoriesScreen extends CategoriesScreen {
	selectItem = ( categoryId ) => {
		this.props.navigation.navigate( 'NewCategory', { categoryId, isEdit: true } );
	}
}

export const SettingsCategoriesScreen = connect(
	mapStateToProps,
	mapDispatchToProps
)( SCategoriesScreen );

