let accountName = document.querySelector('#account-name');
let currPassword = document.querySelector('#curr-password');
let pswdMsg = document.querySelector('.password-msg');
let userDetails;

firebase.auth().onAuthStateChanged((user) => {
	if (user) {
		accountName.innerHTML = '@' + user.email.split('@')[0];
		userDetails = user.email;
	}
});

// delete account
document.querySelector('#delete-account').addEventListener('click', (e) => {
	if (currPassword.value == '') {
		pswdMsg.style.display = 'block';
		pswdMsg.innerHTML = 'Please confirm your password';
	} else {
		let userDelete = firebase.auth().currentUser;
		let credential = firebase.auth.EmailAuthProvider.credential(userDetails, currPassword.value);
		userDelete
			.reauthenticateWithCredential(credential)
			.then(() => {
				userDelete
					.delete()
					.then(() => {
						let deleteDoc = db.collection('users').where('email', '==', userDetails);
						deleteDoc.get().then((querySnapshot) => {
							querySnapshot.forEach((doc) => {
								doc.ref.delete();
							});
						});
						alert('I hope you will come back. bye!!!');
						window.location.href = './blog.html';
					})
					.catch((error) => {
						console.log(error);
					});
			})
			.catch((error) => {
				pswdMsg.style.display = 'block';
				pswdMsg.innerHTML = 'Wrong Password';
			});
	}
});
