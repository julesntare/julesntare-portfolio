let avatar = document.querySelector('.avatar');
if (avatar) {
	firebase.auth().onAuthStateChanged((user) => {
		if (user) {
			let docRef = db.collection('users').doc(user.uid);
			docRef
				.get()
				.then((doc) => {
					document.querySelector('#login-box').style.display = 'none';
					document.querySelector('.avatar').style.display = 'flex';
					if (doc.exists) {
						document.querySelector('#profile-avatar').innerHTML = doc.data().email[0].toUpperCase();
					} else {
						document.querySelector('#profile-avatar').innerHTML = user.email[0].toUpperCase();
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
}
function toggle(x) {
	elMenu = document.querySelector('ul');
	x.classList.toggle('change');
	elMenu.classList.toggle('change');
}