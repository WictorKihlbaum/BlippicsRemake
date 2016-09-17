/* This JS-file handles events connected to 'editlocal.html' */
'use strict';

const LocalHandler = {

	dropArea: $("#dropzone"),
	preview: $('#editable-image'),
	fileInput: $('#input'),
	defaultImagePath: 'assets/img/placeholder_image.png',

	invalidImageError: `
		Invalid file! The file has to be a Png or Jpg/Jpeg image.
		Please try again.
	`,


	init: function() {
		this.setupDroparea();
	},

	setupDroparea: function() {
		// Prevent defaults on drag/drop events.
		this.dropArea.on('drag dragstart dragend dragover dragenter dragleave drop', e => {
			if (e.preventDefault) e.preventDefault();
			if (e.stopPropagation) e.stopPropagation();
		})
		.on('click', e => {
			// Click anywhere in Droparea to upload file.
		  this.fileInput.click();
		})
		.on('drop', e => {
			// Get the dropped file.
			const file = e.originalEvent.dataTransfer.files[0];
			this.handleFile(file);
		});
		// Takes file from file chooser.
		this.fileInput.on('change', e => {
			const file = e.originalEvent.target.files[0];
			this.handleFile(file);
		});
	},

	handleFile: function(file) {
		if (this.isValidImageFormat(file)) {
			// In case an earlier message has been shown.
			Message.remove();
			ActionButtons.removeButtons();

			if (file) {
				this.createFileReader(file);
			} else {
				this.resetPreview();
				ActionButtons.removeButtons();
			}
		} else {
			Message.show(this.invalidImageError, 'user-message-error');
			this.resetPreview();
			ActionButtons.removeButtons();
		}
	},

	createFileReader: function(file) {
		const reader = new FileReader();
		reader.onload = () => {
			this.hideSpinner();
			this.updatePreview();
			ActionButtons.addEditButton(reader.result);
		};
		reader.onprogress = () => {
			this.showSpinner();
		};
		reader.onerror = error => {
			Message.show(error, 'user-message-error');
		};
		reader.readAsDataURL(file);
	},

	isValidImageFormat: function(file) {
		// Adobe Aviary photo editor only supports Png and Jpg/Jpeg.
		return ['image/png', 'image/jpg', 'image/jpeg'].includes(file.type);
	},

	updatePreview: function() {
		this.preview.attr('src', reader.result);
	},

	resetPreview: function() {
		this.preview.attr('src', this.defaultImagePath);
	},

	showSpinner: function() {
		$('.spinner').removeClass('is-hidden');
	},

	hideSpinner: function() {
		$('.spinner').addClass('is-hidden');
	}

};

window.onload = LocalHandler.init();
