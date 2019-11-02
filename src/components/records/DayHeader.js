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
import { getTotalSpent } from '../../utils';

const DayHeader = ( { records } ) => {
	const niceDate = moment( records[ 0 ].createdAt ).format( 'MMMM D' );
	const totalPerDay = getTotalSpent( records );
	const niceTotalPerDay = totalPerDay > 0 ? `+${ totalPerDay }` : totalPerDay.toString();

	return (
		<ListItem
			containerStyle={ { paddingTop: 3, paddingBottom: 3, height: 40 } }
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
					<Text style={ { fontWeight: 'bold', color: 'black', fontSize: 13 } }>{ niceTotalPerDay }</Text>
				</View>
			}
		/>
	);
};

export default DayHeader;
