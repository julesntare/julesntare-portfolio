let accountName = document.querySelector('#account-name');

firebase.auth().onAuthStateChanged((user) => {
	if (user) {
		accountName.innerHTML = '@' + user.email.split('@')[0];
	}
});
