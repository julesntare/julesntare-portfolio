firebase.auth().onAuthStateChanged((user) => {
	if (user) {
		let docRef = db.collection('users').doc(user.uid);
		docRef
			.get()
			.then((doc) => {
				if (doc.exists) {
					document.querySelector('#login-box').style.display = 'none';
					document.querySelector('.profile-avatar').style.display = 'flex';
					document.querySelector('.profile-avatar').innerHTML = doc.data().email[0].toUpperCase();
				} else {
					console.log('No such document!');
				}
			})
			.catch((error) => {
				console.log('Error getting document:', error);
			});
	} else {
		document.querySelector('#login-box').style.display = 'flex';
		document.querySelector('.avatar').style.display = 'none';
	}
});

document.querySelector('#logout').addEventListener('click', (e) => {
	e.preventDefault();
	firebase.auth().signOut();
	window.location.href = './blog.html';
});
