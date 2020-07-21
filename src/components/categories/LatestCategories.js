/**
 * External dependencies
 */
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import Swiper from 'react-native-swiper';

/**
 * Internal dependencies
 */
import Card from '../Card';
import { getCategoriesStats, getCategoryById } from '../../selectors';

const IconBox = ( category, selectItem, id = null ) =>
	<TouchableOpacity
		key={ id }
		onPress={ () => selectItem( category.id ) }
		style={
			{ width: 60, height: 60, flex: 1, flexDirection: 'column', alignItems: 'center' }
		}
	>
		<View>
			<Icon
				name={ category.iconName }
				type={ 'font-awesome' }
				size={ 16 }
				reverse
				reverseColor={ 'white' }
				color={ category.colorCode }
				containerStyle={ { margin: -2 } }
			/>
			<Text
				style={ { fontSize: 13, textAlign: 'center' } }
				numberOfLines={ 1 }
				ellipsizeMode="tail"
			>
				{ category.name }
			</Text>
		</View>
	</TouchableOpacity>;

const LatestCategories = ( props ) => {
	const { selectItem } = props;

	const catStats = getCategoriesStats( props );
	const categories = Object.values( catStats );
	if ( categories.length === 0 ) {
		return null;
	}

	const categoryViews = categories
		// Sort by count
		.sort( ( a, b ) => b.count - a.count )
		// take first 8 elements
		.slice( 0, 8 )
		// split into arrays of four elements
		.reduce( ( acc, cat, id ) => {
			const latestGroup = acc[ acc.length - 1 ];
			const category = getCategoryById( props, cat.id );
			const item = IconBox( category, selectItem, id );

			if ( latestGroup.length < 4 ) {
				acc[ acc.length - 1 ].push( item );
			} else {
				acc.push( [ item ] );
			}

			return acc;
		}, [ [] ] )
		// wrap in styled View
		.map( ( icons, id ) => (
			<View
				style={ { flex: 1, flexDirection: 'row', marginHorizontal: 40, marginTop: 10 } }
				key={ id }>
				{ icons }
			</View>
		) );

	return (
		<Card title="LATEST CATEGORIES" >
			<Swiper
				paginationStyle={ { bottom: 10 } }
				containerStyle={ {
					flex: null,
					height: 100,
					backgroundColor: 'white',
					borderTopWidth: 0.5,
					borderBottomWidth: 0.5,
					borderColor: '#bcbbc1',
				} }
			>
				{ categoryViews }
			</Swiper>
		</Card>
	);
};

export default LatestCategories;
