/* This JS-file handles events connected to 'localimage.html' */
'use strict';

const LocalClass = {
	
	init: () => {
		LocalClass.addEventListeners();
	},

	handleFiles: () => {
		const defaultImagePath = 'images/no_image_chosen.jpg';
		let preview = $('#editable-image');
		let selectedFile = document.getElementById('input').files[0];

		if (LocalClass.isValidImageFormat(selectedFile)) {
			// In case a message has been shown.
			Message.removeUserMessage();
			
			const reader = new FileReader();
			reader.onloadend = () =>
				preview.attr('src', reader.result);

			if (selectedFile) reader.readAsDataURL(selectedFile);
			else preview.attr('src', defaultImagePath);

		} else {
			// Show error message.
			const message = `
				File is not valid! The file is either not an image
				or the format is wrong. Valid formats are Png and Jpg/Jpeg.
				Please try again.`;
			Message.showUserMessage(message, 'user-message-error');
			// Change back to default image.
			preview.attr('src', defaultImagePath);
		}
	},

	isValidImageFormat: image => {
		// Aviary photo editor only supports Png and Jpg/Jpeg.
		if (image.type == 'image/png' ||
			image.type == 'image/jpg' ||
			image.type == 'image/jpeg') {
			return true
		}
	},
	
	addDownloadButton: url => {
		const downloadField = $('#download-button-field');
		downloadField.html(`<a href="${url}" download
			class="button-class button-size-large download-button">
			Download image</a>`);
	},
	
	addEventListeners: () => {
		$('#input').change(LocalClass.handleFiles);
		$('#close-info-message').click(LocalClass.closeWindow);
		$('#edit').click({param: 'editable-image'}, LocalClass.isImageChosen);
	},
	
	closeWindow: () => {
		const infoWindow = $('#step-by-step');
		infoWindow.attr('class', 'fadeout');

		setTimeout(() =>
			infoWindow.css('display', 'none'), 500);
	},
	
	isImageChosen: id => {
		const image = $(`#${id.data.param}`);
		// Check if an image has been chosen before open photo editor.
		if (!image.attr('src').match(/no_image_chosen/g)) {
			AviaryLocal.launchEditor(id.data.param);
		} else {
			// Show error message.
			const message = `
				You have to choose an image before you can edit.
				Please try again.`;
			Message.showUserMessage(message, 'user-message-error');
		}
	}
	
};				

window.onload = LocalClass.init();