// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

const expoPreset = require( 'jest-expo/jest-preset' );
// const jestPreset = require( '@testing-library/react-native/jest-preset' );

module.exports = {
	// clearMocks: true,
	// coverageDirectory: 'coverage',
	// preset: '@testing-library/react-native',
	preset: 'jest-expo',
	// setupFiles: [ ...expoPreset.setupFiles ],
	// The test environment that will be used for testing
	// testEnvironment: 'jsdom',
	// testEnvironment: 'node',

	// transformIgnorePatterns: [
	// 	'node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|sentry-expo|native-base)',
	// ],
};
