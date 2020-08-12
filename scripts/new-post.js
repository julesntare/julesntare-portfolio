let postTitle = document.querySelector('#post-title');
let postContents = document.querySelector('#post-contents');
let closePage = document.querySelector('#close-page');
let fileUpload = document.querySelector('#file-upload');
let imageName = document.querySelector('#image-name');
let publish = document.querySelector('#publish');
let saveDraft = document.querySelector('#save-draft');
let fileImage, storageRef, uploadImage, author;

closePage.addEventListener('click', (e) => {
	e.preventDefault();
	window.history.back();
});

fileUpload.addEventListener('change', (e) => {
	fileImage = e.target.files[0];
	imageName.innerHTML = e.target.files[0].name;
});

firebase.auth().onAuthStateChanged((user) => {
	if (user) {
		author = user.email;
	}
});
publish.addEventListener('click', (e) => {
	if (postTitle != '' && postContents != '' && fileUpload.files.length > 0) {
		let downloadURL;
		storageRef = storage.ref('images/' + imageName.innerHTML);
		uploadImage = storageRef.put(fileImage);
		uploadImage.on('state_changed', async (snapshot) => {
			if (snapshot.bytesTransferred == snapshot.totalBytes) {
				downloadURL = await snapshot.ref.getDownloadURL();
				db.collection('posts').add({
					title: postTitle.value,
					author: author,
					contents: postContents.value,
					'created-at': new Date(),
					imageUrl: downloadURL,
				});
				window.location.href = './blog.html';
			}
		});
	} else {
		e.preventDefault();
	}
});
