/**
 * External dependencies
 */
import React from 'react';
import { connect } from 'react-redux';
import JSONTree from 'react-native-json-tree';

/**
 * Internal dependencies
 */

class DebugScreen extends React.Component {
	render() {
		return <JSONTree data={ this.props.state } />;
	}
}

const mapStateToProps = ( state ) => ( { state } );

const mapDispatchToProps = () => ( {} );

export const SettingsDebugScreen = connect(
	mapStateToProps,
	mapDispatchToProps
)( DebugScreen );
