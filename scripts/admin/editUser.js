let email = document.querySelector('#email');
let fname = document.querySelector('#fname');
let lname = document.querySelector('#lname');
let currentProfile = document.querySelector('#current-profile');
let profileImg = document.querySelector('#profile-img');
let bio = document.querySelector('#bio');
let myLocation = document.querySelector('#my-location');
let submitUpdate = document.querySelector('#submit-update');
let editUserName = document.querySelector('#editUserName');
let successMsg = document.querySelector('.success-msg');
let errorMsg = document.querySelector('.error-msg');
let newDocRef;
let userId = window.location.search.split('=')[1];

newDocRef = db.collection('users').doc(userId);
newDocRef
	.get()
	.then((doc) => {
		if (doc.exists) {
			editUserName.innerHTML += ' (' + doc.data().email + ')';
			email.value = doc.data().email;
			fname.value = doc.data().firstname != undefined ? doc.data().firstname : null;
			lname.value = doc.data().lastname != undefined ? doc.data().lastname : null;
			currentProfile.src = doc.data().img != undefined ? doc.data().img : '';
			bio.value = doc.data().bio != undefined ? doc.data().bio : null;
			myLocation.value = doc.data().location != undefined ? doc.data().location : null;
		}
	})
	.catch((error) => {
		console.log('Error getting document:', error);
	});

submitUpdate.addEventListener('click', (e) => {
	e.preventDefault();
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
	newDocRef
		.update({
			email: email.value,
			firstname: fname.value,
			lastname: lname.value,
			bio: bio.value,
			location: myLocation.value,
			img: url != null ? url : currentProfile.src,
		})
		.then(() => {
			errorMsg.style.display = 'none';
			successMsg.style.display = 'flex';
			successMsg.innerHTML = 'User edited successful';
			setTimeout(() => {
				window.location.reload();
			}, 3000);
		})
		.catch((error) => {
			console.error('Error updating document: ', error);
		});
};
