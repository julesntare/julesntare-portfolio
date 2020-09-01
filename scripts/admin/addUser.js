let email = document.querySelector('#email');
let fname = document.querySelector('#fname');
let lname = document.querySelector('#lname');
let pass = document.querySelector('#pass');
let cpass = document.querySelector('#cpass');
let submitUpdate = document.querySelector('#submit-update');
let errorMsg = document.querySelector('.error-msg');
let docRef;

submitUpdate.addEventListener('submit', submitForm);

function submitForm(e) {
	e.preventDefault();
	if (pass != cpass) {
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
					saveUser(fname.value, lname.value, email.value, pass.value);
				}
			})
			.catch((error) => {
				console.log('Error getting documents: ', error);
			});
	}
}

// save user to firebase
const saveUser = (fname, lname, email, pswd) => {
	console.log(email);
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
					noOfEntries: 0,
				})
				.then(() => {
					errorMsg.style.display = 'none';
					successMsg.style.display = 'flex';
					successMsg.innerHTML = 'new user registered';
					setTimeout(() => {
						window.location.href = './user-list.html';
					}, 2500);
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

// check auth state
firebase.auth().onAuthStateChanged((user) => {
	console.log(user);
	if (user) {
		let docRef = db.collection('users').doc(user.uid);
		docRef
			.get()
			.then((doc) => {
				if (doc.exists && doc.data().level == 1) {
					return true;
				}
				// window.location.href = '../pages/blog.html';
			})
			.catch((error) => {
				console.log('Error getting document:', error);
			});
	} else {
		// window.location.href = '../pages/blog.html';
	}
});
