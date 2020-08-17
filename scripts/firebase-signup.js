let successMsg = document.querySelector('.success-msg');
let errorMsg = document.querySelector('.error-msg');

// listen for signup form submission
document.querySelector('#signUpForm').addEventListener('submit', submitForm);
function submitForm(e) {
	e.preventDefault();
	// get all inputs values
	let fName = getInputVal('firstName');
	let lName = getInputVal('lastName');
	let email = getInputVal('email');
	let pswd = getInputVal('password');
	let cpswd = getInputVal('cpassword');
	if (pswd != cpswd) {
		errorMsg.style.display = 'flex';
		errorMsg.innerHTML = "Password don't match";
	} else {
		db.collection('users')
			.where('email', '==', email)
			.get()
			.then((querySnapshot) => {
				if (querySnapshot.docs.length == 1) {
					errorMsg.style.display = 'flex';
					errorMsg.innerHTML = 'Email Already Exists';
				} else {
					saveUser(fName, lName, email, pswd);
				}
			})
			.catch((error) => {
				console.log('Error getting documents: ', error);
			});
	}
}

// function to get ids of inputs
const getInputVal = (id) => {
	return document.querySelector(`#${id}`).value;
};

// save user to firebase
const saveUser = (fname, lname, email, pswd) => {
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
					level: 2,
					img: null,
					noOfEntries: 1,
				})
				.then(() => {
					errorMsg.style.display = 'none';
					successMsg.style.display = 'flex';
					successMsg.innerHTML = 'Thank you for joining My Blog';
					setTimeout(() => {
						window.location.href = '../pages/blog.html';
					}, 2500);
					document.querySelector('#signUpForm').reset();
				})
				.catch((error) => {
					console.error('Error adding document: ', error);
				});
		})
		.catch((error) => {
			errorMsg.style.display = 'flex';
			errorMsg.innerHTML = error.message;
		});
};

// google authentication
document.querySelector('.login-with').addEventListener('click', (e) => {
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
						level: 2,
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
		docRef = db.collection('users').doc(user.uid);
		docRef
			.get()
			.then((doc) => {
				if (doc.exists) {
					window.location.href = '../pages/blog.html';
				}
			})
			.catch((error) => {
				console.log('Error getting document:', error);
			});
	}
});
