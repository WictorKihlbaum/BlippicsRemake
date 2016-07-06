'use strict';

const SignEvent = {
	
	signOutButton: null,
	
	
	init: () => {
		SignEvent.signOutButton = $('#signout-button');
		SignEvent.signOutButton.hide();
		SignEvent.signOutButton.click(SignEvent.signOut);
		SignEvent.snackbarContainer = $('#welcome-toast');
	},
	
	signIn: googleUser => {
		const profile = googleUser.getBasicProfile();
		//SignEvent.profileName.html(profile.getName());
		SignEvent.signOutButton.show();
		// For Google Drive (Edit online) view.
		if (window.location.href.match('editonline')) {
			DriveClass.checkAuth();
		}
	},
	
	signOut: () => {
		const auth2 = gapi.auth2.getAuthInstance();
		auth2.signOut();
		auth2.disconnect();
		window.location.reload();
  	}
	
};

window.onload = SignEvent.init();