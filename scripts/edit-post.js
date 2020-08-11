let postTitle = document.querySelector('#post-title');
let postContents = document.querySelector('#post-contents');
let closePage = document.querySelector('#close-page');
let fileUpload = document.querySelector('#file-upload');
let imageName = document.querySelector('#image-name');
let editImage = document.querySelector('.edit-image');
let update = document.querySelector('#update');
let cancel = document.querySelector('#cancel');
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
	} else {
		window.location.href = './login.html';
	}
});
update.addEventListener('click', (e) => {
	if (fileUpload.files.length == 0) {
		let postRef = db.collection('posts').doc(postid);
		return postRef
			.update({
				title: postTitle.value,
				contents: postContents.value,
				'created-at': new Date(),
				state: 'published',
			})
			.then(() => {
				window.location.reload();
			})
			.catch((error) => {
				console.error('Error updating document: ', error);
			});
	}
	if (postTitle != '' && postContents != '' && fileUpload.files.length > 0) {
		let downloadURL;
		storageRef = storage.ref('images/' + imageName.innerHTML);
		uploadImage = storageRef.put(fileImage);
		uploadImage.on('state_changed', async (snapshot) => {
			if (snapshot.bytesTransferred == snapshot.totalBytes) {
				downloadURL = await snapshot.ref.getDownloadURL();
				db.collection('posts')
					.doc(postid)
					.update({
						title: postTitle.value,
						contents: postContents.value,
						'created-at': new Date(),
						imageUrl: downloadURL,
						state: 'published',
					})
					.then((res) => {
						window.location.reload();
					})
					.catch((err) => console.log(err));
			}
		});
	} else {
		e.preventDefault();
	}
});

cancel.addEventListener('click', () => {
	window.history.back();
});

const init = async () => {
	param = window.location.search.split('=');
	postid = param[1].split('&')[0];
	docRef = await db.collection('posts').doc(postid).get();
	doc = docRef.data();
	postTitle.value = doc.title;
	editImage.src = doc.imageUrl;
	postContents.value = doc.contents;
};

init();
