let blogContainer = document.querySelector('.blog-container');
let prevButton = document.querySelector('#prev-post');
let nextButton = document.querySelector('#next-post');
var start = null;
var end = null;
init = async () => {
	let docRef;
	if (window.location.pathname.includes('pages') || window.location.pathname.includes('admin')) {
		docRef = await db.collection('posts').where('state', '==', 'published').orderBy('created-at', 'desc').get();
	} else {
		docRef = await db
			.collection('posts')
			.where('state', '==', 'published')
			.orderBy('created-at', 'desc')
			.limit(2)
			.get();
	}
	docRef.docs.map((doc) => {
		getAllPosts(doc.id, doc.data());
	});
};

const getAllPosts = (id, data) => {
	let d = data['created-at'].toDate();
	d = d.toString().split(' ').slice(1, 4);
	let postContainer = `<div class="blog-posts blog-post-1">
    ${
		data.imageUrl
			? `<div id="post-image">
        <a href="../pages/blog-post.html?postid=${id}&title=${data.title}"><img src="${data.imageUrl}" alt=""></a>
    </div>`
			: '<br/>'
	}
    <div id="post-title">
        <h2><a href="../pages/blog-post.html?postid=${id}&title=${data.title}">${data.title}</a></h2>
    </div>
    <div class="subtitle">
        <p><span>${d[1]}th ${d[0]}, ${d[2]}</p>
    </div>
    <div id="post-content">
        <p>${data.contents.split(' ').splice(0, 20).join(' ')}</p>
    </div>
</div>`;
	blogContainer.innerHTML += postContainer;
};

init();
