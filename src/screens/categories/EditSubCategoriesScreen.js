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
import ItemsList from '../../components/ItemsList';
import NewCategory from '../../components/NewCategory';
import Card from '../../components/Card';
import { addNewCategory, updateCategory } from '../../actions/categories';

class EditSubCategoriesScreen extends React.Component {
	static navigationOptions = ( { navigation } ) => {
		const parentId = navigation.getParam( 'categoryId' );
		const category = navigation.getParam( 'category' );
		const navMode = navigation.getParam( 'navMode' );
		const backButtonName = navMode === 'modal' ? 'Close' : 'Back';
		return ( {
			title: category.name ? 'Edit ' + category.name : 'Edit Category',
			headerRight: ( <Button onPress={ () => navigation.navigate( 'NewCategory', { parentId } ) } title="Add" /> ),
			headerLeft: ( <Button onPress={ () => navigation.goBack( null ) } title={ backButtonName } /> ),
		} );
	};
	selectItem = ( categoryId ) => {
		const { navigation } = this.props;
		const parentId = navigation.getParam( 'categoryId' );
		// const onStateChange = navigation.getParam( 'onStateChange' );
		// navigation.navigate( 'NewCategory', { categoryId, parentId, onStateChange, isEdit: true } );
		navigation.navigate( 'NewCategory', { categoryId, parentId, isEdit: true } );
	};
	// TODO: Same methods as in NewCategoryScreen.
	// We need these to be able to trigger save from within screen header as well via button on the screen
	constructor( props ) {
		super( props );
		const isEdit = props.navigation.getParam( 'isEdit', false );
		const parentId = props.navigation.getParam( 'parentId', null );
		const categoryId = props.navigation.getParam( 'categoryId', null );
		const category = getCategoryById( props, categoryId );
		this.state = {
			name: null,
			colorCode: 'grey',
			iconName: 'shopping-cart',
			isEdit,
			parentId,
		};
		this.state = Object.assign( {}, this.state, category );
	}
	onStateChange = ( state ) => this.setState( state );

	getCategoryFromState() {
		const { name, colorCode, iconName, id, parentId } = this.state;
		const category = {
			name,
			colorCode,
			iconName,
			parentId,
			id,
		};
		return category;
	}
	save = () => {
		const { _updateCategory } = this.props;
		const category = this.getCategoryFromState();
		_updateCategory( category );
	};

	render() {
		const { navigation } = this.props;
		// const categoryId = navigation.getParam( 'categoryId' );
		const { name, colorCode, iconName } = this.state;
		const categories = getCategoriesByParentId( this.props, this.props );
		return ( <View style={ { flex: 1, backgroundColor: '#f9f9f9' } }>
			<Card containerStyle={ { marginTop: 20 } }>
				<NewCategory navigate={ navigation.navigate } name={ name } colorCode={ colorCode } iconName={ iconName } onStateChange={ this.onStateChange } />
				<Button onPress={ this.save } title="Save" />
			</Card>
			<Card title="SUBCATEGORIES">
				<ItemsList items={ categories } selectItem={ this.selectItem } />
			</Card>
		</View> );
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
)( EditSubCategoriesScreen );
