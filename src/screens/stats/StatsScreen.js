/**
 * External dependencies
 */
import React, { Component } from 'react';
import { Button, View, Text, ScrollView, StyleSheet, Platform } from 'react-native';
import { connect } from 'react-redux';
import { ListItem } from 'react-native-elements';

class StatsScreen extends Component {
	static navigationOptions = ( { navigation } ) => {
		const headersConfig = {
			rightTitle: 'Add',
			leftTitle: 'Back',
			leftOnPress: () => navigation.goBack( null ),
			rightOnPress: () => navigation.navigate( 'NewAccount' ),
		};
		return {
			title: 'Stats',

		};
	};

	render() {
		return (
			<ScrollView style={ styles.container }>
				<ListItem
					containerStyle={ styles.itemContainer }
					contentContainerStyle={ { flex: 2 } }
					rightContentContainerStyle={ { flex: 1 } }
					title="Balance Stats"
					bottomDivider={ true }
					topDivider={ true }
					leftIcon={ {
						name: 'circle',
						type: 'font-awesome',
						color: 'blue',
						size: 42,
						containerStyle: { margin: -2 },
					} }
					chevron
					rightTitle={ 'Select' }
					onPress={ () => this.props.navigation.navigate( 'BalanceStats' ) }
				/>

			</ScrollView>
		);
	}
}

export const mapStateToProps = ( state ) => {
	return {};
};

export const mapDispatchToProps = ( dispatch ) => {
	return {};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)( StatsScreen );

const styles = StyleSheet.create( {
	container: {
		backgroundColor: '#f9f9f9',
		flex: 1,

		...Platform.select( {
			ios: {
				paddingTop: 20,
			},
		} ),
	},
	itemContainer: { paddingTop: 3, paddingBottom: 3, height: 55 },
	iconContainer: {
		marginTop: 20,
		marginBottom: 20,
		height: 55,
		flexDirection: 'row',
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
