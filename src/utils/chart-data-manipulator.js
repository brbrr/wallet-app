/**
 * Internal dependencies
 */
import { convertAmount } from '.';
import { getDefaultAccountCurrency, getAccountCurrency } from '../selectors';
/**
 * External dependencies
 */
import moment from 'moment';
import 'react-native-console-time-polyfill';
import _ from 'lodash';

export default class ChartDataManipulator {
	constructor( state, stateKey = 'balanceDirectiveTrend' ) {
		this.state = state;
		this.stateKey = stateKey;
	}

	doStuff( state, accIds, fromDate ) {
		const directives = state[ this.stateKey ].byId;
		const allSnapshots = accIds.reduce( ( acc, id ) => {
			const accDirectives = this.getAccountDirectives( directives, id );
			const allAccDirectives = this.fillInMissingDirectives( accDirectives, 'day' );

			// this should be done in runtime, can't be stored in redux
			let accSnapshots = this.transformAccountDirectives( allAccDirectives );

			if ( fromDate ) {
				accSnapshots = accSnapshots.filter( ( snapshot ) => moment( snapshot.statDate ).isSameOrAfter( fromDate ) );
			}
			return acc.concat( accSnapshots );
		}, [] );

		return this.consolidateAccountsSnapshots( allSnapshots );
	}

	getAccountDirectives = ( directives, accId ) => {
		return Object.values( directives ).filter( ( directive ) => directive.accId === accId ).sort( ( a, b ) => moment( a.statDate ).diff( b.statDate ) );
	};

	// Transforms update directives into balance snapshots
	transformAccountDirectives = ( accDirectives ) => {
		let balance = 0;
		return accDirectives.map( ( directive ) => {
			// TODO: switch to currency math due to calculation issues
			balance += directive.updateValue;
			return Object.assign( {}, directive, { balance } );
		} );
	};

	// This could be stored in Redux
	fillInMissingDirectives = ( directives, dateType, toDate = moment() ) => {
		const firstSnapshot = directives[ 0 ];

		const findSnapshotByDate = ( date ) => directives.find( ( s ) => moment( s.statDate ).isSame( date ) );

		const startDate = moment( firstSnapshot.statDate );
		let date = startDate.format( 'YYYY-MM-DD' );
		let prevEntry = findSnapshotByDate( date );

		// pre-filling prevEntry when there is no entry for the fromDate
		if ( ! prevEntry ) {
			const earlierDates = directives.filter( ( s ) => s.statDate < date );
			prevEntry = _.last( earlierDates );
		}

		if ( ! prevEntry ) {
			prevEntry = { statDate: date, balance: 0, id: `${ date }::${ firstSnapshot.accId }` };
		}

		const result = [];
		while ( startDate < toDate ) {
			date = startDate.format( 'YYYY-MM-DD' );

			const snapshot = findSnapshotByDate( date );
			if ( snapshot ) {
				prevEntry = snapshot;
			}

			if ( moment( date ).isSame( moment( date ).endOf( dateType ).startOf( 'day' ) ) ) {
				if ( snapshot ) {
					result.push( snapshot );
				} else {
					result.push( Object.assign( {}, prevEntry, { statDate: date, updateValue: 0, backfilled: prevEntry.statDate } ) );
				}
			}

			startDate.add( 1, 'days' );
		}

		return result;
	};

	consolidateAccountsSnapshots = ( allSnapshots ) => {
		const result = {};
		const prevEntries = {};
		allSnapshots.forEach( ( snapshot ) => {
			const date = snapshot.statDate;
			if ( ! result[ date ] ) {
				result[ date ] = { balance: 0, date, ids: [] };
			}

			if ( snapshot.accId === 1 ) {
				const x = 12;
			}
			const entryBalance = this.getBalance( snapshot, prevEntries[ snapshot.accId ], this.calcFunction );
			result[ date ] = { date, balance: result[ date ].balance + entryBalance, ids: [ ...result[ date ].ids, snapshot.id ] };

			prevEntries[ snapshot.accId ] = Object.assign( {}, snapshot, { convertedBalance: entryBalance } );
		} );

		console.log( 'consolidateAccountsSnapshots', result );

		return result;
	};

	getBalance( entry, prevEntry, calcFunction ) {
		if ( this.isEntriesEqual( entry, prevEntry ) ) {
			// When prevEntry and entry are the same
			return prevEntry.convertedBalance;
		} else if ( calcFunction ) {
			return calcFunction( entry, this.state );
		}
		return entry.balance;
	}

	isEntriesEqual( firstEntry, secondEntry ) {
		return (
			firstEntry &&
				secondEntry &&
				secondEntry.balance === firstEntry.balance &&
				secondEntry.accId === firstEntry.accId
		);
	}

	calcFunction( entryObj, state ) {
		const defaultCurrency = getDefaultAccountCurrency( state );

		const balance = entryObj.balance || entryObj.updateValue;
		const fromCurrency = getAccountCurrency( state, entryObj.accId );

		const convertedAmount = convertAmount( balance, { from: fromCurrency.code, to: defaultCurrency.code } );

		return convertedAmount;
	}
}
