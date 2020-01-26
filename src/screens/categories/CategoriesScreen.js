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

class CategoriesScreen extends React.Component {
	static navigationOptions = ( { navigation } ) => ( {
		title: 'Categories',
		headerRight: (
			<Button
				onPress={ () => navigation.navigate( 'EditCategories', { navMode: 'modal' } ) }
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

		return (
			<View style={ { flex: 1, backgroundColor: '#f9f9f9' } }>
				<Card title="ALL CATEGORIES" containerStyle={ { marginTop: 20 } }>
					<ItemsList items={ parentCategories } selectItem={ this.selectItem } />
				</Card>
			</View>
		);
	}
}

const mapStateToProps = ( { categories } ) => ( { categories } );

const mapDispatchToProps = () => ( {} );

export default connect(
	mapStateToProps,
	mapDispatchToProps
)( CategoriesScreen );
