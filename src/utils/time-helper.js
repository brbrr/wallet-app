/**
 * External dependencies
 */
import moment from 'moment';

export function getTime( timestamp ) {
	return moment( timestamp ).format( 'HH:mm' );
}
