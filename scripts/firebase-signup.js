const firebaseConfig = {
	apiKey: 'AIzaSyASc4Oq57XNSMpZ6CgdjXT4AkmroQlX_sY',
	authDomain: 'contactform-daf99.firebaseapp.com',
	databaseURL: 'https://contactform-daf99.firebaseio.com',
	projectId: 'contactform-daf99',
	storageBucket: 'contactform-daf99.appspot.com',
	messagingSenderId: '174642545018',
	appId: '1:174642545018:web:daeb1627427f5995e156c3',
	measurementId: 'G-WDTGDSYDND',
};

// reference users collection
let usersRef = firebase.database().ref('users');

// listen for signup form submission
document.querySelector('#signUpForm').addEventListener('submit', submitForm);
function submitForm(e) {
	e.preventDefault();
	// get all inputs values
	let fName = getInputVal('firstName');
	let lName = getInputVal('lastName');
	let email = getInputVal('email');
	let pswd = getInputVal('password');
	saveMessage(fName, lName, email, pswd);
	document.querySelector('.success-msg').style.display = 'flex';
	setTimeout(() => {
		document.querySelector('.success-msg').style.display = 'none';
	}, 3500);
	document.querySelector('#signUpForm').reset();
}

// function to get ids of inputs
function getInputVal(id) {
	return document.querySelector(`#${id}`).value;
}

// save message to firebase
function saveMessage(fname, lname, email, pswd) {
	let newMsgRef = messagesRef.push();
	newMsgRef.set({
		firstname: fname,
		lastname: lname,
		email: email,
		password: pswd,
	});
}
