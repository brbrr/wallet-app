/**
 * External dependencies
 */
import React from 'react';
import { StyleSheet, ScrollView, Platform } from 'react-native';
import { ListItem, Input } from 'react-native-elements';
import PropTypes from 'prop-types';

const AccountInfo = ( { navigate, onStateChange, name, balance, colorCode, iconName, currencyCode, onPressCurrency } ) =>
	<ScrollView style={ styles.container } keyboardShouldPersistTaps="always" >
		<ListItem
			title="Name"
			rightTitle={ <Input
				value={ name }
				placeholder="Account name"
				onChangeText={ ( n ) => onStateChange( { name: n } ) }
				autoFocus

				inputContainerStyle={ { borderBottomWidth: 0 } }
				inputStyle={ styles.amountInput }
			/> }
			bottomDivider={ true }
			topDivider={ true }

			containerStyle={ styles.itemContainer }
			contentContainerStyle={ { flex: 2 } }
			rightContentContainerStyle={ { flex: 4 } }
		/>

		<ListItem
			title="Balance"
			rightTitle={ <Input
				value={ balance }
				placeholder="0.0"
				keyboardType="numeric"
				onChangeText={ ( b ) => onStateChange( { balance: b } ) }

				inputContainerStyle={ { borderBottomWidth: 0 } }
				inputStyle={ styles.amountInput }
			/> }
			bottomDivider={ true }
			topDivider={ true }

			containerStyle={ styles.itemContainer }
			contentContainerStyle={ { flex: 2 } }
			rightContentContainerStyle={ { flex: 4 } }
		/>
		<ListItem
			title="Currency"
			rightTitle={ currencyCode }
			bottomDivider={ true }
			topDivider={ true }
			onPress={ onPressCurrency }

			containerStyle={ StyleSheet.flatten( [ styles.itemContainer ] ) }
			contentContainerStyle={ { flex: 2 } }
			rightContentContainerStyle={ { flex: 4 } }
		/>

		<ListItem
			title={ 'Color' }
			bottomDivider={ true }
			topDivider={ true }
			leftIcon={ {
				name: 'circle',
				type: 'font-awesome',
				color: colorCode,
				size: 42,
				containerStyle: { margin: -2 },
			} }
			chevron
			rightTitle={ 'Select' }
			onPress={ () => navigate( 'ColorSelector', { onStateChange } ) }

			containerStyle={ styles.itemContainer }
			contentContainerStyle={ { flex: 2 } }
			rightContentContainerStyle={ { flex: 1 } }
		/>

		<ListItem
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
			onPress={ () => navigate( 'IconSelector', { onStateChange } ) }

			containerStyle={ styles.itemContainer }
			contentContainerStyle={ { flex: 2 } }
			rightContentContainerStyle={ { flex: 1 } }
		/>
	</ScrollView>;

export default AccountInfo;

const styles = StyleSheet.create( {
	container: {
		flex: 1,
		backgroundColor: '#eee',

		...Platform.select( {
			ios: {
				paddingTop: 20,
			},
		} ),
	},
	itemContainer: {
		height: 55,
		flexDirection: 'row',
		paddingTop: 3,
		paddingBottom: 3,
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

AccountInfo.propTypes = {
	onStateChange: PropTypes.func.isRequired,
	navigate: PropTypes.func.isRequired,
	name: PropTypes.string.isRequired,
	balance: PropTypes.string.isRequired,
	colorCode: PropTypes.string.isRequired,
	iconName: PropTypes.string.isRequired,
	currencyCode: PropTypes.string.isRequired,
};
