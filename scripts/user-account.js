// let currPass = document.querySelector('#curr-pass');
// let newPass = document.querySelector('#new-pass');
// let cPass = document.querySelector('#cpass');
// let passErrMsg = document.querySelector('.pass-error-msg');
let resetPassButton = document.querySelector('#reset-password-via-email');

// delete account
document.querySelector('#delete-account').addEventListener('click', async (e) => {
	if (currPassword.value == '') {
		pswdMsg.style.display = 'block';
		pswdMsg.innerHTML = 'Please confirm your password';
	} else {
		let userDelete = firebase.auth().currentUser;
		let credential = firebase.auth.EmailAuthProvider.credential(userDetails, currPassword.value);
		let deleteUser = await db.collection('users').where('email', '==', userDetails);
		let deletePosts = await db.collection('posts').where('author', '==', userDetails);
		deleteUser.get().then((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				doc.ref.delete();
			});
		});
		deletePosts.get().then((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				doc.ref.delete();
			});
			userDelete
				.reauthenticateWithCredential(credential)
				.then(() => {
					userDelete
						.delete()
						.then(() => {
							alert('I hope you will come back. bye!!!');
						})
						.catch((error) => {
							pswdMsg.style.display = 'block';
							pswdMsg.innerHTML = 'Something went Wrong!!';
						});
				})
				.catch((error) => {
					pswdMsg.style.display = 'block';
					pswdMsg.innerHTML = 'Wrong Password';
				});
		});
	}
});

// send reset password email
resetPassButton.addEventListener('click', (e) => {
	let auth = firebase.auth();
	let userEmail = firebase.auth().currentUser;
	auth.sendPasswordResetEmail(userEmail.email)
		.then(() => {
			alert('Email sent');
		})
		.catch((error) => {
			alert('Something Wrong!!!');
		});
});
