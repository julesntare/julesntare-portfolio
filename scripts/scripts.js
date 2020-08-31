let avatar = document.querySelector('.avatar');
if (avatar) {
	firebase.auth().onAuthStateChanged((user) => {
		if (user) {
			document.querySelector('#login-box').style.display = 'none';
			document.querySelector('.avatar').style.display = 'flex';
			docRef = db.collection('users').doc(user.uid);
			docRef
				.get()
				.then((doc) => {
					if (doc.data()) {
						let profImg = `<img src="${doc.data().img}" id="current-profile" alt=""></img>`;
						document.querySelector('#profile-avatar').innerHTML = profImg;
					} else {
						if (user.photoURL) {
							let profImg = `<img src="${user.photoURL}" id="current-profile" alt=""></img>`;
							document.querySelector('#profile-avatar').innerHTML = profImg;
						} else {
							document.querySelector('#profile-avatar').innerHTML = user.email[0].toUpperCase();
						}
					}
				})
				.catch((error) => {
					console.log('Error getting document:', error);
				});
		} else {
			document.querySelector('#login-box').style.display = 'flex';
			document.querySelector('.avatar').style.display = 'none';
		}
	});
	document.querySelector('#logout').addEventListener('click', (e) => {
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

function toggleProfile(x) {
	profileMenu = document.querySelector('.user-sidebar ul');
	x.classList.toggle('profile-change');
	profileMenu.classList.toggle('profile-change');
}

if ('geolocation' in navigator) {
	navigator.geolocation.getCurrentPosition(
		(position) => {
			console.log(position);
		},
		(error) => {
			console.log(error);
		}
	);
} else {
	console.log('geolocation is not enabled');
}
