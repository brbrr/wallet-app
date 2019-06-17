/**
 * External dependencies
 */
import React, { Component } from 'react';
import { Animated, Easing, StyleSheet, Text, Image, View, Dimensions, Platform, Button } from 'react-native';
import SortableList from 'react-native-sortable-list';
import { connect } from 'react-redux';
import { ListItem, Button as EButton, Icon } from 'react-native-elements';
/**
 * Internal dependencies
 */
import { selectRecordAccount, updateAccountsOrder } from '../actions';
import { getAccountsById, getAccountOrder } from '../selectors';

const window = Dimensions.get( 'window' );

export class Basic extends Component {
	static navigationOptions = ( { navigation } ) => {
		const isReorderEnabled = navigation.getParam( 'isReorderEnabled', false );
		const _updateAccountsOrder = navigation.getParam( 'updateAccountsOrder', false );
		const nextOrder = navigation.getParam( 'nextOrder' );

		const headersConfig = {
			rightTitle: 'Add',
			leftTitle: 'Back',
			leftOnPress: () => navigation.goBack( null ),
			rightOnPress: () => navigation.navigate( 'NewAccount' ),
		};

		if ( isReorderEnabled ) {
			headersConfig.rightTitle = 'Done';
			headersConfig.leftTitle = 'Cancel';
			headersConfig.rightOnPress = () => _updateAccountsOrder( nextOrder ) && navigation.setParams( { isReorderEnabled: false } );
			headersConfig.leftOnPress = () => navigation.setParams( { isReorderEnabled: false } );
		}
		return {
			title: 'Accounts',
			headerRight: (
				<Button
					onPress={ headersConfig.rightOnPress }
					title={ headersConfig.rightTitle }
				/>
			),
			headerLeft: (
				<Button
					onPress={ headersConfig.leftOnPress }
					title={ headersConfig.leftTitle }
				/>
			),
		};
	};

	constructor( props ) {
		super( props );

		this.state = { accountOrder: props.accountOrder };

		props.navigation.setParams( {
			updateAccountsOrder: this.props._updateAccountsOrder.bind( this ),
			nextOrder: props.accountOrder,
		} );
	}

	onReorderClick = () => this.props.navigation.setParams( { isReorderEnabled: true } )

	onChangeOrder = ( nextOrder ) => {
		this.props.navigation.setParams( { nextOrder } );
		this.setState( { accountOrder: nextOrder } );
	}

	render() {
		const { accountsById, navigation } = this.props;
		const { accountOrder } = this.state;

		if ( Object.keys( accountsById ).length === 0 ) {
			return (
				<Text>{ 'No accounts yet.' }</Text>
			);
		}
		const isReorderEnabled = navigation.getParam( 'isReorderEnabled', false );

		return (
			<View style={ styles.container }>
				<SortableList
					style={ styles.list }
					sortingEnabled={ isReorderEnabled }
					contentContainerStyle={ styles.contentContainer }
					data={ accountsById }
					order={ accountOrder }
					renderRow={ this._renderRow }
					onChangeOrder={ this.onChangeOrder }
				/>
				{ /* Be fancy about what the state of this button. Maybe hide/update it's title */ }
				<View style={ { flex: 0.1, justifyContent: 'flex-end' } }>
					<Button
						buttonStyle={ { backgroundColor: 'white', borderTopWidth: 1 } }
						type="clear"
						title="Change order"
						onPress={ this.onReorderClick }
					/>
				</View>
			</View>
		);
	}

	onPress = ( id ) => {
		const { navigation } = this.props;
		const onStateChange = navigation.getParam( 'onStateChange' );

		onStateChange( id, 'accountId' );
		navigation.goBack( null );
	}

	_renderRow = ( { key, index, data, disabled, active } ) => {
		return <ListRow item={ data } active={ active } disabled={ disabled } onStateChange={ this.onPress } />;
	}
}

class ListRow extends Component {
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

	getIconConfiguration( item ) {
		let iconConfiguration = null;
		if ( item.icon ) {
			iconConfiguration = {
				name: item.icon,
				type: 'font-awesome',
				reverse: true,
				reverseColor: 'white',
				color: item.color,
				size: 16,
				containerStyle: { margin: -2 },
			};
		}

		return iconConfiguration;
	}

	render() {
		console.log( this.props );

		const { item, disabled, onStateChange } = this.props;

		return (
			<ListItem
				containerStyle={ { paddingTop: 3, paddingBottom: 3, height: 55 } }
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

		...Platform.select( {
			ios: {
				paddingTop: 20,
			},
		} ),
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
		// height: 80,
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

const mapStateToProps = ( state ) => {
	return {
		accountsById: getAccountsById( state ),
		accountOrder: getAccountOrder( state ),
	};
};

const mapDispatchToProps = ( dispatch ) => {
	return {
		selectItem: ( id ) => dispatch( selectRecordAccount( id ) ),
		_updateAccountsOrder: ( newOrder ) => dispatch( updateAccountsOrder( newOrder ) ),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)( Basic );
