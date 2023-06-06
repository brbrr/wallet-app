/**
 * External dependencies
 */
import React from 'react';
import { StyleSheet, Platform, Text, View, Button } from 'react-native';

/**
 * Internal dependencies
 */
import NewAccount from '../../components/accounts/NewAccount';

export default class AddAccountScreen extends React.Component {
	constructor( props ) {
		super( props );
		this.state = {
			currencyScreen: 'Currencies',
		};

		this.child = React.createRef();
	}

	componentDidMount() {
		this.props.navigation.setOptions( {
			headerRight: () => (
				<Button
					onPress={ () => this.persistAccountAndNavigate() }
					title={ 'Add' }
				/>
			),
		} );
	}

	persistAccountAndNavigate() {
		this.child.current.persistAccount();
		this.props.navigation.navigate( 'AppTabsScreen' );
	}

	render() {
		const { navigation, route } = this.props;

		const accountId = route.params?.accountId;

		return (
			<View style={ styles.container }>
				<Text>O, Hi!</Text>
				<Text>Welcome to this new fancy app!</Text>

				<NewAccount
					ref={ this.child }
					isEdit={ false }
					accountId={ accountId }
					navigate={ navigation.navigate }
					currencyScreen={ this.state.currencyScreen }
				/>
				<Button
					title="Solid Button"
					onPress={ () => {
						this.persistAccountAndNavigate();
					} }
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create( {
	container: {
		flex: 1,
		backgroundColor: '#eee',

		...Platform.select( {
			ios: {
				paddingTop: 20,
			},
		} ),
	},
} );
