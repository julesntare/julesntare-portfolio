let totalPosts = document.querySelector('#total-posts');
let totalUsers = document.querySelector('#total-users');
let totalMsgs = document.querySelector('#total-msgs');

const init = async () => {
	let posts = await db.collection('posts').get();
	totalPosts.innerHTML = posts.docs.length;
	let users = await db.collection('users').get();
	totalUsers.innerHTML = users.docs.length;
	let msgs = await db.collection('messages').get();
	totalMsgs.innerHTML = msgs.docs.length;
};

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

init();
