/**
 * External dependencies
 */
import React from 'react';
import { ListItem } from 'react-native-elements';
import moment from 'moment';
/**
 * Internal dependencies
 */
import { getTotalSpent } from '../../utils';

const DayHeader = ( { records } ) => {
	const niceDate = moment( records[ 0 ].createdAt ).format( 'MMMM D' );
	const totalPerDay = getTotalSpent( records );

	return (
		<ListItem
			containerStyle={ { paddingTop: 3, paddingBottom: 3 } }
			title={ niceDate }
			rightContentContainerStyle={ { flex: 1 } }
			rightTitle={ totalPerDay.toString() }
			rightTitleStyle={ { fontWeight: 'bold', color: 'black' } }
			bottomDivider={ true }
		/>
	);
};

export default DayHeader;
