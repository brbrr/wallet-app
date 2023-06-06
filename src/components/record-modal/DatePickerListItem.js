/**
 * External dependencies
 */
import React from 'react';
import { ListItem, Button } from '@rneui/themed';
import moment from 'moment';

/**
 * Internal dependencies
 */
import DatePicker from '../DatePickerModal';
import styles from './styles';

const DatePickerListItem = ( { onStateChange, createdAt } ) => {
	const isToday = moment( createdAt ).isSame( Date.now(), 'day' );
	const dateTitle = isToday ? 'Today' : moment( createdAt ).format( 'dddd, D MMM' );

	return (
		<DatePicker
			startDate={ new Date( createdAt ) }
			renderDate={ () => (
				<ListItem
					containerStyle={ styles.iconContainer }
					title={ dateTitle }
					bottomDivider={ true }
					topDivider={ true }
					leftIcon={ {
						name: 'ios-calendar',
						type: 'ionicon',
						size: 25,
						containerStyle: { paddingLeft: 15, paddingRight: 14 },
					} }
					rightElement={
						<Button
							title={ isToday ? 'Yesterday?' : 'Today?' }
							type="clear"
							titleStyle={ { fontSize: 13 } }
							onPress={ () => {
								let date = new Date(); // Today!
								if ( isToday ) {
									date = date.setDate( date.getDate() - 1 ); // Yesterday
								}
								return onStateChange( { createdAt: date } );
							} }
						/>
					}
				/>
			) }
			onDateChanged={ ( { date } ) => onStateChange( { createdAt: Date.parse( date ) } ) }
		/>
	);
};

export default DatePickerListItem;
