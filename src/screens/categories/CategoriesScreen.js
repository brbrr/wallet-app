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
import LatestCategories from '../../components/categories/LatestCategories';

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
		// TODO: replace/rename it with specific actions such as "selectCategory"
		const onStateChange = navigation.getParam( 'onStateChange' );
		const category = getCategoryById( this.props, categoryId );

		navigation.navigate( 'SubCategories', { categoryId, category, onStateChange } );
	}

	selectCategory = ( categoryId ) => {
		const { navigation } = this.props;
		const onStateChange = navigation.getParam( 'onStateChange' );

		onStateChange( { categoryId } );
		navigation.navigate( 'New' );
	};

	render() {
		const parentCategories = getParentCategories( this.props );

		return (
			<View style={ { backgroundColor: '#f9f9f9' } }>
				<LatestCategories
					selectItem={ this.selectCategory }
					categories={ this.props.categories }
					records={ this.props.records }
				/>
				<Card title="ALL CATEGORIES" containerStyle={ { marginTop: 20 } }>
					<ItemsList
						style={ {
							borderTopWidth: 0.5,
							borderBottomWidth: 0.5,
							borderColor: 'rgba(0, 0, 0, 0.12)' } }
						items={ parentCategories }
						selectItem={ this.selectItem }
						itemProps={ { chevron: true } }
					/>
				</Card>
			</View>
		);
	}
}

const mapStateToProps = ( { categories, records } ) => ( { categories, records } );

const mapDispatchToProps = () => ( {} );

export default connect(
	mapStateToProps,
	mapDispatchToProps
)( CategoriesScreen );
