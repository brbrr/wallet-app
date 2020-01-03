/**
 * External dependencies
 */
import React from 'react';
import { Button, View, Text } from 'react-native';
import { connect } from 'react-redux';
/**
 * Internal dependencies
 */
import { getCategoriesByParentId } from '../selectors';
import ItemsList from '../components/ItemsList';
import NewCategory from '../components/NewCategory';

class SubCategoriesScreen extends React.Component {
	static navigationOptions = ( { navigation } ) => {
		const parentId = navigation.getParam( 'categoryId' );
		const category = navigation.getParam( 'category' );
		return ( {
			title: category.name ? category.name : 'Category',
			// headerRight: (
			// 	<Button
			// 		onPress={ () => navigation.navigate( 'NewCategory', { parentId } ) }
			// 		title="Add"
			// 	/>
			// ),
			headerLeft: (
				<Button
					onPress={ () => navigation.goBack( null ) }
					title="Back"
				/>
			),
		} );
	};

	selectItem = ( categoryId ) => {
		const { navigation } = this.props;
		const onStateChange = navigation.getParam( 'onStateChange' );

		onStateChange( { categoryId } );
		navigation.navigate( 'New' );
	}

	render() {
		const categoryId = this.props.navigation.getParam( 'categoryId' );
		const categories = getCategoriesByParentId( this.props, categoryId );

		return <ItemsList items={ categories } selectItem={ this.selectItem } />;
	}
}

const mapStateToProps = ( { categories } ) => ( { categories } );

const mapDispatchToProps = () => ( {} );

export default connect(
	mapStateToProps,
	mapDispatchToProps
)( SubCategoriesScreen );

class ESubCategoriesScreen extends SubCategoriesScreen {
	static navigationOptions = ( { navigation } ) => {
		const parentId = navigation.getParam( 'categoryId' );
		const category = navigation.getParam( 'category' );
		return ( {
			title: category.name ? 'Edit ' + category.name : 'Edit Category',
			headerRight: (
				<Button
					onPress={ () => navigation.navigate( 'NewCategory', { parentId } ) }
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
	};

	selectItem = ( categoryId ) => {
		const { navigation } = this.props;
		const parentId = navigation.getParam( 'categoryId' );
		const onStateChange = navigation.getParam( 'onStateChange' );

		navigation.navigate( 'NewCategory', { categoryId, parentId, onStateChange, isEdit: true } );
	}

	render() {
		const { navigation } = this.props;
		const categoryId = navigation.getParam( 'categoryId' );
		const category = navigation.getParam( 'category' );
		const categories = getCategoriesByParentId( this.props, categoryId );

		return (
			<View style={ { flex: 1 } }>
				<NewCategory
					navigate={ navigation.navigate }
					name={ category.name }
					colorCode={ category.colorCode }
					iconName={ category.iconName }
					onStateChange={ this.onStateChange }
				/>
				<View>
					<Text>Subcategories</Text>
				</View>
				<ItemsList items={ categories } selectItem={ this.selectItem } />
			</View>

		);
	}
}

export const EditSubCategoriesScreen = connect(
	mapStateToProps,
	mapDispatchToProps
)( ESubCategoriesScreen );
