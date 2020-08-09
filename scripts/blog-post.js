let authorContainer = document.querySelector('.author-section');
let postContainer = document.querySelector('.post-details');
let authorInfo = document.createElement('div');
let postInfo = document.createElement('div');
let postTitle = document.querySelector('#post-title');
let createdAt = document.querySelector('#created-at');
let postLikes = document.querySelector('.post-likes');

const getPost = (id, data) => {
	let d = data['created-at'].toDate();
	d = d.toString().split(' ').slice(1, 4);
	postTitle.innerHTML = data.title;
	createdAt.innerHTML = `${d[1]}th ${d[0]}, ${d[2]}`;
	authorInfo.innerHTML = `<div class="author-profile"><img src="../assets/images/profile.jpg" alt=""></div>
<div class="author-social-icons">
    <ul class="social-links">
        <li><a href="https://facebook.com/ntarejules1" target="_blank"><img
                    src="../assets/images/social-icons/fb.jpg" alt="facebook"></a>
        </li>
        <li><a href="https://twitter.com/JulesNtare" target="_blank"><img
                    src="../assets/images/social-icons/twitter.png" alt="twitter"></a>
        </li>
        <li><a href="mailto:julesntare@gmail.com" target="_blank"><img
                    src="../assets/images/social-icons/email.jpg" alt="email"></a>
        </li>
    </ul>
</div>
<div class="author-post-details">
    <h3>author:</h3>
    <p>${data.author}</p>
</div>
<div class="author-post-details">
    <h3>about author:</h3>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore illo placeat harum
        perferendis blanditiis! Tenetur est harum dicta asperiores error iure! Asperiores harum hic
        exercitationem quaerat amet tempore laborum est!</p>
</div>
<div class="post-likes">
    <img src="../assets/images/made-love.png" alt="">
    <h2>113</h2>
</div>
<div class="post-share-links">
    <div><input type="text" name="post-link"
            value="https://julesntare.netlify.app/pages/blog-post.html"><img
            src="../assets/images/clipboard.png" /></div>
    <div class="copied">Copied to clipboard</div>
    <div><a href="#">Share to Facebook</a></div>
    <div><a href="#">Share to Twitter</a></div>
    <div><a href="#">Share to LinkedIn</a></div>
    <div><a href="#">Share to Whatsapp</a></div>
</div>
<div class="post-shares">
    <span></span>
    <span></span>
    <span></span>
</div>`;
	authorContainer.appendChild(authorInfo);
	postLikes.innerHTML = `<img src="../assets/images/like-img.png" id="like-image" alt="">
    <h2 id="total-likes">${data.likes | 0}</h2>`;
	postInfo.innerHTML += `<div>
<img src="${data.imageUrl}" alt="">
</div>`;
	let parasContainer = document.createElement('div');
	parasContainer.setAttribute('class', 'post-paras');
	data.contents.split('/').forEach((el) => {
		parasContainer.innerHTML += '<p>' + el + '</p>';
	});
	postInfo.appendChild(parasContainer);
	postContainer.appendChild(postInfo);
};

let param, postid, docRef, doc;
const init = async () => {
	param = window.location.search.split('=');
	postid = param[1].split('&')[0];
	docRef = await db.collection('posts').doc(postid).get();
	doc = docRef.data();
	getPost(docRef.id, doc);
	getReplies(docRef.id);
};

// get user data
let userEmail;
firebase.auth().onAuthStateChanged((user) => {
	if (user) {
		userEmail = user.email;
	}
});

// add reply
document.querySelector('#add-reply').addEventListener('submit', (e) => {
	e.preventDefault();
	let replyContents = document.querySelector('#reply-contents');
	let postRef = db.collection('posts').doc(docRef.id);
	let setWithMerge = postRef.update({
		comments: firebase.firestore.FieldValue.arrayUnion({
			author: userEmail,
			contents: replyContents.value,
			'replied-at': new Date(),
		}),
	});
	setWithMerge
		.then((res) => {
			console.log('added');
			window.location.reload();
		})
		.catch((err) => console.log(err));
});

// get replies
const getReplies = (postId) => {
	let replySection = document.querySelector('.replies-section');
	let replyCounter = document.querySelector('#replies-counter');

	let docRef = db.collection('posts').doc(postId);
	docRef
		.get()
		.then((doc) => {
			if (doc.data().comments == undefined) {
				return (replySection.innerHTML = 'No Replies');
			}
			replyCounter.innerHTML = `comments(${doc.data().comments.length})`;
			doc.data()
				.comments.reverse()
				.forEach((comment) => {
					db.collection('users')
						.where('email', '==', comment.author)
						.get()
						.then((querySnapshot) => {
							querySnapshot.forEach((doc) => {
								let replyDetails = document.createElement('div');
								replyDetails.innerHTML = `<div class="comment-user">
    <div><img src="../assets/images/profile.jpg" alt=""></div>
    <div>
        <h3>${doc.data().firstname} ${doc.data().lastname}</h3>
        <span>${comment['replied-at'].toDate().toString().split('G')[0]}</span>
    </div>
</div>
<div class="view-more">
    <p>${comment.contents}</p>
</div>`;
								replySection.appendChild(replyDetails);
							});
						});
				});
		})
		.catch((error) => {
			console.log('Error getting document:', error);
		});
};

// add likes
postLikes.addEventListener('click', () => {
	let likeImage = document.querySelector('#like-image');
	let postRef = db.collection('posts').doc(docRef.id);
	postRef
		.get()
		.then((doc) => {
			let setWithMerge;
			if (likeImage.src.includes('made-love.png')) {
				setWithMerge = postRef.update({
					likes: firebase.firestore.FieldValue.increment(-1),
				});
				document.querySelector('#total-likes').innerHTML = doc.data().likes - 1;
				likeImage.src = '../assets/images/like-img.png';
			} else {
				setWithMerge = postRef.update({
					likes: firebase.firestore.FieldValue.increment(1),
				});
				likeImage.src = '../assets/images/made-love.png';
				document.querySelector('#total-likes').innerHTML = (doc.data().likes + 1) | 1;
			}
			setWithMerge
				.then((res) => {
					console.log('updated');
				})
				.catch((err) => console.log(err));
		})
		.catch((err) => {
			console.log(err);
		});
});

init();
