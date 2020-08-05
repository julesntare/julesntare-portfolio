document.querySelector('#loginForm').addEventListener('submit', (e) => {
	e.preventDefault();
	let email = document.querySelector('#email');
	let password = document.querySelector('#password');
	firebase
		.auth()
		.createUserWithEmailAndPassword(email, password)
		.then((user) => {
			console.log(user);
		})
		.catch((error) => {
			console.log(error);
		});
});
