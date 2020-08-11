let totalPosts = document.querySelector('#total-posts');
let postTable = document.querySelector('.posts-table');
let postListDiv, titleDiv, stateDiv, actionsDiv, deleteLink, editLink;

firebase.auth().onAuthStateChanged((user) => {
	if (user) {
		db.collection('users')
			.get()
			.then((querySnapshot) => {
				if (querySnapshot.docs.length < 1) {
					return (postTable.innerHTML += 'No post');
				}
				querySnapshot.forEach((doc) => {
					let postList = getPost(doc.id, doc.data());
					postTable.appendChild(postList);
				});
			})
			.catch((error) => {
				console.log('Error getting documents: ', error);
			});
	}
});

const getPost = (id, data) => {
	postListDiv = document.createElement('div');
	titleDiv = document.createElement('div');
	stateDiv = document.createElement('div');
	actionsDiv = document.createElement('div');
	deleteLink = document.createElement('a');
	editLink = document.createElement('a');
	postListDiv.setAttribute('class', 'post-lists');
	titleDiv.setAttribute('class', 'title');
	titleDiv.innerHTML = data.email;
	stateDiv.setAttribute('class', 'title');
	stateDiv.innerHTML = data.firstname + ' ' + data.lastname;
	actionsDiv.setAttribute('class', 'actions');
	actionsDiv.setAttribute('id', id);
	deleteLink.setAttribute('href', '#');
	deleteLink.setAttribute('id', 'delete');
	deleteLink.innerHTML = 'Delete';
	editLink.setAttribute('href', './edit-post.html?postId=' + id);
	editLink.innerHTML = 'Edit';
	actionsDiv.appendChild(deleteLink);
	actionsDiv.appendChild(editLink);
	postListDiv.appendChild(titleDiv);
	postListDiv.appendChild(stateDiv);
	postListDiv.appendChild(actionsDiv);
	deleteLink.addEventListener('click', (e) => {
		e.preventDefault();
		db.collection('users')
			.doc(e.target.parentNode.id)
			.delete()
			.then(() => {
				window.location.reload();
			})
			.catch((error) => {
				console.error('Error removing document: ', error);
			});
	});
	return postListDiv;
};

// check auth state
// check auth state
firebase.auth().onAuthStateChanged((user) => {
	if (user) {
		let docRef = db.collection('users').doc(user.uid);
		docRef
			.get()
			.then((doc) => {
				if (doc.exists && doc.data().level == 1) {
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
