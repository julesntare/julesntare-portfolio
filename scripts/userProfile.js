let accountName = document.querySelector('#account-name');
let currPassword = document.querySelector('#curr-password');
let pswdMsg = document.querySelector('.password-msg');
let userDetails;

// check auth state
firebase.auth().onAuthStateChanged((user) => {
	if (user) {
		if (accountName) {
			accountName.innerHTML = '@' + user.email.split('@')[0];
			userDetails = user.email;
		}
		let docRef = db.collection('users').doc(user.uid);
		docRef
			.get()
			.then((doc) => {
				if (doc.exists) {
					return true;
				}
				window.location.href = '../pages/blog.html';
			})
			.catch((error) => {
				console.log('Error getting document:', error);
			});
	} else {
		window.location.href = '../pages/blog.html';
	}
});
