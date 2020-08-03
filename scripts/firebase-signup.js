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
	db.collection('users')
		.add({
			firstname: fname,
			lastname: lname,
			email: email,
			password: pswd,
		})
		.then(function (docRef) {
			document.querySelector('.success-msg').style.display = 'flex';
			setTimeout(() => {
				document.querySelector('.success-msg').style.display = 'none';
			}, 3500);
			document.querySelector('#signUpForm').reset();
		})
		.catch(function (error) {
			console.error('Error adding document: ', error);
		});
}
