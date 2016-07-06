/* This JS-file handles Aviary Editor for 'editonline.html' */
'use strict';

const AviaryDrive = {
	
	featherEditor: {},
	
	
	init: () => {
		AviaryDrive.instantiateFeather();
	},
	
	instantiateFeather: () => {
		// Instantiate Aviary editor.
		AviaryDrive.featherEditor = new Aviary.Feather({
			apiKey: 'eb5f4fca52634bbf94da9389bd974012',
			theme: 'minimum',
			tools: 'all',
			appendTo: '',
			displayImageSize: true,
			showWaitIndicator: true,
			
			onSave: (imageID, newURL) => {
				// Show the new edited image.
				$('#' + imageID).attr('src', newURL);
				// Add download- and upload-button for new image.
				DriveClass.addDownloadButton(imageID, newURL);
				DriveClass.addUploadButton(imageID, newURL);
			},
			
			onError: errorObj => {
				// Show error message.
				console.log(errorObj.message);
				const message = 'Error! Something went wrong.';
				Message.showUserMessage(message, 'user-message-error')
			}
		});
	},
	
	launchEditor: (id, src) => {
		AviaryDrive.featherEditor.launch({
			image: id,
			url: src
		});
		
		return false;
	}
		
};

window.onload = AviaryDrive.init();