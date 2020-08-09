let totalPosts = document.querySelector('#total-posts');
let accountName = document.querySelector('#account-name');
let postTable = document.querySelector('.posts-table');
let postListDiv, titleDiv, stateDiv, actionsDiv, deleteLink, editLink;

firebase.auth().onAuthStateChanged((user) => {
	if (user) {
		accountName.innerHTML = '@' + user.email.split('@')[0];
		db.collection('posts')
			.where('author', '==', user.email)
			.get()
			.then((querySnapshot) => {
				totalPosts.innerHTML = querySnapshot.docs.length;
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
	titleDiv.innerHTML = data.title.split(' ').splice(0, 10).join(' ');
	stateDiv.setAttribute('class', 'state');
	stateDiv.innerHTML = data.state;
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
		db.collection('posts')
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
