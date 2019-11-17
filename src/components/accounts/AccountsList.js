/**
 * External dependencies
 */
import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import SortableList from 'react-native-sortable-list';
import PropTypes from 'prop-types';
/**
 * Internal dependencies
 */
import ChangeOrderButton from '../ChangeOrderButton';
import AccountListRow from './AccountListRow';

const AccountsList = ( { accounts, accountOrder, onChangeOrder, onReorderToggle, isReorderEnabled, onListRowPress, enableReorder } ) => {
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
				renderRow={ ( { data, disabled, active } ) =>
					<AccountListRow item={ data } active={ active } disabled={ disabled } onStateChange={ onListRowPress } />
				}
				renderHeader={ () => <View style={ { marginTop: 20 } } /> }
				onReleaseRow={ onChangeOrder }
			/>
			{ /* Be fancy about what the state of this button. Maybe hide/update it's title */ }
			{ enableReorder && <ChangeOrderButton isReorderEnabled={ isReorderEnabled } onReorderToggle={ onReorderToggle } /> }
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
} );
