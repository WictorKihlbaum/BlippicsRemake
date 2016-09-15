'use strict';

const AviaryHandler = {

	feather: {},
	newURL: null,

	init: function() {
    this.instantiateFeather();
	},

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
        // Show the new edited image.
				$('#' + imageID).attr('src', newURL);
        const location = window.location.href;
        // Add action buttons for new image.
				switch (true) {
					case location.includes('editgoogledrive'):
  				  GoogleDriveHandler.addActionButtons(imageID, newURL);
					  break;

					case location.includes('editlocal'):
					  this.newURL = newURL;
					  LocalHandler.addDownloadButton(newURL);
					  break;

					case location.includes('editdropbox'):
					  DropboxHandler.addActionButtons(newURL);
					  break;

					case location.includes('editonedrive'):
					  OneDriveHandler.addActionButtons(newURL);
					  break;

					default: break;
				}
			},

			onClose: userHasSaved => {
				if (userHasSaved) {
					const location = window.location.href;
					if (location.includes('editlocal'))
					  LocalHandler.addEditButton(this.newURL);
				}
			},

			onError: errorObj => {
				const message = errorObj.message;
				Message.show(message, 'user-message-error')
			}
		});
	},

	launchEditor: function(id, src) {
	  this.feather.launch({ image: id, url: src });
		return false;
	}

};

window.onload = AviaryHandler.init();
