let blogContainer = document.querySelector('.blog-container');

init = async () => {
	let docRef = await db.collection('posts').get();
	docRef.docs.map((doc) => {
		addPost(doc.id, doc.data());
	});
};

const addPost = (id, data) => {
	let d = data['created-at'].toDate();
	d = d.toString().split(' ').slice(1, 4);
	let postContainer = `<div class="blog-posts blog-post-1">
    <div id="post-image">
        <a href="./blog-post.html?postid=${id}&title=${data.title}"><img src="../assets/images/calendar.PNG" alt=""></a>
    </div>
    <div id="post-title">
        <h2><a href="./blog-post.html?postid=${id}&title=${
		data.title
	}">Calendar - A Simple Editorial Calendar for my site</a></h2>
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
