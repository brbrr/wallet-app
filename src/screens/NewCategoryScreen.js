/**
 * External dependencies
 */
import React from 'react';
import { Button, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { ListItem, Input } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';

/**
 * Internal dependencies
 */
import { addNewCategory, updateCategory } from '../actions/categories';
import { getCategoryById } from '../selectors';

export class NewCategoryScreen extends React.Component {
	static navigationOptions = ( { navigation } ) => {
		const rightButtonTitle = navigation.state.params && navigation.state.params.isEdit ? 'Save' : 'Add';
		const title = navigation.state.params && navigation.state.params.isEdit ? 'Edit Category' : 'New Category';

		return {
			title,
			headerRight: (
				<Button
					onPress={ () => navigation.state.params.createNewCategoryAndGoBack() }
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

		this.state = {
			name: null,
			colorCode: 'grey',
			iconName: 'shopping-cart',
			isEdit,
		};
		if ( isEdit ) {
			const categoryId = props.navigation.getParam( 'categoryId', null );
			const category = getCategoryById( props, categoryId );
			this.state = Object.assign( {}, this.state, category );
		}

		this.props.navigation.setParams(
			{ createNewCategoryAndGoBack: this.createNewCategoryAndGoBack }
		);
	}

	onStateChange = ( state ) => this.setState( state )

	createNewCategoryAndGoBack = () => {
		const { name, colorCode, iconName, id, isEdit } = this.state;
		const { navigation, _addNewCategory, _updateCategory } = this.props;

		if ( isEdit ) {
			_updateCategory( { name, colorCode, iconName, id } );
		} else {
			_addNewCategory( { name, colorCode, iconName } );
		}
		navigation.goBack( null );
	}

	render() {
		const { name, colorCode, iconName } = this.state;
		const { navigation } = this.props;

		return (
			<ScrollView style={ styles.container }>
				<ListItem
					title="Name"
					rightTitle={ <Input
						inputContainerStyle={ { borderBottomWidth: 0 } }
						inputStyle={ styles.amountInput }
						value={ name }
						placeholder="Category name"
						onChangeText={ ( n ) => this.setState( { name: n } ) }
						autoFocus
					/> }
					containerStyle={ styles.iconContainer }
					rightContentContainerStyle={ styles.wideContainer }
					bottomDivider={ true }
					topDivider={ true }
				/>

				<ListItem
					title={ 'Color' }
					leftIcon={ {
						name: 'circle',
						type: 'font-awesome',
						color: colorCode ? colorCode : 'blue',
						size: 42,
						containerStyle: { margin: -2 },
					} }
					rightTitle={ 'Select' }
					onPress={ () => navigation.navigate( 'ColorSelector', { onStateChange: this.onStateChange } ) }
					containerStyle={ styles.rowContainer }
					contentContainerStyle={ styles.wideContainer }
					rightTitleStyle={ styles.smallText }
					bottomDivider={ true }
					topDivider={ true }
					chevron
				/>

				<ListItem
					title={ 'Icon ' + iconName }
					leftIcon={ {
						name: iconName,
						type: 'font-awesome',
						color: 'black',
						size: 42,
						containerStyle: { margin: -2 },
					} }
					rightTitle={ 'Select' }
					onPress={ () => navigation.navigate( 'IconSelector', { onStateChange: this.onStateChange } ) }
					containerStyle={ styles.rowContainer }
					contentContainerStyle={ styles.wideContainer }
					rightTitleStyle={ styles.smallText }
					bottomDivider={ true }
					topDivider={ true }
					chevron
				/>
			</ScrollView>
		);
	}
}

const mapStateToProps = ( { categories } ) => ( { categories } );

const mapDispatchToProps = ( dispatch ) => {
	return {
		_addNewCategory: ( category ) => dispatch( addNewCategory( category ) ),
		_updateCategory: ( category ) => dispatch( updateCategory( category ) ),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)( NewCategoryScreen );

const styles = StyleSheet.create( {
	container: { backgroundColor: '#f9f9f9', flex: 1 },
	iconContainer: {
		marginTop: 20,
		marginBottom: 20,
		height: 55,
		flexDirection: 'row',
	},
	wideContainer: { flex: 2 },
	rowContainer: { paddingTop: 3, paddingBottom: 3, height: 55 },
	amountInput: { color: 'black', textAlign: 'right' },
	smallText: { fontSize: 14 },
} );
