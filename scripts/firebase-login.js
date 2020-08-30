let errorMsg = document.querySelector('.error-msg');
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
			errorMsg.style.display = 'flex';
			errorMsg.innerHTML = 'Invalid Email or Password';
		});
});

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
						noOfEntries: 1,
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
						db.collection('users')
							.doc(docRef.id)
							.get()
							.then((doc) => {
								if (doc.data().level == 1) {
									window.location.href = '../admin/index.html';
								} else {
									window.location.href = '../pages/blog.html';
								}
							})
							.catch((err) => console.log(err));
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
					if (doc.data().level == 1) {
						window.location.href = '../admin/index.html';
					} else {
						window.location.href = '../pages/blog.html';
					}
				}
			})
			.catch((error) => {
				console.log('Error getting document:', error);
			});
	}
});
