/**
 * External dependencies
 */
import React from 'react';
import { Platform, View, Text } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import { Header } from 'react-navigation';
import { TabBar } from 'react-native-tab-view';

/**
 * Internal dependencies
 */
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import NewRecordModal from '../screens/NewRecordModal';

const HomeStack = createStackNavigator( {
	Home: HomeScreen,
} );

HomeStack.navigationOptions = {
	tabBarLabel: 'Home',
	tabBarIcon: ( { focused } ) => (
		<TabBarIcon
			focused={ focused }
			name={
				Platform.OS === 'ios' ?
					`ios-information-circle${ focused ? '' : '-outline' }` :
					'md-information-circle'
			}
		/>
	),
};

const SettingsStack = createStackNavigator( {
	Settings: SettingsScreen,
} );

SettingsStack.navigationOptions = {
	tabBarLabel: 'Settings',
	tabBarIcon: ( { focused } ) => (
		<TabBarIcon
			focused={ focused }
			name={ Platform.OS === 'ios' ? 'ios-options' : 'md-options' }
		/>
	),
};

const TabScreen = ( props ) => {
	return (
		<View>
			<View>
				<Text>{ 'props: ' + JSON.stringify( props ) }</Text>
			</View>
			<View>
				<Text>{ 'entries: ' + Object.entries( props.navigation ) }</Text>
			</View>
			<View>
				<Text>{ 'idx: ' + JSON.stringify( props.navigation.index ) }</Text>
			</View>
		</View>
	);
};

const TestTabBar = createMaterialTopTabNavigator( {
	Tab1: TabScreen,
	Tab2: TabScreen,
	Tab3: TabScreen,
} );

TestTabBar.navigationOptions = {
	tabBarLabel: 'Test tabs',
	tabBarIcon: ( { focused } ) => (
		<TabBarIcon
			focused={ focused }
			name={ Platform.OS === 'ios' ? 'ios-options' : 'md-options' }
		/>
	),
	tabBarVisible: false,
	header: () => null,
};

import { StyleSheet, Dimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';

const FirstRoute = () => (
	<View style={ [ styles.scene, { backgroundColor: '#ff4081' } ] } />
);
const SecondRoute = () => {
	console.log( 'SECOND' );

	return <View style={ [ styles.scene, { backgroundColor: '#673ab7' } ] } />;
};

class TabViewExample extends React.Component {
	state = {
		index: 0,
		routes: [
			{ key: 'first', title: 'First' },
			{ key: 'second', title: 'Second' },
		],
	};

	render() {
		console.log( '!!!!!!!!!!!!' );

		return (
			<TabView
				navigationState={ this.state }
				renderScene={ SceneMap( {
					first: FirstRoute,
					second: SecondRoute,
				} ) }
				onIndexChange={ ( index ) => this.setState( { index } ) }
				initialLayout={ { width: Dimensions.get( 'window' ).width } }
				renderTabBar={ ( props ) => <TabBar { ...props } /> }

			/>
		);
	}
}

const exampleInView = ( props ) => (
	<View>
		<TabViewExample />
	</View>
);

exampleInView.navigationOptions = {
	tabBarLabel: 'Test tabs',
	tabBarIcon: ( { focused } ) => (
		<TabBarIcon
			focused={ focused }
			name={ Platform.OS === 'ios' ? 'ios-options' : 'md-options' }
		/>
	),
	// tabBarVisible: false,
	// header: () => null,
};

const styles = StyleSheet.create( {
	scene: {
		flex: 1,
	},
} );

export default createBottomTabNavigator( {
	HomeStack,
	New: {
		screen: View,
		navigationOptions: ( { navigation } ) => ( {
			title: 'New Record',
			tabBarIcon: ( { focused } ) => (
				<TabBarIcon
					focused={ focused }
					name={ Platform.OS === 'ios' ? 'ios-add' : 'md-add' }
				/>

			),
			tabBarOnPress: () => navigation.navigate( 'NewRecord' ),
		} ),
	},
	SettingsStack,
	TestTabBar,
	exampleInView: { screen: exampleInView },
} );
