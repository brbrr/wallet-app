/**
 * External dependencies
 */
import React from 'react';
import { Button } from 'react-native';
import { connect } from 'react-redux';
/**
 * Internal dependencies
 */
import { getCategoryById } from '../../selectors';
import CategoriesScreen from './CategoriesScreen';

const mapStateToProps = ( { categories } ) => ( { categories } );

const mapDispatchToProps = () => ( {} );

class ECategoriesScreen extends CategoriesScreen {
	static navigationOptions = ( { navigation } ) => {
		const navMode = navigation.getParam( 'navMode' );
		const backButtonName = navMode === 'modal' ? 'Close' : 'Back';

		return ( {
			title: 'Edit Categories',
			headerRight: (
				<Button
					onPress={ () => navigation.navigate( 'NewCategory', { parentId: null } ) }
					title="Add"
				/>
			),
			headerLeft: (
				<Button
					onPress={ () => navigation.goBack( null ) }
					title={ backButtonName }
				/>
			),
		} );
	};

	constructor( props ) {
		super( props );
		this.state = { showSearch: false };
		this.props.navigation.setParams(
			{ changeTitle: this.changeTitle, showSearch: this.state.showSearch }
		);
	}

	selectItem = ( categoryId ) => {
		const { navigation } = this.props;
		const onStateChange = navigation.getParam( 'onStateChange' );
		const category = getCategoryById( this.props, categoryId );

		navigation.navigate( 'EditSubCategories', { categoryId, category, onStateChange } );
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)( ECategoriesScreen );
