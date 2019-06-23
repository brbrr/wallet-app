/**
 * External dependencies
 */
import React from 'react';
import { StyleSheet, Text, View, Dimensions, Platform, Button } from 'react-native';
import SortableList from 'react-native-sortable-list';
import PropTypes from 'prop-types';
/**
 * Internal dependencies
 */
import AccountListRow from '../components/AccountListRow';

const AccountsList = ( { accounts, accountOrder, onChangeOrder, onReorderToggle, isReorderEnabled, onListRowPress } ) => {
	console.log( '!!!! AccountsList screen' );
	if ( Object.keys( accounts ).length === 0 ) {
		return (
			<Text>{ 'No accounts yet.' }</Text>
		);
	}
	return (
		<View style={ styles.container }>
			<SortableList
				style={ styles.list }
				sortingEnabled={ isReorderEnabled }
				contentContainerStyle={ styles.contentContainer }
				data={ accounts }
				order={ accountOrder }
				renderRow={ ( { key, index, data, disabled, active } ) => <AccountListRow item={ data } active={ active } disabled={ disabled } onStateChange={ onListRowPress } /> }
				renderHeader={ () => <View style={ { marginTop: 20 } } /> }
				onReleaseRow={ onChangeOrder }
			/>
			{ /* Be fancy about what the state of this button. Maybe hide/update it's title */ }
			<View style={ { flex: 0.1, justifyContent: 'flex-end' } }>
				<Button
					buttonStyle={ { backgroundColor: 'white', borderTopWidth: 1 } }
					type="clear"
					title="Change order"
					disabled={ !! isReorderEnabled }
					onPress={ onReorderToggle }
				/>
			</View>
		</View>
	);
};

export default AccountsList;

AccountsList.propTypes = {
	onChangeOrder: PropTypes.func.isRequired,
	onListRowPress: PropTypes.func.isRequired,
	onReorderToggle: PropTypes.func.isRequired,
	isReorderEnabled: PropTypes.bool.isRequired,
	accountOrder: PropTypes.array.isRequired,
	accounts: PropTypes.object.isRequired,
};

const window = Dimensions.get( 'window' );

const styles = StyleSheet.create( {
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#eee',
	},

	title: {
		fontSize: 20,
		paddingVertical: 20,
		color: '#999999',
	},

	list: {
		flex: 1,
	},

	contentContainer: {
		width: window.width,

		// ...Platform.select( {
		// 	ios: {
		// 		// paddingHorizontal: 30,
		// 	},

		// 	android: {
		// 		paddingHorizontal: 0,
		// 	},
		// } ),
	},

	row: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#fff',
		// padding: 16,
		height: 80,
		flex: 1,
		// marginTop: 7,
		// marginBottom: 12,

		...Platform.select( {
			ios: {
				shadowColor: 'rgba(0,0,0,0.2)',
				shadowOpacity: 1,
				shadowOffset: { height: 2, width: 2 },
				shadowRadius: 2,
			},

			android: {
				elevation: 0,
				marginHorizontal: 30,
			},
		} ),
	},

	image: {
		width: 50,
		height: 50,
		marginRight: 30,
		borderRadius: 25,
	},

	text: {
		fontSize: 16,
		color: '#222222',
	},
} );
