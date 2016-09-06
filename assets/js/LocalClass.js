/* This JS-file handles events connected to 'editlocal.html' */
'use strict';

const LocalClass = {

	defaultImagePath: 'assets/img/placeholder_image.png',

	// Error messages.
	loadingImageError: 'An error occurred while loading the image! Please try again.',
	invalidImageError: `
		File is not valid! The file has to be an image
		in format Png or Jpg/Jpeg. Please try again.
	`,


	init: () => {
		HelpDialog.setupDialog();
		LocalClass.toggleProgressBar();
	},

	toggleProgressBar: () => {
		const progressbar = $('#progressbar');
		if (progressbar.is(':visible'))
			progressbar.hide();
		else progressbar.show();
	},

	handleFiles: fileList => {
		const preview = $('#editable-image');
		const selectedFile = fileList[0];

		if (LocalClass.isValidImageFormat(selectedFile)) {
			// In case an earlier user message has been shown.
			Message.remove();

			const reader = new FileReader();

			reader.onloadend = () => {
				preview.attr('src', reader.result);
				LocalClass.addEditButton();
				$('#choose-image-label').html('Choose another image');
				setTimeout(() => // Dev purpose.
					LocalClass.toggleProgressBar(), 3000);
			};

			reader.onerror = error => {
				console.log('Error: ' + error); // Dev purpose.
				Message.show(LocalClass.loadingImageError, 'user-message-error');
			}

			reader.onprogress = () =>
				LocalClass.toggleProgressBar();

			if (selectedFile)
				reader.readAsDataURL(selectedFile);
			else {
				preview.attr('src', LocalClass.defaultImagePath);
				LocalClass.removeActionButtons();
			}
		} else {
			Message.show(LocalClass.invalidImageError, 'user-message-error');
			preview.attr('src', LocalClass.defaultImagePath);
			LocalClass.removeActionButtons();
		}
	},

	removeActionButtons: () => {
		$('#edit-button').remove();
		$('#download-button').remove();
	},

	isValidImageFormat: file => {
		// Adobe Aviary photo editor only supports Png and Jpg/Jpeg.
		return ['image/png', 'image/jpg', 'image/jpeg'].includes(file.type);
	},

	addEditButton: () => {
		$('#edit-button-field').html(`
			<a href="#"
			   id="edit-button"
			   onclick="AviaryEditor.launchEditor('editable-image')"
			   class="mdl-button
					      mdl-js-button
					      mdl-button--raised
					      mdl-js-ripple-effect
					      mdl-button--primary">
			  <i class="material-icons">
				  edit
				</i>
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
				        mdl-button--primary">
			  <i class="material-icons">
				  file_download
				</i>
		    Download image
			</a>
		`);
	}

};

window.onload = LocalClass.init();
