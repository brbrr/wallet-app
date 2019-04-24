/**
 * External dependencies
 */
import React from 'react';
import {
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import { RecordsList } from '../components/RecordsList';

class HomeScreen extends React.Component {
	static navigationOptions = {
		title: 'Home',
	};

	render() {
		const { records } = this.props;

		const total = records.reduce( ( acc, curr ) => {
			switch ( curr.type ) {
				case 'expense':
					return acc + ( -1 * curr.amount );
				default:
					return acc + curr.amount;
			}
		}, 0 );
		return (
			<View style={ {
				flex: 1,
				flexDirection: 'column',
				justifyContent: 'space-between',
				backgroundColor: '#f9f9f9',
			} }>
				<View style={ { flex: 1 } }>
					<Text> Total spent: { total } </Text>
				</View>
				<View style={ { flex: 3 } }>
					<ScrollView>
						<RecordsList records={ records } />
					</ScrollView>
				</View>
			</View>
		);
	}

	_maybeRenderDevelopmentModeWarning() {
		if ( __DEV__ ) {
			const learnMoreButton = (
				<Text onPress={ this._handleLearnMorePress } style={ styles.helpLinkText }>
					Learn more
				</Text>
			);

			return (
				<Text style={ styles.developmentModeText }>
					Development mode is enabled, your app will be slower but you can use useful development
					tools. { learnMoreButton }
				</Text>
			);
		}
		return (
			<Text style={ styles.developmentModeText }>
					You are not in development mode, your app will run at full speed.
			</Text>
		);
	}
}

const mapStateToProps = ( state, ownProps ) => {
	console.log( state );

	const records = Object.values( state.records.byId );

	return {
		records,
	};
};

const mapDispatchToProps = ( dispatch ) => {
	return {
		test: 'test',
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
