/**
 * External dependencies
 */
import React from 'react';
import { Button, View } from 'react-native';
import { connect } from 'react-redux';
/**
 * Internal dependencies
 */
import { getCategoriesByParentId, getCategoryById } from '../../selectors';
import ItemsList, { Item } from '../../components/ItemsList';
import { addNewCategory, updateCategory } from '../../actions/categories';
import Card from '../../components/Card';
import { getIconConfiguration } from '../../components/helper';

class SubCategoriesScreen extends React.Component {
	static navigationOptions = ( { navigation } ) => {
		const category = navigation.getParam( 'category' );
		const onStateChange = navigation.getParam( 'onStateChange' );
		const title = category.name ? category.name : 'Category';

		return ( {
			title,
			headerRight: (
				<Button
					onPress={ () => navigation.navigate( 'EditSubCategoriesStack', { categoryId: category.id, category, onStateChange, navMode: 'modal' } ) }
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
	};

	selectItem = ( categoryId ) => {
		const { navigation } = this.props;
		const onStateChange = navigation.getParam( 'onStateChange' );

		onStateChange( { categoryId } );
		navigation.navigate( 'New' );
	}

	render() {
		const categoryId = this.props.navigation.getParam( 'categoryId' );
		const categories = getCategoriesByParentId( this.props, this.props );
		const parentCategory = getCategoryById( this.props, categoryId );

		const icon = getIconConfiguration( parentCategory, { size: 20 } );

		return (
			<View style={ { flex: 1, backgroundColor: '#f9f9f9' } }>
				<Card containerStyle={ { marginTop: 20 } } >
					<Item id={ parentCategory.id } title={ 'General - ' + parentCategory.name } icon={ icon } selectItem={ this.selectItem } />
				</Card>
				<Card title="SUBCATEGORIES" >
					<ItemsList items={ categories } selectItem={ this.selectItem } itemProps={ { chevron: true } } />
				</Card>
			</View>
		);
	}
}

const mapStateToProps = ( { categories } ) => ( { categories } );

const mapDispatchToProps = ( dispatch ) => ( {
	_addNewCategory: ( category ) => dispatch( addNewCategory( category ) ),
	_updateCategory: ( category ) => dispatch( updateCategory( category ) ),
} );

export default connect(
	mapStateToProps,
	mapDispatchToProps
)( SubCategoriesScreen );
