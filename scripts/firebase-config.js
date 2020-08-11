firebase.initializeApp({
	apiKey: 'AIzaSyApy6r-ORip9gq8d0EmsckVXcYqlogLAF4',
	authDomain: 'portfolio-db-d0d5c.firebaseapp.com',
	projectId: 'portfolio-db-d0d5c',
	storageBucket: 'gs://portfolio-db-d0d5c.appspot.com',
});

var db = firebase.firestore();
var storage = firebase.storage();
