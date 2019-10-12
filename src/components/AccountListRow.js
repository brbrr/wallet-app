/**
 * External dependencies
 */
import React, { Component } from 'react';
import { Animated, Easing, StyleSheet, Dimensions, Platform } from 'react-native';
import { ListItem } from 'react-native-elements';

const window = Dimensions.get( 'window' );

export default class AccountListRow extends Component {
	constructor( props ) {
		super( props );

		this._active = new Animated.Value( 0 );

		this._style = {
			...Platform.select( {
				ios: {
					transform: [ {
						scale: this._active.interpolate( {
							inputRange: [ 0, 1 ],
							outputRange: [ 1, 1.1 ],
						} ),
					} ],
					shadowRadius: this._active.interpolate( {
						inputRange: [ 0, 1 ],
						outputRange: [ 2, 10 ],
					} ),
				},

				android: {
					transform: [ {
						scale: this._active.interpolate( {
							inputRange: [ 0, 1 ],
							outputRange: [ 1, 1.07 ],
						} ),
					} ],
					elevation: this._active.interpolate( {
						inputRange: [ 0, 1 ],
						outputRange: [ 2, 6 ],
					} ),
				},
			} ),
		};
	}

	componentWillReceiveProps( nextProps ) {
		if ( this.props.active !== nextProps.active ) {
			Animated.timing( this._active, {
				duration: 100,
				easing: Easing.bounce,
				toValue: Number( nextProps.active ),
			} ).start();
		}
	}

	// TODO: extract into helper function
	getIconConfiguration( item ) {
		if ( ! item.iconName ) {
			return null;
		}

		return {
			name: item.iconName,
			type: 'font-awesome',
			reverse: true,
			reverseColor: 'white',
			color: item.colorCode,
			size: 16,
			containerStyle: { margin: -2 },
		};
	}

	render() {
		const { item, disabled, onStateChange } = this.props;

		return (
			<ListItem
				containerStyle={ { paddingTop: 3, paddingBottom: 3, height: 70 } }
				contentContainerStyle={ { flex: 2 } }
				title={ item.name }
				bottomDivider={ true }
				topDivider={ true }
				leftIcon={ this.getIconConfiguration( item, disabled ) }

				chevron={ disabled ? true : { name: 'bars', type: 'font-awesome' } }
				rightTitle={ disabled ? 'Select' : null }
				onPress={ disabled ? () => onStateChange( item.id ) : null }
			/>
		);
	}
}
