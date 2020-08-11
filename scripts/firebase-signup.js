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
}

// function to get ids of inputs
function getInputVal(id) {
	return document.querySelector(`#${id}`).value;
}

// save message to firebase
function saveMessage(fname, lname, email, pswd) {
	firebase
		.auth()
		.createUserWithEmailAndPassword(email, pswd)
		.then((user) => {
			db.collection('users')
				.doc(user.user.uid)
				.set({
					firstname: fname,
					lastname: lname,
					email: email,
					img: null,
					noOfEntries: 1,
				})
				.then((docRef) => {
					document.querySelector('.success-msg').style.display = 'flex';
					setTimeout(() => {
						document.querySelector('.success-msg').style.display = 'none';
						window.location.href = '../pages/login.html';
					}, 1500);
					document.querySelector('#signUpForm').reset();
				})
				.catch((error) => {
					console.error('Error adding document: ', error);
				});
		})
		.catch((error) => {
			console.log(error);
		});
}

// google authentication
document.querySelector('#googleAuth').addEventListener('click', (e) => {
	var googleProvider = new firebase.auth.GoogleAuthProvider();
	firebase
		.auth()
		.signInWithPopup(googleProvider)
		.then((result) => {
			let docRef = db.collection('users').doc(result.user.uid);
			if (result.additionalUserInfo.isNewUser) {
				docRef
					.set({
						firstname: result.user.displayName.split(' ')[0],
						lastname: result.user.displayName.split(' ')[1],
						email: result.user.email,
						img: result.user.photoURL,
						noOfEntries: firebase.firestore.FieldValue.increment(1),
					})
					.then(() => {
						window.location.href = '../pages/blog.html';
					})
					.catch((error) => {
						console.error('Error writing document: ', error);
					});
			} else {
				docRef
					.update({
						noOfEntries: firebase.firestore.FieldValue.increment(1),
					})
					.then(() => {
						window.location.href = '../pages/blog.html';
					})
					.catch((error) => {
						console.error('Error writing document: ', error);
					});
			}
		})
		.catch((error) => {
			console.log(error);
		});
});

// check auth state
firebase.auth().onAuthStateChanged((user) => {
	if (user) {
		window.location.href = '../pages/blog.html';
	}
});
