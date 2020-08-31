let successMsg = document.querySelector('.success-msg');
successMsg.style.display = 'none';
document.querySelector('#forgotForm').addEventListener('submit', async (e) => {
	e.preventDefault();
	let email = document.querySelector('#email');
	let emailAddress = email.value;
	let deleteDoc = await db.collection('users').where('email', '==', emailAddress).get();
	let auth = firebase.auth();
	if (deleteDoc.docs.length == 1) {
		auth.sendPasswordResetEmail(emailAddress)
			.then(() => {
				successMsg.style.display = 'flex';
				successMsg.innerHTML = 'You will get Email if it is already available in the system';
			})
			.catch((error) => {
				console.log(error);
			});
	} else {
		successMsg.style.display = 'flex';
		successMsg.innerHTML = 'You will get Email if it is already available in the system';
	}
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
