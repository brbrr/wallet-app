/**
 * External dependencies
 */
import * as firebase from 'firebase';

const firebaseConfig = {
	apiKey: 'AIzaSyCn4JXZqEJ-7-yuyhg8DIPiB9kKNIJxj4k',
	authDomain: 'walletup.firebaseapp.com',
	databaseURL: 'https://walletup.firebaseio.com',
	projectId: 'walletup',
	storageBucket: 'walletup.appspot.com',
	messagingSenderId: '243762310523',
};

firebase.initializeApp( firebaseConfig );
