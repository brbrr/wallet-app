/**
 * External dependencies
 */
import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import { RecordsList } from '../components/records/RecordsList';
import Overview from '../components/Overview';
import Swiper from 'react-native-swiper';
import { logComponentUpdates } from '../utils/debug-utils';

class HomeScreen extends React.Component {
	static navigationOptions = {
		title: 'Home',
	};

	navigateEditRecordScreen = ( recordId ) => {
		const { navigation } = this.props;
		navigation.navigate( 'NewRecord', { recordId, isEdit: true } );
	}

	constructor( props ) {
		super( props );

		this.state = {
			view: 0,
		};
	}

	componentDidUpdate( prevProps, prevState ) {
		logComponentUpdates( this, prevProps, prevState );
	}

	// Find dots dimensions
	findDimensions( { y, height } ) {
		const dotElementCenter = ( 8 / 2 ) + 3; // 8px height & 3 px marginTop from default DotElement: https://github.com/leecade/react-native-swiper
		this.setState( { viewCenter: y + ( height / 2 ) - dotElementCenter } );
	}

	renderRecordsLists() {
		const { records, accounts } = this.props;
		const recordsArray = Object.values( records.byId );
		const recordsLists = [ this.recordList( 0, recordsArray ) ];

		Object.values( accounts.byId ).forEach( ( account, id ) => {
			const accountRecords = recordsArray.filter( ( record ) => record.accountId === account.id );
			recordsLists.push( this.recordList( id + 1, accountRecords, account ) );
		} );

		return recordsLists;
	}

	recordList( id, recordsArray, account ) {
		const { accounts, categories, currencies } = this.props;

		return (
			<View
				key={ id }
				style={ {
					flex: 1,
					flexDirection: 'column',
					justifyContent: 'space-between',
					backgroundColor: '#e3eef2',
				} }
			>
				<Overview account={ account } accounts={ accounts } />
				<View
					style={ {
						flex: 0.3,
						backgroundColor: '#b6b1b8',
					} }
					onLayout={ ( event ) => this.findDimensions( event.nativeEvent.layout ) }
				/>
				<View style={ { flex: 3 } }>
					<RecordsList
						recordsArray={ recordsArray }
						accounts={ accounts }
						categories={ categories }
						currencies={ currencies }
						navigateEditRecordScreen={ this.navigateEditRecordScreen }
					/>
				</View>
			</View>
		);
	}

	render() {
		console.log( '!!!!!!!! Home screen render' );

		return (
			<Swiper
				loop={ false }
				paginationStyle={ { position: 'absolute', alignItems: 'top', top: this.state.viewCenter } }
				bounces={ true }
				showsButtons={ false }
			>
				{ this.renderRecordsLists() }
			</Swiper>
		);
	}
}

const mapStateToProps = ( state ) => {
	return {
		records: state.records,
		accounts: state.accounts,
		categories: state.categories,
		currencies: state.currencies,
	};
};

const mapDispatchToProps = () => ( {} );

export default connect(
	mapStateToProps,
	mapDispatchToProps
)( HomeScreen );
