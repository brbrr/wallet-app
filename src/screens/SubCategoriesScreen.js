/**
 * External dependencies
 */
import React from 'react';
import { Text, ScrollView, Button, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
/**
 * Internal dependencies
 */
import { getIconConfiguration } from '../components/helper';
import { getParentCategories, getCategoriesByParentId } from '../selectors';

/**
 * Internal dependencies
 */
// import OptionSelector from '../components/OptionSelector';

class SubCategoriesScreen extends React.Component {
	static navigationOptions = ( { navigation } ) => ( {
		title: 'Sub Categories',
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
		// navigation.navigate( 'SubCategories', { categoryId } );
		console.log( 'SELECTED ', categoryId );

		// const onStateChange = navigation.getParam( 'onStateChange' );

		// onStateChange( { categoryId } );
		// navigation.goBack( null );
	}

	renderItem = ( item ) => {
		return (
			<ListItem
				containerStyle={ { paddingTop: 3, paddingBottom: 3, height: 55, marginTop: item.id === 0 ? 20 : 0 } }
				title={ item.name }
				bottomDivider={ true }
				topDivider={ true }
				leftIcon={ getIconConfiguration( item, { size: 20 } ) }
				onPress={ () => this.selectItem( item.id ) }
			/>
		);
	}

	keyExtractor = ( item, index ) => item.id.toString()

	render() {
		const { categories, navigation } = this.props;

		const categoryId = navigation.getParam( 'categoryId' );

		const parentCategories = getCategoriesByParentId( this.props, categoryId );

		console.log( this.props, categoryId, parentCategories );

		const nameValue = 'name';

		return (
			<FlatList
				keyExtractor={ this.keyExtractor }
				data={ parentCategories }
				renderItem={ this.renderItem }
			/>
			// <ScrollView style={ { backgroundColor: '#f9f9f9', flex: 1 } }>
			// 	{
			// 		parentCategories.map( ( item, idx ) => {
			// 			return (
			// 				<ListItem
			// 					containerStyle={ { paddingTop: 3, paddingBottom: 3, height: 55, marginTop: idx === 0 ? 20 : 0 } }
			// 					key={ idx }
			// 					title={ item[ nameValue ] }
			// 					bottomDivider={ true }
			// 					topDivider={ true }
			// 					leftIcon={ getIconConfiguration( item, { size: 20 } ) }
			// 					onPress={ () => this.selectItem( item.id ) }
			// 				/>
			// 			);
			// 		} )
			// 	}
			// </ScrollView>
		);
	}
}

const mapStateToProps = ( { categories } ) => ( { categories } );

const mapDispatchToProps = () => ( {} );

export default connect(
	mapStateToProps,
	mapDispatchToProps
)( SubCategoriesScreen );
