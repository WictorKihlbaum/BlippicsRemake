/* This JS-file handles events connected to 'editlocal.html' */
'use strict';

const LocalHandler = {

	defaultImagePath: 'assets/img/placeholder_image.png',

	// Error messages.
	loadingImageError: 'An error occurred while loading the image! Please try again.',
	invalidImageError: `
		File is not valid! The file has to be an image
		in format Png or Jpg/Jpeg. Please try again.
	`,


	init: () => {
		HelpDialog.setupDialog();
		LocalHandler.toggleProgressBar();
	},

	toggleProgressBar: () => {
		const progressbar = $('#progressbar');
		if (progressbar.is(':visible'))
			progressbar.hide();
		else
		  progressbar.show();
	},

	handleFiles: fileList => {
		const preview = $('#editable-image');
		const selectedFile = fileList[0];

		if (LocalHandler.isValidImageFormat(selectedFile)) {
			// In case an earlier user message has been shown.
			Message.remove();

			const reader = new FileReader();
			reader.onload = () => {
				preview.attr('src', reader.result);
				LocalHandler.addEditButton();
				setTimeout(() => // Dev purpose.
					LocalHandler.toggleProgressBar(), 1500);
			};

			reader.onerror = error => {
				console.log('Error: ' + error); // Dev purpose.
				Message.show(LocalHandler.loadingImageError, 'user-message-error');
			}

			reader.onprogress = () =>
				LocalHandler.toggleProgressBar();

			if (selectedFile)
				reader.readAsDataURL(selectedFile);
			else {
				preview.attr('src', LocalHandler.defaultImagePath);
				LocalHandler.removeActionButtons();
			}
		} else {
			Message.show(LocalHandler.invalidImageError, 'user-message-error');
			preview.attr('src', LocalHandler.defaultImagePath);
			LocalHandler.removeActionButtons();
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
			   onclick="AviaryHandler.launchEditor('editable-image')"
				 aria-label="Edit image"
				 title="Edit image"
			   class="mdl-button
				        mdl-js-button
				        mdl-button--fab
				        mdl-button--primary
								animated bounceIn">
			  <i class="material-icons">
				  edit
				</i>
			</a>
		`);
	},

	addDownloadButton: url => {
		$('#download-button-field').html(`
			<a href="${url}" download
			   id="download-button"
				 aria-label="Download image"
				 title="Download image"
			   class="mdl-button
				        mdl-js-button
				        mdl-button--fab
				        mdl-button--primary
								animated bounceIn">
			  <i class="material-icons">
				  file_download
				</i>
			</a>
		`);
	}

};

window.onload = LocalHandler.init();
