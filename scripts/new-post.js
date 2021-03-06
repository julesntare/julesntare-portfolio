let postTitle = document.querySelector('#post-title');
let postContents = document.querySelector('#post-contents');
let closePage = document.querySelector('#close-page');
let fileUpload = document.querySelector('#file-upload');
let imageName = document.querySelector('#image-name');
let publish = document.querySelector('#publish');
let saveDraft = document.querySelector('#save-draft');
let successMsg = document.querySelector('.success-msg');
let errorMsg = document.querySelector('.error-msg');
let fileImage, storageRef, uploadImage, author;

successMsg.style.display = 'none';
errorMsg.style.display = 'none';
closePage.addEventListener('click', (e) => {
	e.preventDefault();
	window.history.back();
});

fileUpload.addEventListener('change', (e) => {
	fileImage = e.target.files[0];
	imageName.innerHTML = e.target.files[0].name;
});

// check auth state
firebase.auth().onAuthStateChanged((user) => {
	if (user) {
		author = user.email;
		let docRef = db.collection('users').doc(user.uid);
		docRef
			.get()
			.then((doc) => {
				if (doc.exists) {
					return true;
				}
				window.location.href = '../pages/blog.html';
			})
			.catch((error) => {
				console.log('Error getting document:', error);
			});
	} else {
		window.location.href = '../pages/blog.html';
	}
});

// add eventlisteners
publish.addEventListener('click', (e) => {
	savePost(e);
});

saveDraft.addEventListener('click', (e) => {
	savePost(e, 'draft');
});

// publish post
const savePost = (e, state = 'published') => {
	if (postTitle.value != '' && postTitle.value.length >= 3) {
		let downloadURL;
		if (fileUpload.files.length > 0) {
			storageRef = storage.ref('images/' + imageName.innerHTML);
			uploadImage = storageRef.put(fileImage);
			uploadImage.on('state_changed', async (snapshot) => {
				if (snapshot.bytesTransferred == snapshot.totalBytes) {
					downloadURL = await snapshot.ref.getDownloadURL();
					db.collection('posts')
						.add({
							title: postTitle.value,
							author: author,
							contents: postContents.value,
							state: state,
							'created-at': new Date(),
							imageUrl: downloadURL,
						})
						.then(() => {
							errorMsg.style.display = 'none';
							successMsg.style.display = 'flex';
							successMsg.innerHTML = 'Post is now published';
							setTimeout(() => {
								window.location.href = '../pages/blog.html';
							}, 2000);
						})
						.catch(() => {
							errorMsg.style.display = 'flex';
							errorMsg.innerHTML = 'Something went wrong!!!';
						});
				}
			});
		} else {
			db.collection('posts')
				.add({
					title: postTitle.value,
					author: author,
					contents: postContents.value,
					state: state,
					'created-at': new Date(),
					imageUrl: null,
				})
				.then(() => {
					errorMsg.style.display = 'none';
					successMsg.style.display = 'flex';
					successMsg.innerHTML = 'Post is now published';
					setTimeout(() => {
						window.location.href = '../pages/blog.html';
					}, 2000);
				})
				.catch(() => {
					errorMsg.style.display = 'flex';
					errorMsg.innerHTML = 'Something went wrong!!!';
				});
		}
	} else {
		e.preventDefault();
		errorMsg.style.display = 'flex';
		errorMsg.innerHTML = 'Please provide title with at least 3 characters long';
	}
};
