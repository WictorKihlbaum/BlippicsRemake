'use strict';

const SignEvent = {

	signOutButton: null,


	init: function() {
		this.signOutButton = $('#signout-button');
		this.signOutButton.hide();
		this.signOutButton.click(this.signOut);
	},

	signIn: function(googleUser) {
		const profile = googleUser.getBasicProfile();
		//this.signOutButton.show();
		// For Google Drive (Edit online) view.
		//if (window.location.href.match('editonline'))
		  GoogleDriveHandler.checkAuth();
	},

	signOut: function() {
		const auth2 = gapi.auth2.getAuthInstance();
		auth2.signOut();
		auth2.disconnect();
		window.location.reload();
  }

};

//window.onload = SignEvent.init();
