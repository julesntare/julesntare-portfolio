let email = document.querySelector('#email');
let fname = document.querySelector('#fname');
let lname = document.querySelector('#lname');
let currentProfile = document.querySelector('#current-profile');
let profileImg = document.querySelector('#profile-img');
let bio = document.querySelector('#bio');
let myLocation = document.querySelector('#my-location');
let submitUpdate = document.querySelector('#submit-update');
let docRef, currEmail;

firebase.auth().onAuthStateChanged((user) => {
	if (user) {
		docRef = db.collection('users').doc(user.uid);
		docRef
			.get()
			.then((doc) => {
				if (doc.exists) {
					email.value = user.email;
					currEmail = user.email;
					fname.value = doc.data().firstname != undefined ? doc.data().firstname : null;
					lname.value = doc.data().lastname != undefined ? doc.data().lastname : null;
					currentProfile.src = doc.data().img != undefined ? doc.data().img : '';
					bio.value = doc.data().bio != undefined ? doc.data().bio : null;
					myLocation.value = doc.data().location != undefined ? doc.data().location : null;
				} else {
					email.value = user.email;
				}
			})
			.catch((error) => {
				console.log('Error getting document:', error);
			});
	} else {
		window.location.href = './login.html';
	}
});

submitUpdate.addEventListener('click', (e) => {
	let downloadUrl = null;
	if (profileImg.files.length > 0) {
		storageRef = storage.ref('images/' + profileImg.files[0].name);
		uploadImage = storageRef.put(profileImg.files[0]);
		uploadImage.on('state_changed', async (snapshot) => {
			if (snapshot.bytesTransferred == snapshot.totalBytes) {
				downloadUrl = await snapshot.ref.getDownloadURL();
				updateData(downloadUrl);
			}
		});
	} else {
		updateData();
	}
});

const updateData = (url = null) => {
	if (email.value != currEmail) {
		let userData = firebase.auth().currentUser;
		userData.updateEmail(email.value).catch((error) => {
			console.log(error);
		});
	}
	docRef
		.update({
			email: email.value,
			firstname: fname.value,
			lastname: lname.value,
			bio: bio.value,
			location: myLocation.value,
			img: url != null ? url : currentProfile.src,
		})
		.then(() => {
			window.location.reload();
		})
		.catch((error) => {
			console.error('Error updating document: ', error);
		});
};
