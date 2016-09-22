
class SignHandler {

	static signIn(googleUser) {
		//const profile = googleUser.getBasicProfile();
		this.addSignOutButton();
		GoogleDriveHandler.checkAuth();
	}

	static addSignOutButton() {
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
	}

	static signOut() {
		const auth2 = gapi.auth2.getAuthInstance();
		auth2.signOut();
		auth2.disconnect();
		window.location.reload();
  }

}
