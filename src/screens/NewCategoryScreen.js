/**
 * External dependencies
 */
import React from 'react';
import { Button, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { ListItem, Input } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';

/**
 * Internal dependencies
 */
import { addNewCategory } from '../actions/categories';

export class NewCategoryScreen extends React.Component {
	static navigationOptions = ( { navigation } ) => ( {
		title: 'New Category',
		headerRight: (
			<Button
				onPress={ () => navigation.state.params.createNewCategoryAndGoBack() }
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

	constructor( props ) {
		super( props );
		this.state = {
			name: null,
		};
		this.props.navigation.setParams(
			{ createNewCategoryAndGoBack: this.createNewCategoryAndGoBack.bind( this ) }
		);
	}

	createNewCategoryAndGoBack() {
		const { name } = this.state;
		const { navigation, _addNewCategory } = this.props;
		const color = navigation.getParam( 'colorCode', 'blue' );
		const icon = navigation.getParam( 'iconName', 'car' );
		_addNewCategory( { name, color, icon } );
		navigation.goBack();
	}

	render() {
		const { name } = this.state;
		const colorCode = this.props.navigation.getParam( 'colorCode', 'blue' );
		const iconName = this.props.navigation.getParam( 'iconName', 'car' );
		return (
			<ScrollView style={ styles.container }>
				<ListItem
					containerStyle={ styles.iconContainer }
					title="Name"
					rightTitle={ <Input
						inputContainerStyle={ { borderBottomWidth: 0 } }
						inputStyle={ styles.amountInput }
						value={ name }
						placeholder="Category name"
						onChangeText={ ( n ) => this.setState( { name: n } ) }
						autoFocus
					/> }
					contentContainerStyle={ { flex: 2 } }
					rightContentContainerStyle={ { flex: 4 } }
					bottomDivider={ true }
					topDivider={ true }
				/>

				<ListItem
					containerStyle={ { paddingTop: 3, paddingBottom: 3, height: 55 } }
					contentContainerStyle={ { flex: 2 } }
					rightContentContainerStyle={ { flex: 1 } }
					title={ 'Color' }
					bottomDivider={ true }
					topDivider={ true }
					leftIcon={ {
						name: 'circle',
						type: 'font-awesome',
						color: colorCode ? colorCode : 'blue',
						size: 42,
						containerStyle: { margin: -2 },
					} }
					chevron
					rightTitle={ 'Select' }
					onPress={ () => this.props.navigation.navigate( 'ColorSelector' ) }
				/>

				<ListItem
					containerStyle={ { paddingTop: 3, paddingBottom: 3, height: 55 } }
					contentContainerStyle={ { flex: 2 } }
					rightContentContainerStyle={ { flex: 1 } }

					title={ 'Icon ' + iconName }
					bottomDivider={ true }
					topDivider={ true }
					leftIcon={ {
						name: iconName,
						type: 'font-awesome',
						color: 'black',
						size: 42,
						containerStyle: { margin: -2 },
					} }
					chevron
					rightTitle={ 'Select' }
					onPress={ () => this.props.navigation.navigate( 'IconSelector' ) }
				/>
				<Text>{ JSON.stringify( this.state ) }</Text>
			</ScrollView>
		);
	}
}

const mapDispatchToProps = ( dispatch ) => {
	return {
		_addNewCategory: ( category ) => dispatch( addNewCategory( category ) ),
	};
};

export default connect(
	() => ( {} ),
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
	currencyButton: {
		color: 'grey',
		padding: 3,
		borderWidth: 1,
		borderColor: 'grey',
		borderRadius: 3,
		backgroundColor: '#f9f9f9',
		marginLeft: 7,
		marginRight: 9,
	},
	amountTitle: { fontSize: 12, marginTop: 2 },
	amountInput: { color: 'black', textAlign: 'right' },
	colorBox: ( size, color ) => ( {
		width: size,
		height: size,
		backgroundColor: color,
		margin: 3,
	} ),
} );
