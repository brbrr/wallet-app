/**
 * External dependencies
 */
import React from 'react';
import { View, Button, Text } from 'react-native';
import { connect } from 'react-redux';
import { Input, Card, ListItem } from 'react-native-elements';

/**
 * Internal dependencies
 */
import { selectRecordCategory } from '../actions/categories';

class CategoriesScreen extends React.Component {
	static navigationOptions = ( { navigation } ) => ( {
		title: 'Categories',
		headerRight: (
			<Button
				onPress={ () => {} }
				title="Add"
			/>
		),
		headerLeft: (
			<Button
				onPress={ () => navigation.goBack() }
				title="Back"
			/>
		),
	} );

	selectCategoryAndGoBack( id ) {
		const { _selectCategory, navigation } = this.props;
		_selectCategory( id );
		navigation.goBack();
	}

	render() {
		const categories = Object.values( this.props.categories.byId );

		if ( categories.length === 0 ) {
			return (
				<Text>{ 'No categories yet.' }</Text>
			);
		}

		return (
			<View>
				{
					categories.map( ( category, idx ) => (
						<ListItem
							containerStyle={ { paddingTop: 3, paddingBottom: 3 } }
							key={ idx }
							title={ category.name }
							leftIcon={ {
								name: category.icon,
								type: 'font-awesome',
								reverse: true,
								reverseColor: 'white',
								color: 'red',
								size: 20,
							} }
							bottomDivider={ true }
							onPress={ () => this.selectCategoryAndGoBack( category.id ) }
						/>
					) )
				}
			</View>
		);
	}
}

const mapStateToProps = ( state ) => {
	console.log( state );
	const { categories } = state;

	return {
		categories,
	};
};

const mapDispatchToProps = ( dispatch ) => {
	return {
		_selectCategory: ( id ) => dispatch( selectRecordCategory( id ) ),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)( CategoriesScreen );

