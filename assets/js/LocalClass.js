/* This JS-file handles events connected to 'editlocal.html' */
'use strict';

const LocalClass = {

	defaultImagePath: 'assets/img/placeholder_image.png',


	handleFiles: fileList => {
		let preview = $('#editable-image');
		let selectedFile = fileList[0];

		if (LocalClass.isValidImageFormat(selectedFile)) {
			// In case a message has been shown earlier.
			Message.removeUserMessage();
			
			const reader = new FileReader();
			reader.onloadend = () => {
				preview.attr('src', reader.result);
				LocalClass.addEditButton();
			};

			if (selectedFile) {
				reader.readAsDataURL(selectedFile);
			} else {
				preview.attr('src', LocalClass.defaultImagePath);
				LocalClass.removeActionButtons();
			}

		} else {
			const message = `
				File is not valid! The file is either not an image
				or the format is wrong. Valid formats are Png and Jpg/Jpeg.
				Please try again.
			`;
			Message.showUserMessage(message, 'user-message-error');
			preview.attr('src', LocalClass.defaultImagePath);
			LocalClass.removeActionButtons();
		}
	},

	removeActionButtons: () => {
		$('#edit-button').remove();
		$('#download-button').remove();
	},

	isValidImageFormat: file => {
		// Aviary photo editor only supports Png and Jpg/Jpeg.
		if (file.type == 'image/png' ||
			file.type == 'image/jpg' ||
			file.type == 'image/jpeg') {
			return true
		}
	},

	addEditButton: () => {
		$('#edit-button-field').html(`
			<a href="#"
			   id="edit-button"
			   onclick="AviaryLocal.launchEditor('editable-image')"
			   class="mdl-button
					  mdl-js-button
					  mdl-button--raised
					  mdl-js-ripple-effect
					  mdl-button--primary
					  edit-button">
				Edit image
			</a>
		`);
	},
	
	addDownloadButton: url => {
		$('#download-button-field').html(`
			<a href="${url}" download
			   id="download-button"
			   class="mdl-button 
				   	  mdl-js-button 
				   	  mdl-button--raised 
				      mdl-js-ripple-effect 
				      mdl-button--primary">Download image
			</a>
		`);
	}
	
};