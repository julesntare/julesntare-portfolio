// Firebase configuration
var firebaseConfig = {
	apiKey: 'AIzaSyASc4Oq57XNSMpZ6CgdjXT4AkmroQlX_sY',
	authDomain: 'contactform-daf99.firebaseapp.com',
	databaseURL: 'https://contactform-daf99.firebaseio.com',
	projectId: 'contactform-daf99',
	storageBucket: 'contactform-daf99.appspot.com',
	messagingSenderId: '174642545018',
	appId: '1:174642545018:web:daeb1627427f5995e156c3',
	measurementId: 'G-WDTGDSYDND',
};
firebase.initializeApp(firebaseConfig);

// reference messages collection
let messagesRef = firebase.database().ref('messages');

// listen for contact form submission
document.querySelector('#contactForm').addEventListener('submit', submitForm);
function submitForm(e) {
	e.preventDefault();
	// get all inputs values
	let name = getInputVal('name');
	let email = getInputVal('email');
	let msg = getInputVal('msg');
	saveMessage(name, email, msg);
	document.querySelector('.success-msg').style.display = 'flex';
	setTimeout(() => {
		document.querySelector('.success-msg').style.display = 'none';
	}, 3500);
	document.querySelector('#contactForm').reset();
}

// function to get ids of inputs
function getInputVal(id) {
	return document.querySelector(`#${id}`).value;
}

// save message to firebase
function saveMessage(name, email, msg) {
	let newMsgRef = messagesRef.push();
	newMsgRef.set({
		name: name,
		email: email,
		msg: msg,
	});
}
