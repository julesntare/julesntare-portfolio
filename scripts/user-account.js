// let currPass = document.querySelector('#curr-pass');
// let newPass = document.querySelector('#new-pass');
// let cPass = document.querySelector('#cpass');
// let passErrMsg = document.querySelector('.pass-error-msg');
let resetPassButton = document.querySelector('#reset-password-via-email');

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
							alert('I hope you will come back. bye!!!');
							window.location.href = './blog.html';
						});
					})
					.catch((error) => {
						console.log(error);
					});
			})
			.catch((error) => {
				console.log(error);
				pswdMsg.style.display = 'block';
				pswdMsg.innerHTML = 'Wrong Password';
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
