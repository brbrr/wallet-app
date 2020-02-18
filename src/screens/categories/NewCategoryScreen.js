/**
 * External dependencies
 */
import React from 'react';
import { Button } from 'react-native';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';

/**
 * Internal dependencies
 */
import { addNewCategory, updateCategory } from '../../actions/categories';
import { getCategoryById } from '../../selectors';
import NewCategory from '../../components/NewCategory';

export class NewCategoryScreen extends React.Component {
	static navigationOptions = ( { navigation } ) => {
		const isEdit = navigation.getParam( 'isEdit' );
		const saveAndGoBack = navigation.getParam( 'saveAndGoBack' );
		const rightButtonTitle = isEdit ? 'Save' : 'Add';
		const title = isEdit ? 'Edit Category' : 'New Category';

		return {
			title,
			headerRight: (
				<Button
					onPress={ saveAndGoBack }
					title={ rightButtonTitle }
				/>
			),
			headerLeft: (
				<Button
					onPress={ () => navigation.goBack( null ) }
					title="Back"
				/>
			) };
	};

	constructor( props ) {
		super( props );
		const isEdit = props.navigation.getParam( 'isEdit', false );
		const parentId = props.navigation.getParam( 'parentId', null );

		this.state = {
			name: null,
			colorCode: 'grey',
			iconName: 'shopping-cart',
			isEdit,
			parentId,
		};

		if ( isEdit ) {
			const categoryId = props.navigation.getParam( 'categoryId', null );
			const category = getCategoryById( props, categoryId );
			this.state = Object.assign( {}, this.state, category );
		}

		props.navigation.setParams(
			{ saveAndGoBack: this.saveAndGoBack }
		);
	}

	onStateChange = ( state ) => this.setState( state )

	getCategoryFromState() {
		const { name, colorCode, iconName, id, parentId, isEdit } = this.state;

		const category = {
			name,
			colorCode,
			iconName,
			parentId,
		};

		if ( isEdit ) {
			category.id = id;
		}

		return category;
	}

	saveAndGoBack = () => {
		const { navigation } = this.props;
		this.save();
		navigation.goBack( null );
	}

	save = () => {
		const { isEdit } = this.state;
		const { _addNewCategory, _updateCategory } = this.props;
		const category = this.getCategoryFromState();
		if ( isEdit ) {
			_updateCategory( category );
		} else {
			_addNewCategory( category );
		}
	}

	render() {
		const { name, colorCode, iconName } = this.state;
		const { navigation } = this.props;

		return (
			<ScrollView>
				<NewCategory
					navigate={ navigation.navigate }
					name={ name }
					colorCode={ colorCode }
					iconName={ iconName }
					onStateChange={ this.onStateChange }
				/>
			</ScrollView>
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
)( NewCategoryScreen );
