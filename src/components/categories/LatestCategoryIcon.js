/**
 * External dependencies
 */
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

export default ( category, selectItem, id = null ) =>
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
