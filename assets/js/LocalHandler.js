/* This JS-file handles events connected to 'editlocal.html' */
'use strict';

const LocalHandler = {

	defaultImagePath: 'assets/img/placeholder_image.png',
	invalidImageError: `
		File is not valid! The file has to be an image
		in format Png or Jpg/Jpeg. Please try again.
	`,


	init: () => {
		HelpDialog.setupDialog();
		$('#progressbar').hide();
	},

	handleFiles: fileList => {
		const preview = $('#editable-image');
		const selectedFile = fileList[0];

		if (LocalHandler.isValidImageFormat(selectedFile)) {
			// In case an earlier user message has been shown.
			Message.remove();
			LocalHandler.removeActionButtons();
			const reader = new FileReader();

			reader.onload = () => {
				$('#progressbar').hide();
				preview.attr('src', reader.result);
				LocalHandler.addEditButton(reader.result);
			};

			reader.onprogress = () => {
				$('#progressbar').show();
			};

			reader.onerror = error => {
				Message.show(error, 'user-message-error');
			};

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

	updateImageURI: url => {
		LocalHandler.getImageFromAmazon(url)
		  .then(blob => {
				LocalHandler.convertToDataURI(blob)
				  .then(imageDataURI => {
						LocalHandler.addEditButton(imageDataURI);
					});
			});
	},

	/**
	 * Aviary photo editor saves image temporarily on Amazon server.
	 */
	getImageFromAmazon: url => {
		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.onloadend = () => {
				resolve(xhr.response);
			};
			xhr.onprogress = () => {
				// Disable button while image dataURI is being updated.
				$('#edit-button').attr('disabled', true);
			};
			xhr.onerror = error => {
				reject(error);
				Message.show(error, 'user-message-error');
			};
			xhr.open('GET', url);
			xhr.responseType = 'blob';
			xhr.send();
		});
	},

	convertToDataURI: blob => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = () => {
				resolve(reader.result);
			};
			reader.onerror = () => {
				reject(reader.error);
				Message.show(reader.error, 'user-message-error');
			};
			reader.readAsDataURL(blob);
		});
	},

	removeActionButtons: () => {
		$('#edit-button').remove();
		$('#download-button').remove();
	},

	isValidImageFormat: file => {
		// Adobe Aviary photo editor only supports Png and Jpg/Jpeg.
		return ['image/png', 'image/jpg', 'image/jpeg'].includes(file.type);
	},

	addEditButton: imageDataURI => {
		$('#edit-button-field').html(`
			<a href="#"
			   id="edit-button"
			   onclick="AviaryHandler.launchEditor('editable-image', '${imageDataURI}')"
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
