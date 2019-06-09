/**
 * External dependencies
 */
import React from 'react';
import {
	Platform,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import { RecordsList } from '../components/records/RecordsList';
import Overview from '../components/Overview';
import { updateDraftWithRecord } from '../actions';

// import Carousel from 'react-native-snap-carousel';

// export default class MyCarousel extends React.Component {
// 	constructor() {
// 		super();
// 		this.state = { entries: [ 'first', 'second', 'third' ] };
// 	}

// 	_renderItem( { type } ) {
// 		return ( <Zzz type={ type } /> );
// 	}

// 	render() {
// 		const { height, width } = Dimensions.get( 'window' );
// 		return (
// 			<Carousel
// 				ref={ ( c ) => {
// 					this._carousel = c;
// 				} }
// 				data={ this.state.entries }
// 				renderItem={ this._renderItem }
// 				sliderWidth={ width }
// 				itemWidth={ width - 10 }
// 			/>
// 		);
// 	}
// }

class HomeScreen extends React.Component {
	static navigationOptions = {
		title: 'Home',
	};

	navigateEditRecordScreen = ( record ) => {
		const { navigation, _updateDraftWithRecord } = this.props;
		_updateDraftWithRecord( record );
		navigation.navigate( 'NewRecord', { record, isEdit: true } );
	}

	constructor( props ) {
		super( props );

		this.state = {
			view: 0,
		};
	}

	updateView = ( viewId ) => {
		this.setState( { view: viewId } );
	}

	renderView() {
		const { records, accounts, categories, currencies } = this.props;
		const { view } = this.state;

		switch ( view ) {
			case 0:
				return (
					<RecordsList
						records={ records }
						accounts={ accounts }
						categories={ categories }
						currencies={ currencies }
						navigateEditRecordScreen={ this.navigateEditRecordScreen }
					/>
				);
			case 1:
				return (
					<Text>View 1</Text>
				);
			default:
				break;
		}
	}

	render() {
		const { records } = this.props;

		return (
			<View
				style={ {
					flex: 1,
					flexDirection: 'column',
					justifyContent: 'space-between',
					backgroundColor: '#f9f9f9',
				} }
				// contentContainer={ { justifyContent: 'space-between' } }
			>
				<Overview records={ records } onPress={ this.updateView } />
				<View style={ { flex: 3 } }>
					{ this.renderView() }
				</View>
			</View>
		);
	}
}

const mapStateToProps = ( state ) => {
	// console.log( state );

	const records = Object.values( state.records.byId );
	return {
		records,
		accounts: state.accounts.byId,
		categories: state.categories.byId,
		currencies: state.currencies.byId,
	};
};

const mapDispatchToProps = ( dispatch ) => {
	return {
		_updateDraftWithRecord: ( record ) => dispatch( updateDraftWithRecord( record ) ),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)( HomeScreen );

const styles = StyleSheet.create( {
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	developmentModeText: {
		marginBottom: 20,
		color: 'rgba(0,0,0,0.4)',
		fontSize: 14,
		lineHeight: 19,
		textAlign: 'center',
	},
	contentContainer: {
		paddingTop: 30,
	},
	welcomeContainer: {
		alignItems: 'center',
		marginTop: 10,
		marginBottom: 20,
	},
	welcomeImage: {
		width: 100,
		height: 80,
		resizeMode: 'contain',
		marginTop: 3,
		marginLeft: -10,
	},
	getStartedContainer: {
		alignItems: 'center',
		marginHorizontal: 50,
	},
	homeScreenFilename: {
		marginVertical: 7,
	},
	codeHighlightText: {
		color: 'rgba(96,100,109, 0.8)',
	},
	codeHighlightContainer: {
		backgroundColor: 'rgba(0,0,0,0.05)',
		borderRadius: 3,
		paddingHorizontal: 4,
	},
	getStartedText: {
		fontSize: 17,
		color: 'rgba(96,100,109, 1)',
		lineHeight: 24,
		textAlign: 'center',
	},
	tabBarInfoContainer: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		...Platform.select( {
			ios: {
				shadowColor: 'black',
				shadowOffset: { height: -3 },
				shadowOpacity: 0.1,
				shadowRadius: 3,
			},
			android: {
				elevation: 20,
			},
		} ),
		alignItems: 'center',
		backgroundColor: '#fbfbfb',
		paddingVertical: 20,
	},
	tabBarInfoText: {
		fontSize: 17,
		color: 'rgba(96,100,109, 1)',
		textAlign: 'center',
	},
	navigationFilename: {
		marginTop: 5,
	},
	helpContainer: {
		marginTop: 15,
		alignItems: 'center',
	},
	helpLink: {
		paddingVertical: 15,
	},
	helpLinkText: {
		fontSize: 14,
		color: '#2e78b7',
	},
} );
