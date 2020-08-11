let totalPosts = document.querySelector('#total-posts');
let totalUsers = document.querySelector('#total-users');
let totalMsgs = document.querySelector('#total-msgs');

const init = async () => {
	let posts = await db.collection('posts').get();
	totalPosts.innerHTML = posts.docs.length;
	let users = await db.collection('users').get();
	totalUsers.innerHTML = users.docs.length;
	let msgs = await db.collection('posts').get();
	totalMsgs.innerHTML = msgs.docs.length;
};

init();
