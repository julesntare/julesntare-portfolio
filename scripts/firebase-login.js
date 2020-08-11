document.querySelector('#loginForm').addEventListener('submit', (e) => {
	e.preventDefault();
	let email = document.querySelector('#email').value;
	let password = document.querySelector('#password').value;
	firebase
		.auth()
		.signInWithEmailAndPassword(email, password)
		.then((user) => {
			window.location.href = '../pages/blog.html';
		})
		.catch((error) => {
			console.log(error);
		});
});

// fb authentication
document.querySelector('#fbAuth').addEventListener('click', (e) => {
	var fbProvider = new firebase.auth.FacebookAuthProvider();
	firebase
		.auth()
		.signInWithPopup(fbProvider)
		.then((result) => {
			console.log(result);
			// window.location.href = '../pages/blog.html';
		})
		.catch((error) => {
			console.log(error);
		});
});

// twitter authentication
document.querySelector('#twitterAuth').addEventListener('click', (e) => {
	e.preventDefault();
});

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
