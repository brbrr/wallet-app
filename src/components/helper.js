export function getIconConfiguration( item, stylesOverride = {} ) {
	if ( ! item.iconName ) {
		return null;
	}

	const defaultConfiguration = {
		name: item.iconName,
		type: 'font-awesome',
		reverse: true,
		reverseColor: 'white',
		color: item.colorCode,
		size: 16,
		containerStyle: { margin: -2 },
	};

	return Object.assign( defaultConfiguration, stylesOverride );
}
