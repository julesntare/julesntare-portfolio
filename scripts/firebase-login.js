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
