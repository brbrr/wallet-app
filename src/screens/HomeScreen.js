/**
 * External dependencies
 */
import React from 'react';
import {
	View,
	Dimensions,
} from 'react-native';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import { RecordsList } from '../components/records/RecordsList';
import Overview from '../components/Overview';
import { getRecordsById, getAccountsById, getCategoriesById, getCurrenciesById } from '../selectors';
import Swiper from 'react-native-swiper';

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

	updateView = ( viewId ) => {
		this.setState( { view: viewId } );
	}

	componentDidUpdate( prevProps, prevState ) {
		Object.entries( this.props ).forEach( ( [ key, val ] ) =>
			prevProps[ key ] !== val && console.log( `Prop '${ key }' changed` )
		);
		Object.entries( this.state ).forEach( ( [ key, val ] ) =>
			prevState[ key ] !== val && console.log( `State '${ key }' changed` )
		);
	}

	findDimentions( { y, height } ) {
		const screenCenter = Dimensions.get( 'window' ).height / 2;
		const dotElementCenter = ( 8 / 2 ) + 3; // 8px height & 3 px marginTop from deafult DotElement: https://github.com/leecade/react-native-swiper
		const placeholderViewCenter = y - ( height / 2 ) - screenCenter - dotElementCenter;
		this.setState( { viewCenter: placeholderViewCenter } );
	}

	renderRecordsLists() {
		const { records, accounts } = this.props;
		const recordsArray = Object.values( records );
		const recordsLists = [ this.recordList( 0, recordsArray )	];

		Object.values( accounts ).forEach( ( account, id ) => {
			const accountRecords = recordsArray.filter( ( record ) => record.accountId === account.id );
			recordsLists.push( this.recordList( id + 1, accountRecords, account ) );
		} );

		return recordsLists;
	}

	recordList( id, records, account ) {
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
				<Overview records={ records } account={ account } />
				<View
					style={ {
						flex: 0.3,
						backgroundColor: '#b6b1b8',
					} }
					onLayout={ ( event ) => this.findDimentions( event.nativeEvent.layout ) }
				/>
				<View style={ { flex: 3 } }>
					<RecordsList
						records={ records }
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
				paginationStyle={ { position: 'absolute', top: this.state.viewCenter } }
				bounces={ true }
			>
				{ this.renderRecordsLists() }
			</Swiper>
		);
	}
}

const mapStateToProps = ( state ) => {
	return {
		records: getRecordsById( state ),
		accounts: getAccountsById( state ),
		categories: getCategoriesById( state ),
		currencies: getCurrenciesById( state ),
	};
};

const mapDispatchToProps = () => ( {} );

export default connect(
	mapStateToProps,
	mapDispatchToProps
)( HomeScreen );
