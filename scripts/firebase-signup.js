// listen for signup form submission
document.querySelector('#signUpForm').addEventListener('submit', submitForm);
function submitForm(e) {
	e.preventDefault();
	// get all inputs values
	let fName = getInputVal('firstName');
	let lName = getInputVal('lastName');
	let email = getInputVal('email');
	let pswd = getInputVal('password');
	saveMessage(fName, lName, email, pswd);
}

// function to get ids of inputs
function getInputVal(id) {
	return document.querySelector(`#${id}`).value;
}

// save message to firebase
function saveMessage(fname, lname, email, pswd) {
	firebase
		.auth()
		.createUserWithEmailAndPassword(email, pswd)
		.then((user) => {
			db.collection('users')
				.doc(user.user.uid)
				.set({
					firstname: fname,
					lastname: lname,
				})
				.then((docRef) => {
					document.querySelector('.success-msg').style.display = 'flex';
					setTimeout(() => {
						document.querySelector('.success-msg').style.display = 'none';
						window.location.href = '../pages/login.html';
					}, 1500);
					document.querySelector('#signUpForm').reset();
				})
				.catch(function (error) {
					console.error('Error adding document: ', error);
				});
		})
		.catch((error) => {
			console.log(error);
		});
}