function toggle(x) {
	elMenu = document.querySelector('ul');
	x.classList.toggle('change');
	elMenu.classList.toggle('change');
}

// firebase.auth().onAuthStateChanged(function (user) {
// 	if (user) {
// 		//   var displayName = user.displayName;
// 		//   var email = user.email;
// 		//   var emailVerified = user.emailVerified;
// 		//   var photoURL = user.photoURL;
// 		//   var isAnonymous = user.isAnonymous;
// 		//   var uid = user.uid;
// 		//   var providerData = user.providerData;
// 	} else {
// 	}
// });
