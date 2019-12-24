/**
 * External dependencies
 */
import React from 'react';
import { Text, ScrollView, Button } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
/**
 * Internal dependencies
 */
import { getIconConfiguration } from '../components/helper';
import { getParentCategories } from '../selectors';

/**
 * Internal dependencies
 */
// import OptionSelector from '../components/OptionSelector';

class CategoriesScreen extends React.Component {
	static navigationOptions = ( { navigation } ) => ( {
		title: 'Categories',
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
		navigation.navigate( 'SubCategories', { categoryId } );

		// const onStateChange = navigation.getParam( 'onStateChange' );

		// onStateChange( { categoryId } );
		// navigation.goBack( null );
	}

	render() {
		const { categories, navigation } = this.props;

		// return (
		// 	<OptionSelector
		// 		items={ Object.values( categories.byId ) }
		// 		selectItem={ ( categoryId ) => this.selectItem( categoryId ) }
		// 		navigation={ navigation }
		// 	/>
		// );

		// const { items, nameValue, selectItem } = this.props;

		const parentCategories = getParentCategories( this.props );

		const nameValue = 'name';

		return (
			<ScrollView style={ { backgroundColor: '#f9f9f9', flex: 1 } }>
				{
					parentCategories.map( ( item, idx ) => {
						return (
							<ListItem
								containerStyle={ { paddingTop: 3, paddingBottom: 3, height: 55, marginTop: idx === 0 ? 20 : 0 } }
								key={ idx }
								title={ item[ nameValue ] }
								bottomDivider={ true }
								topDivider={ true }
								leftIcon={ getIconConfiguration( item, { size: 20 } ) }
								onPress={ () => this.selectItem( item.id ) }
							/>
						);
					} )
				}
			</ScrollView>
		);
	}
}

const mapStateToProps = ( { categories } ) => ( { categories } );

const mapDispatchToProps = () => ( {} );

export default connect(
	mapStateToProps,
	mapDispatchToProps
)( CategoriesScreen );

class SCategoriesScreen extends CategoriesScreen {
	selectItem = ( categoryId ) => {
		this.props.navigation.navigate( 'NewCategory', { categoryId, isEdit: true } );
	}
}

export const SettingsCategoriesScreen = connect(
	mapStateToProps,
	mapDispatchToProps
)( SCategoriesScreen );

