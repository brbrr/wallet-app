export function logComponentUpdates( { props, state, constructor }, prevProps, prevState ) {
	// Object.entries( props ).forEach( ( [ key, val ] ) => {
	// 	if ( prevProps[ key ] !== val ) {
	// 		console.log(
	// 			`**** [${ constructor.name }] Prop '${ key }' changes
	//       from: ${ JSON.stringify( prevProps[ key ] ) }
	//       to: ${ JSON.stringify( val ) }`
	// 		);
	// 	}
	// }

	// );
	// Object.entries( state ).forEach( ( [ key, val ] ) =>
	// 	prevState[ key ] !== val && console.log(
	// 		`**** [${ constructor.name }] State '${ key }' changed
	//       from: ${ JSON.stringify( prevState[ key ] ) }
	//       to: ${ JSON.stringify( val ) }` )
	// );
}
