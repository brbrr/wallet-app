/**
 * External dependencies
 */
import React from 'react';
import { View, Button } from 'react-native';
export const ChangeOrderButton = ( { isReorderEnabled, onReorderToggle } ) =>
	<View style={ { flex: 0.1, justifyContent: 'flex-end' } }>
		<Button
			buttonStyle={ { backgroundColor: 'white', borderTopWidth: 1 } }
			type="clear"
			title="Change order"
			disabled={ !! isReorderEnabled }
			onPress={ onReorderToggle } />
	</View>;
