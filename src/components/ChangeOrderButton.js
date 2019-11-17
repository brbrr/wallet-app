/**
 * External dependencies
 */
import React from 'react';
import { View, Button } from 'react-native';
import PropTypes from 'prop-types';

const ChangeOrderButton = ( { isReorderEnabled, onReorderToggle } ) =>
	<View style={ { flex: 0.1, justifyContent: 'flex-end' } }>
		<Button
			buttonStyle={ { backgroundColor: 'white', borderTopWidth: 1 } }
			type="clear"
			title="Change order"
			disabled={ !! isReorderEnabled }
			onPress={ onReorderToggle } />
	</View>;

ChangeOrderButton.propTypes = {
	onReorderToggle: PropTypes.func.isRequired,
	isReorderEnabled: PropTypes.bool.isRequired,
};

export default ChangeOrderButton;
