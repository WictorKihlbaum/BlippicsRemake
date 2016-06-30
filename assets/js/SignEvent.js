'use strict';

const SignEvent = {
	
	signOutButton: null,
	profileName: null,
	
	
	init: () => {
		SignEvent.signOutButton = $('#signout-button');
		SignEvent.profileName = $('#profile-name');

		SignEvent.hideSignOutButton();
		SignEvent.addEventListener();
	},
	
	signIn: googleUser => {
		const profile = googleUser.getBasicProfile();
		SignEvent.showProfileName(profile.getName());
		SignEvent.showSignOutButton();
		// Check if user is authenticated.
		DriveClass.checkAuth();
	},
	
	signOut: () => {
		const auth2 = gapi.auth2.getAuthInstance();

		auth2.signOut().then(() =>
			console.log('User signed out.'));
		// Revoke all tokens and scopes.
		auth2.disconnect();
		window.location.reload();
  	},
	
	showSignOutButton: () => {
		SignEvent.signOutButton.css('visibility', 'visible');
	},
	
	hideSignOutButton: () => {
		SignEvent.signOutButton.css('visibility', 'hidden');
	},
	
	showProfileName: name => {
		SignEvent.profileName.html(name);
	},
	
	addEventListener: () => {
		SignEvent.signOutButton.click(SignEvent.signOut);
	}
	
};

window.onload = SignEvent.init();