'use strict';

const AviaryHandler = {

	feather: {},
	newURL: null,


	instantiateFeather: function() {
		// Instantiate Aviary editor.
		this.feather = new Aviary.Feather({
			apiKey: 'eb5f4fca52634bbf94da9389bd974012',
			theme: 'minimum',
			tools: 'all',
			appendTo: '',
			displayImageSize: true,
			showWaitIndicator: true,
			launchDelay: 500,
			closeDelay: 500,

			onSave: (imageID, newURL) => {
				this.newURL = newURL;
        // Show the new edited image.
				$('#' + imageID).attr('src', newURL);
        this.handleButtons(imageID, newURL);
			},

			onClose: userHasSaved => {
				if (userHasSaved) ActionButtons.addEditButton(this.newURL);
			},

			onError: errorObj => {
				const message = errorObj.message;
				Message.show(message, 'user-message-error')
			}
		});
	},

	handleButtons: function(id, url) {
		const location = window.location.href;
		// Add action buttons for new image.
		switch (true) {
			case location.includes('editgoogledrive'):
				GoogleDriveHandler.addActionButtons(id, url);
				break;

			case location.includes('editlocal'):
				ActionButtons.addDownloadButton(url);
				break;

			default:
				ActionButtons.addButtons(url);
				break;
		}
	},

	launchEditor: function(id, src) {
	  this.feather.launch({ image: id, url: src });
		return false;
	}

};

window.onload = AviaryHandler.instantiateFeather();
