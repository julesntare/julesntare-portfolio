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
			window.location.href = '../pages/blog.html';
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
			window.location.href = '../pages/blog.html';
		})
		.catch((error) => {
			console.log(error);
		});
});

// check auth state
firebase.auth().onAuthStateChanged(function (user) {
	if (user) {
		window.location.href = '../pages/blog.html';
	}
});
