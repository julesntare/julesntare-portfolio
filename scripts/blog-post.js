let authorContainer = document.querySelector('.author-section');
let postContainer = document.querySelector('.post-details');
let authorInfo = document.createElement('div');
let postInfo = document.createElement('div');
let postTitle = document.querySelector('#post-title');
let createdAt = document.querySelector('#created-at');

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

	postInfo.innerHTML += `<div>
<img src="../assets/images/calendar.PNG" alt="">
</div>`;
	let parasContainer = document.createElement('div');
	parasContainer.setAttribute('class', 'post-paras');
	data.contents.split('/').forEach((el) => {
		parasContainer.innerHTML += '<p>' + el + '</p>';
	});
	postInfo.appendChild(parasContainer);
	postContainer.appendChild(postInfo);
};

const init = async () => {
	let param = window.location.search.split('=');
	let postid = param[1].split('&')[0];
	let docRef = await db.collection('posts').doc(postid).get();
	let doc = docRef.data();
	getPost(docRef.id, doc);
};

init();
