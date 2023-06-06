/**
 * External dependencies
 */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Icon } from '@rneui/themed';
import { ScrollView } from 'react-native-gesture-handler';

const iconNames = 'glass, music, heart, film, signal, gear, trash-o, home, road, download, inbox, play-circle-o, lock, flag, volume-up, tags, book, camera, video-camera, pencil, map-marker, gift, leaf, fire, eye, plane, calendar, random, comment, magnet, shopping-cart, key, cogs, comments, thumbs-o-up, heart-o, lemon-o, phone, phone-square, credit-card, bullhorn, bell, globe, wrench, filter, briefcase, group, cloud, flask, magic, truck, money, envelope, legal, bolt, umbrella, lightbulb-o, user-md, stethoscope, suitcase, bell-o, coffee, cutlery, building-o, hospital-o, ambulance, medkit, fighter-jet, beer, desktop, laptop, tablet, gamepad, flag-o, flag-checkered, terminal, shield, calendar-o, fire-extinguisher, rocket, anchor, ticket, youtube, dropbox, stack-overflow, instagram, flickr, tumblr, apple, windows, android, linux, female, male, sun-o, moon-o, archive, wheelchair, slack, wordpress, university, graduation-cap, google, reddit, language, building, child, paw, spoon, recycle, taxi, tree, database, plug, newspaper-o, wifi, calculator, paypal, paint-brush, birthday-cake, bicycle, bus, ship, motorcycle, hotel, subway, television, map-o, pied-piper, first-order, handshake-o, address-book-o, address-card-o, thermometer, bathtub'.split( ', ' );

const IconSelector = ( { navigation } ) => {
	const onStateChange = navigation.getParam( 'onStateChange' );
	const updateAndGoBack = ( iconName ) => {
		onStateChange( { iconName } );
		navigation.goBack();
	};

	const r = iconNames.reduce( ( resultArray, iconName, index ) => {
		const chunkIndex = Math.floor( index / 6 );// items per chunk

		if ( ! resultArray[ chunkIndex ] ) {
			resultArray[ chunkIndex ] = []; // start a new chunk
		}
		const icon = <Icon
			name={ iconName }
			key={ index }
			type={ 'font-awesome' }
			size={ 40 }
			containerStyle={ styles.iconTile }
			onPress={ () => updateAndGoBack( iconName ) }

		/>;
		resultArray[ chunkIndex ].push( icon );
		return resultArray;
	}, [] );

	const iconComponents = r.map( ( comp, idx ) =>
		<View
			style={ styles.iconsRow }
			key={ idx }>
			{ comp }
		</View>,
	);

	return (
		<ScrollView style={ styles.container } keyboardShouldPersistTaps="always" >
			{ iconComponents }
		</ScrollView>
	);
};

const styles = StyleSheet.create( {
	container: { backgroundColor: '#f9f9f9', flex: 1 },
	iconTile: { margin: 7 },
	iconsRow: { flexDirection: 'row' },
} );

IconSelector.navigationOptions = {
	title: 'Select an Icon',
};

export default IconSelector;
