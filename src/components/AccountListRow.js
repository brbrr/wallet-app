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
		let iconConfiguration = null;
		if ( item.iconName ) {
			iconConfiguration = {
				name: item.iconName,
				type: 'font-awesome',
				reverse: true,
				reverseColor: 'white',
				color: item.colorCode,
				size: 16,
				containerStyle: { margin: -2 },
			};
		}

		return iconConfiguration;
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
