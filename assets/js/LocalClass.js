/* This JS-file handles events connected to 'editlocal.html' */
'use strict';

const LocalClass = {

	defaultImagePath: 'assets/img/placeholder_image.png',

	// Error messages.
	loadingImageError: 'An error occurred while loading the image! Please try again.',
	invalidImageError: `
		File is not valid! The file is either not an image
		or the format is wrong. Valid formats are Png and Jpg/Jpeg.
		Please try again.
	`,


	init: () => {
		LocalClass.setupDialog();
		LocalClass.toggleProgressBar();
	},

	setupDialog: () => {
		const dialog = $('dialog')[0];
		const showDialogButton = $('#show-dialog')[0];
		const closeDialogButton = $('.close')[0];

		if (!dialog.showModal) 
			dialogPolyfill.registerDialog(dialog);
		
		showDialogButton.addEventListener('click', () => dialog.showModal());
		closeDialogButton.addEventListener('click', () => dialog.close());
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
			   onclick="AviaryLocal.launchEditor('editable-image')"
			   class="mdl-button
					  mdl-js-button
					  mdl-button--raised
					  mdl-js-ripple-effect
					  mdl-button--primary
					  edit-button">
				<i class="material-icons">edit</i>
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
				<i class="material-icons">file_download</i>
		    	Download image
			</a>
		`);
	}
	
};

window.onload = LocalClass.init();