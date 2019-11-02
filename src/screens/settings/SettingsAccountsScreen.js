/**
 * External dependencies
 */
import { connect } from 'react-redux';
/**
 * Internal dependencies
 */
import { AccountsScreen, mapStateToProps, mapDispatchToProps } from '../AccountsScreen';

/**
 * Internal dependencies
 */

class SAccountsScreen extends AccountsScreen {
	onListRowPress = ( accountId ) => {
		console.log( 'QWEQWEQW', accountId );
		const { navigation } = this.props;
		navigation.navigate( 'NewAccount', { accountId, isEdit: true } );
	}
}

export const SettingsAccountsScreen = connect(
	mapStateToProps,
	mapDispatchToProps
)( SAccountsScreen );
