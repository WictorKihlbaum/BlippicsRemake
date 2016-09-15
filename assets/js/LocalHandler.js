/* This JS-file handles events connected to 'editlocal.html' */
'use strict';

const LocalHandler = {

	defaultImagePath: 'assets/img/placeholder_image.png',
	invalidImageError: `
		File is not valid! The file has to be an image
		in format Png or Jpg/Jpeg. Please try again.
	`,


	init: function() {
		HelpDialog.setupDialog();
		$('#progressbar').hide();
	},

	handleFiles: function(fileList) {
		const preview = $('#editable-image');
		const selectedFile = fileList[0];

		if (this.isValidImageFormat(selectedFile)) {
			// In case an earlier message has been shown.
			Message.remove();
			this.removeActionButtons();
			const reader = new FileReader();

			reader.onload = () => {
				$('#progressbar').hide();
				preview.attr('src', reader.result);
				this.addEditButton(reader.result);
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
				preview.attr('src', this.defaultImagePath);
				this.removeActionButtons();
			}
		} else {
			Message.show(this.invalidImageError, 'user-message-error');
			preview.attr('src', this.defaultImagePath);
			this.removeActionButtons();
		}
	},

	removeActionButtons: function() {
		$('#edit-button').remove();
		$('#download-button').remove();
	},

	isValidImageFormat: function(file) {
		// Adobe Aviary photo editor only supports Png and Jpg/Jpeg.
		return ['image/png', 'image/jpg', 'image/jpeg'].includes(file.type);
	},

	addEditButton: function(url) {
		$('#edit-button-field').html(`
			<a href="#"
			   id="edit-button"
			   onclick="AviaryHandler.launchEditor('editable-image', '${url}')"
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

	addDownloadButton: function(url) {
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
