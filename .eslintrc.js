/**
 * External dependencies
 */
// const { escapeRegExp, map } = require( 'lodash' );

/**
 * Internal dependencies
 */
// const { version } = require( './package' );

/**
 * Regular expression string matching a SemVer string with equal major/minor to
 * the current package version. Used in identifying deprecations.
 *
 * @type {string}
 */
// const majorMinorRegExp = escapeRegExp( version.replace( /\.\d+$/, '' ) ) + '(\\.\\d+)?';

module.exports = {
	// parser:  'babel-eslint',  // Specifies the ESLint parser
  extends:  [
		'plugin:@wordpress/eslint-plugin/recommended',
		// 'wpcalypso/react',
		'plugin:jest/recommended',
  ],
 parserOptions:  {
    ecmaVersion:  2018,  // Allows for the parsing of modern ECMAScript features
    sourceType:  'module',  // Allows for the use of imports
	},
	root: true,
	rules: {
		// '@wordpress/react-no-unsafe-timeout': 'error',
		// 'wpcalypso/import-docblock': false,
	},
};