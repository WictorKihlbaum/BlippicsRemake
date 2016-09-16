'use strict';

const SignHandler = {

	signIn: function(googleUser) {
		//const profile = googleUser.getBasicProfile();
		this.addSignOutButton();
		GoogleDriveHandler.checkAuth();
	},

	addSignOutButton: function() {
		$('#signout-button-field').html(`
			<button type="button"
							id="signout-button"
							aria-label="Sign out"
							title="Sign out"
							onclick="SignHandler.signOut()"
							class="mdl-button
										 mdl-js-button
										 mdl-button--fab
										 mdl-button--primary
										 animated bounceIn">
				<i class="material-icons">
					exit_to_app
				</i>
			</button>
		`);
	},

	signOut: function() {
		const auth2 = gapi.auth2.getAuthInstance();
		auth2.signOut();
		auth2.disconnect();
		window.location.reload();
  }

};
