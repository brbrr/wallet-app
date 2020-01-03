/**
 * External dependencies
 */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ListItem, Input } from 'react-native-elements';

const NewCategory = ( { navigate, onStateChange, name, colorCode, iconName } ) =>
	<View style={ styles.container }>
		<ListItem
			title="Name"
			rightTitle={ <Input
				inputContainerStyle={ { borderBottomWidth: 0 } }
				inputStyle={ styles.amountInput }
				value={ name }
				placeholder="Category name"
				onChangeText={ ( n ) => onStateChange( { name: n } ) }
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
			onPress={ () => navigate( 'ColorSelector', { onStateChange } ) }
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
			onPress={ () => navigate( 'IconSelector', { onStateChange } ) }
			containerStyle={ styles.rowContainer }
			contentContainerStyle={ styles.wideContainer }
			rightTitleStyle={ styles.smallText }
			bottomDivider={ true }
			topDivider={ true }
			chevron
		/>
	</View>;

export default NewCategory;

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
