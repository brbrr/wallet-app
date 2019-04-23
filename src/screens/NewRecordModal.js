/**
 * External dependencies
 */
import React from 'react';
import { View, Button, Text } from 'react-native';
import { Button as ElButton, Input, Card } from 'react-native-elements';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import { CardSection, LoadingCardSection } from '../components';
import { createNewRecord } from '../actions/records';

class NewRecordModal extends React.Component {
	static navigationOptions = ( { navigation } ) => ( {
		title: 'Add record',
		headerRight: (
			<Button
				onPress={ () => navigation.state.params.handleSave() }
				title="Done"
			/>
		),
		headerLeft: (
			<Button
				// FIXME: goBack to the previous route instead of default `Home` route
				// onPress={ () => this.props.navigation.goBack(null) }
				onPress={ () => navigation.navigate( 'Main' ) }
				title="Dismiss"
			/>
		),
	} );

	constructor( props ) {
		super( props );
		this.state = { text: 'amount', currency: '', realm: null, category: 'default', account: 'Cash' };
		this.props.navigation.setParams( { handleSave: this._createNewRecord.bind( this ) } );
	}

	shouldComponentUpdate( nextProps ) {
		if ( this.props.navigation !== nextProps.navigation ) {
			return false;
		}
		return true;
	}

	componentDidUpdate( prevProps, prevState ) {
		Object.entries( this.props ).forEach( ( [ key, val ] ) =>
			prevProps[ key ] !== val && console.log( `Prop '${ key }' changed` )
		);
		Object.entries( this.state ).forEach( ( [ key, val ] ) =>
			prevState[ key ] !== val && console.log( `State '${ key }' changed` )
		);
	}

	renderNewRecordForm() {
		// const { onCreateEventClick, session, navigation } = this.props;
		const { amount, currency, category, account } = this.state;
		const { draftRecord, categories } = this.props;

		const cat = categories.byId[ draftRecord.categoryId ].name;

		return (
			<Card>
				<CardSection>
					<Input
						label="Amount"
						value={ amount }
						placeholder="0.0"
						onChangeText={ ( amnt ) => this.setState( { amount: amnt } ) }
					/>
				</CardSection>

				{ /* // TODO: Use modal picker here */ }
				<CardSection>
					<Input
						label="Currency"
						value={ currency }
						placeholder="USD"
						onChangeText={ ( curr ) => this.setState( { currency: curr } ) }
					/>
				</CardSection>

				{ /* // TODO: Use modal picker here */ }
				<CardSection>
					{ /* <Input
						label="Category"
						value={ category }
						placeholder="Default"
						onChangeText={ ( cat ) => this.setState( { category: cat } ) }
					/> */ }
					<Text onPress={ () => this.props.navigation.navigate( 'Categories' ) }>{ cat }</Text>
				</CardSection>

				{ /* // TODO: Use modal picker here */ }
				<CardSection>
					<Input
						label="Account"
						value={ account }
						placeholder="Cash"
						onChangeText={ ( acnt ) => this.setState( { account: acnt } ) }
					/>
				</CardSection>

				<LoadingCardSection loading={ false }>
					<ElButton title="Create New Record" onPress={ () => this._createNewRecord() } />
				</LoadingCardSection>
			</Card>
		);
	}

	_createNewRecord() {
		const { onClick, navigation } = this.props;
		onClick();
		navigation.navigate( 'Main' );
	}

	render() {
		return (
			<View style={ { flex: 1, alignItems: 'center', justifyContent: 'center' } }>
				{ this.renderNewRecordForm() }
			</View>
		);
	}
}

const mapStateToProps = ( state, ownProps ) => {
	const { records, draftRecord, categories } = state;
	return {
		records,
		draftRecord,
		categories,
	};
};

const mapDispatchToProps = ( dispatch ) => {
	return {
		onClick: ( amount, currency, category ) => {
			dispatch( createNewRecord( amount, currency, category ) );
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)( NewRecordModal );

