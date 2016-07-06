/* This JS-file handles Aviary Editor for 'editlocal.html' */
'use strict';

const AviaryLocal = {
	
	featherEditor: {},
	
	
	init: () => {
		AviaryLocal.instantiateFeather();
	},
	
	instantiateFeather: () => {
		// Instantiate Aviary editor.
		AviaryLocal.featherEditor = new Aviary.Feather({
			apiKey: 'eb5f4fca52634bbf94da9389bd974012',
			theme: 'minimum',
			tools: 'all',
			appendTo: '',
			displayImageSize: true,
			showWaitIndicator: true,
			
			onSave: (imageID, newURL) => {
				// Show the new edited image.
				$('#' + imageID).attr('src', newURL);
				// Add download button for new image.
				LocalClass.addDownloadButton(newURL);
			},
			
			onError: errorObj => {
				// Show error message.
				console.log(errorObj.message);
				const message = 'Error! Something went wrong.';
				Message.showUserMessage(message, 'user-message-error')
			}
		});
	},
	
	launchEditor: id => {
		AviaryLocal.featherEditor.launch({
			image: id
		});

		return false;
	}
		
};

window.onload = AviaryLocal.init();