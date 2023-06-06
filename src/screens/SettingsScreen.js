/**
 * External dependencies
 */
import React from 'react';
import { StyleSheet, ScrollView, Platform } from 'react-native';
import { ListItem, Icon } from '@rneui/themed';

export default class SettingsScreen extends React.Component {
	static navigationOptions = {
		title: 'Settings',
	};

	render() {
		console.log('SettingsScreen.render()');
		return (
			<ScrollView style={styles.container}>
				<ListItem
					containerStyle={styles.itemContainer}
					bottomDivider={true}
					topDivider={true}
					onPress={() =>
						this.props.navigation.navigate('SettingsAccounts', {
							enableReorder: true,
						})
					}
				>
					<Icon
						name="circle"
						type="font-awesome"
						size={42}
						color="blue"
					/>
					<ListItem.Content>
						<ListItem.Title>Accounts</ListItem.Title>
					</ListItem.Content>
					<ListItem.Content right>
						<ListItem.Title>Select</ListItem.Title>
					</ListItem.Content>
					<ListItem.Chevron />
				</ListItem>

				<ListItem
					containerStyle={styles.itemContainer}
					bottomDivider={true}
					topDivider={true}
					onPress={() =>
						this.props.navigation.navigate('SettingsCurrencies', {
							isEdit: true,
						})
					}
				>
					<Icon
						name="circle"
						type="font-awesome"
						size={42}
						color="blue"
					/>
					<ListItem.Content>
						<ListItem.Title>Currencies</ListItem.Title>
					</ListItem.Content>
					<ListItem.Content right>
						<ListItem.Title>Select</ListItem.Title>
					</ListItem.Content>
					<ListItem.Chevron />
				</ListItem>

				<ListItem
					containerStyle={styles.itemContainer}
					bottomDivider={true}
					topDivider={true}
					onPress={() =>
						this.props.navigation.navigate('SettingsCategories', {
							isEdit: true,
						})
					}
				>
					<Icon
						name="circle"
						type="font-awesome"
						size={42}
						color="blue"
					/>
					<ListItem.Content>
						<ListItem.Title>Categories</ListItem.Title>
					</ListItem.Content>
					<ListItem.Content right>
						<ListItem.Title>Select</ListItem.Title>
					</ListItem.Content>
					<ListItem.Chevron />
				</ListItem>

				<ListItem
					containerStyle={styles.itemContainer}
					bottomDivider={true}
					topDivider={true}
					onPress={() =>
						this.props.navigation.navigate('SettingsDebug', {
							isEdit: true,
						})
					}
				>
					<Icon
						name="circle"
						type="font-awesome"
						size={42}
						color="blue"
					/>
					<ListItem.Content>
						<ListItem.Title>Debug</ListItem.Title>
					</ListItem.Content>
					<ListItem.Content right>
						<ListItem.Title>Select</ListItem.Title>
					</ListItem.Content>
					<ListItem.Chevron />
				</ListItem>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#f9f9f9',
		flex: 1,

		...Platform.select({
			ios: {
				paddingTop: 20,
			},
		}),
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
	colorBox: (size, color) => ({
		width: size,
		height: size,
		backgroundColor: color,
		margin: 3,
	}),
});
