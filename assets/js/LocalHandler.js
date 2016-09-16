/* This JS-file handles events connected to 'editlocal.html' */
'use strict';

const LocalHandler = {

	defaultImagePath: 'assets/img/placeholder_image.png',
	invalidImageError: `
		File is not valid! The file has to be an image
		in format Png or Jpg/Jpeg. Please try again.
	`,


	handleFiles: function(fileList) {
		const preview = $('#editable-image');
		const selectedFile = fileList[0];

		if (this.isValidImageFormat(selectedFile)) {
			// In case an earlier message has been shown.
			Message.remove();
			ActionButtons.removeButtons();
			const reader = new FileReader();

			reader.onload = () => {
				$('#spinner').removeClass('is-active');
				preview.attr('src', reader.result);
				ActionButtons.addEditButton(reader.result);
			};

			reader.onprogress = () => {
				$('#spinner').addClass('is-active');
			};

			reader.onerror = error => {
				Message.show(error, 'user-message-error');
			};

			if (selectedFile) {
				reader.readAsDataURL(selectedFile);
			} else {
				preview.attr('src', this.defaultImagePath);
				ActionButtons.removeButtons();
			}
		} else {
			Message.show(this.invalidImageError, 'user-message-error');
			preview.attr('src', this.defaultImagePath);
			ActionButtons.removeButtons();
		}
	},

	isValidImageFormat: function(file) {
		// Adobe Aviary photo editor only supports Png and Jpg/Jpeg.
		return ['image/png', 'image/jpg', 'image/jpeg'].includes(file.type);
	}

};
