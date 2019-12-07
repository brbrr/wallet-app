/**
 * External dependencies
 */
import React from 'react';
import { ListItem, Text } from 'react-native-elements';
import { View } from 'react-native';

import moment from 'moment';
/**
 * Internal dependencies
 */
import { getTotalSpentInCurrency } from '../../utils';
import { getDefaultAccountCurrency, getAccountCurrency } from '../../selectors';

const DayHeader = ( props ) => {
	const { records, account } = props;
	const niceDate = moment( records[ 0 ].createdAt ).format( 'MMMM D' );
	let currency;
	if ( account ) {
		currency = getAccountCurrency( props, account.id );
	} else {
		currency = getDefaultAccountCurrency( props );
	}
	const totalPerDay = getTotalSpentInCurrency( props, records, currency.id );
	const niceTotalPerDay = totalPerDay > 0 ? `+${ totalPerDay }` : totalPerDay.toString();

	return (
		<ListItem
			containerStyle={ { paddingTop: 3, paddingBottom: 3 } }
			title={ niceDate }
			titleStyle={ { fontWeight: 'bold', color: 'black' } }
			rightContentContainerStyle={ { flex: 1 } }
			rightTitle={
				<View style={ {
					borderRadius: 12,
					borderColor: 'lightgrey',
					borderWidth: 5,
					backgroundColor: 'lightgrey',
					borderLeftWidth: 15,
					borderRightWidth: 15,
				} }>
					<Text style={ { fontWeight: 'bold', color: 'black', fontSize: 11 } }>{ `${ niceTotalPerDay } ${ currency.code }` }</Text>
				</View>
			}
		/>
	);
};

export default DayHeader;
