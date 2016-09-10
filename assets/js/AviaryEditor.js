'use strict';

const AviaryEditor = {

	feather: {},


	init: () => {
    AviaryEditor.instantiateFeather();
	},

	instantiateFeather: () => {
		// Instantiate Aviary editor.
		AviaryEditor.feather = new Aviary.Feather({
			apiKey: 'eb5f4fca52634bbf94da9389bd974012',
			theme: 'minimum',
			tools: 'all',
			appendTo: '',
			displayImageSize: true,
			showWaitIndicator: true,

			onSave: (imageID, newURL) => {
        // Show the new edited image.
				$(`#${imageID}`).attr('src', newURL);
        // Add action buttons for new image.
        if (window.location.href.match('editonline')) {
					// Be able to click "Edit" again and new image will be shown.
					$('#edit-button').attr('onclick', 'AviaryEditor.launchEditor(DriveClass.lastEditedImageID)');
  				DriveClass.addDownloadButton(imageID, newURL);
  				DriveClass.addUploadButton(imageID, newURL);
        } else {
					LocalClass.addDownloadButton(newURL);
					DropboxHandler.addDownloadButton(newURL);
				}
			},

			onError: errorObj => {
				console.log(errorObj); // Dev purpose.
				const message = `Error! Something went wrong. Message: ${errorObj.message}`;
				Message.show(message, 'user-message-error')
			}
		});
	},

	launchEditor: (id, src) => {
	  AviaryEditor.feather.launch({ image: id, url: src });
		return false;
	}

};

window.onload = AviaryEditor.init();
