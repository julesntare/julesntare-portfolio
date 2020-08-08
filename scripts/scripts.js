let avatar = document.querySelector('.avatar');
if (avatar) {
	firebase.auth().onAuthStateChanged((user) => {
		if (user) {
			document.querySelector('#login-box').style.display = 'none';
			document.querySelector('.avatar').style.display = 'flex';
			document.querySelector('#profile-avatar').innerHTML = user.email[0].toUpperCase();
		} else {
			document.querySelector('#login-box').style.display = 'flex';
			document.querySelector('.avatar').style.display = 'none';
		}
	});
	document.querySelector('#login-box').addEventListener('click', (e) => {
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
