/**
 * External dependencies
 */
import React from 'react';
import {
	Image,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	Button,
	Picker,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import PouchDB from 'pouchdb';

export default class NewRecordModal extends React.Component {
	static navigationOptions = {
		header: null,
	};

	constructor( props ) {
		super( props );
		this.state = { text: 'amount', currency: '', realm: null, category: 'default' };
	}

	createNewRecord() {

	}

	render() {
		const info = this.state.realm ?
			'Number of dogs in this Realm: ' + this.state.realm.objects( 'Dog' ).length :
			'Loading...';

		return (
			<View style={ { flex: 1, alignItems: 'center', justifyContent: 'center' } }>
				<Text>
					{ info }
				</Text>
				<Text style={ { fontSize: 30 } }>This is a modal!</Text>
				<Button
					// FIXME: goBack to the previous route instead of default `Home` route
					// onPress={ () => this.props.navigation.goBack(null) }
					onPress={ () => this.props.navigation.navigate( 'Main' ) }

					title="Dismiss"
				/>
				<Input
					onChangeText={ ( text ) => this.setState( { text } ) }
					value={ this.state.text }
				/>
				{ /* // TODO: Use modal picker here */ }
				<Input
					placeholder="currency"
					onChangeText={ ( currency ) => this.setState( { currency } ) }
					value={ this.state.currency }
				/>
				<Input
					placeholder="category"
					onChangeText={ ( category ) => this.setState( { category } ) }
					value={ this.state.category }
				/>

				<Button
					title="addTodo"
					onPress={ this.addTodo }
				/>

				<Button
					title="showTodos"
					onPress={ this.showTodos }
				/>

			</View>
		);
	}
}

