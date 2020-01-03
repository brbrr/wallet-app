/**
 * External dependencies
 */
import React from 'react';
import { Button } from 'react-native';
import { connect } from 'react-redux';
/**
 * Internal dependencies
 */
import { getParentCategories, getCategoryById } from '../selectors';
import ItemsList from '../components/ItemsList';

class CategoriesScreen extends React.Component {
	static navigationOptions = ( { navigation } ) => ( {
		title: 'Categories',
		headerRight: (
			<Button
				onPress={ () => navigation.navigate( 'EditCategories' ) }
				title="Edit"
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
		const category = getCategoryById( this.props, categoryId );

		navigation.navigate( 'SubCategories', { categoryId, category, onStateChange } );
	}

	render() {
		const parentCategories = getParentCategories( this.props );
		return <ItemsList items={ parentCategories } selectItem={ this.selectItem } />;
	}
}

const mapStateToProps = ( { categories } ) => ( { categories } );

const mapDispatchToProps = () => ( {} );

export default connect(
	mapStateToProps,
	mapDispatchToProps
)( CategoriesScreen );

class SCategoriesScreen extends CategoriesScreen {
	// selectItem = ( categoryId ) => {
	// 	this.props.navigation.navigate( 'NewCategory', { categoryId, isEdit: true } );
	// }
}

export const SettingsCategoriesScreen = connect(
	mapStateToProps,
	mapDispatchToProps
)( SCategoriesScreen );

class ECategoriesScreen extends CategoriesScreen {
	static navigationOptions = ( { navigation } ) => {
		const showSearch = navigation.getParam( 'showSearch' );
		const changeTitle = navigation.getParam( 'changeTitle' );
		return ( {
			title: showSearch ? 'New Title' : 'Alternate Title',
			headerRight: (
				<Button
					onPress={ changeTitle }
					title="changeTitle"
				/>
			),
			headerLeft: (
				<Button
					onPress={ () => navigation.goBack( null ) }
					title="Close"
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

	changeTitle = () => {
		const { showSearch } = this.state;
		const newValue = ! showSearch;
		this.setState( { showSearch: newValue } );
		// Assuming you have access to the navigation props
		this.props.navigation.setParams( {
			showSearch: newValue,
		} );
	}

	selectItem = ( categoryId ) => {
		const { navigation } = this.props;
		const onStateChange = navigation.getParam( 'onStateChange' );
		const category = getCategoryById( this.props, categoryId );

		navigation.navigate( 'EditSubCategories', { categoryId, category, onStateChange } );
	}
}

export const EditCategoriesScreen = connect(
	mapStateToProps,
	mapDispatchToProps
)( ECategoriesScreen );
