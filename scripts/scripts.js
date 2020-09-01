let menu = document.querySelector('.menu');
let avatar = document.querySelector('.avatar');
if (avatar) {
	document.querySelector('.avatar').style.display = 'none';
	firebase.auth().onAuthStateChanged((user) => {
		if (user) {
			document.querySelector('#login-box').style.display = 'none';
			document.querySelector('.avatar').style.display = 'flex';
			docRef = db.collection('users').doc(user.uid);
			docRef
				.get()
				.then((doc) => {
					if (doc.data()) {
						if (doc.data().level == 1) {
							let menuLists = `
                            <li><a href="./new-post.html">Write Post</a></li>
                            <li><a href="../admin/index.html">Dashboard</a></li>
							`;
							menu.insertAdjacentHTML('afterbegin', menuLists);
						} else {
							let menuLists = `
						<li><a href="./new-post.html">Write Post</a></li>
						<li><a href="./user-posts.html">Dashboard</a></li>
						`;
							menu.insertAdjacentHTML('afterbegin', menuLists);
						}
						let profImg = doc.data().img
							? `<img src="${doc.data().img}" id="current-profile" alt="profile-img"></img>`
							: user.email[0].toUpperCase();
						document.querySelector('#profile-avatar').innerHTML = profImg;
					} else {
						if (user.photoURL) {
							let profImg = `<img src="${user.photoURL}" id="current-profile" alt="profile-img"></img>`;
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
			return;
		},
		(error) => {
			console.log(error);
		}
	);
} else {
	console.log('geolocation is not enabled');
}
