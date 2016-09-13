'use strict';

const AviaryHandler = {

	feather: {},


	init: () => {
    AviaryHandler.instantiateFeather();
	},

	instantiateFeather: () => {
		// Instantiate Aviary editor.
		AviaryHandler.feather = new Aviary.Feather({
			apiKey: 'eb5f4fca52634bbf94da9389bd974012',
			theme: 'minimum',
			tools: 'all',
			appendTo: '',
			displayImageSize: true,
			showWaitIndicator: true,

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
					  LocalHandler.addDownloadButton(newURL);
					  break;

					case location.includes('editdropbox'):
					  DropboxHandler.addDownloadButton(newURL);
						DropboxHandler.addSaverButton(newURL);
					  break;

					case location.includes('editonedrive'):
					  OneDriveHandler.addDownloadButton(newURL);
				 	  OneDriveHandler.addSaverButton(newURL);
					  break;

					default: break;
				}
			},

			onError: errorObj => {
				console.log(errorObj); // Dev purpose.
				const message = `An error occurred! Message: ${errorObj.message}`;
				Message.show(message, 'user-message-error')
			}
		});
	},

	launchEditor: (id, src) => {
	  AviaryHandler.feather.launch({ image: id, url: src });
		return false;
	}

};

window.onload = AviaryHandler.init();
