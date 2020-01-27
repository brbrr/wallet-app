/**
 * External dependencies
 */
import React from 'react';
import { Button, View } from 'react-native';
import { connect } from 'react-redux';
/**
 * Internal dependencies
 */
import { getParentCategories, getCategoryById } from '../../selectors';
import ItemsList from '../../components/ItemsList';
import Card from '../../components/Card';

const mapStateToProps = ( { categories } ) => ( { categories } );

const mapDispatchToProps = () => ( {} );

class EditCategoriesScreen extends React.Component {
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

	render() {
		const parentCategories = getParentCategories( this.props );

		return (
			<View style={ { flex: 1, backgroundColor: '#f9f9f9' } }>
				<Card title="ALL CATEGORIES" containerStyle={ { marginTop: 20 } }>
					<ItemsList items={ parentCategories } selectItem={ this.selectItem } itemProps={ { chevron: true } } />
				</Card>
			</View>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)( EditCategoriesScreen );
