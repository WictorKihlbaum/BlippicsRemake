'use strict';

const GoogleDriveHandler = {

	// TODO: Change GoogleDriveHandler to GoogleDriveHandler. BUT fix the problem with GoogleDriveHandler being undefined!

	pagination: null,
	imageArray: [],
	imageList: null,
	currentImageName: '',
	lastEditedImageID: '',
	CLIENT_ID: '117700549617-ol49l4bkna7ch6qbb44gubuj3t2p8vep.apps.googleusercontent.com',
	SCOPES: ['https://www.googleapis.com/auth/drive'],

	// User messages.
	uploadSuccessMessage: 'The image was successfully uploaded to your Google Drive!',
	removeSuccessMessage: 'The image was successfully removed from your Google Drive!',
	uploadErrorMessage: 'The image failed to upload to your Google Drive!',
	driveErrorMessage: 'Error! Could not get image from Google Drive.',
	amazonErrorMessage: `
		An error occurred! Failed to get the edited image.
		Therefore an upload to your Google Drive can not be pursued.
	`,
	noValidImages: 'No valid images (Png, Jpg/Jpeg) found in your Google Drive.',


	init: function() {
		HelpDialog.setupDialog();
		$('#loading-animation').hide();
		GoogleDriveHandler.imageList = $('#image-list');
		GoogleDriveHandler.pagination = $('.pagination-page');
	},

	setupPagination: function() {
		const items = $('#image-list .mdl-card');
		const numItems = items.length;
		const perPage = 8;

		// Only show the first images initially.
		items.slice(perPage).hide();

		$('.pagination-page').pagination({
			items: numItems,
			itemsOnPage: perPage,
			cssStyle: 'custom-theme',
			onPageClick: pageNumber => {
				// Someone changed page, lets hide/show images appropriately.
				const showFrom = perPage * (pageNumber - 1);
				const showTo = showFrom + perPage;
				// First hide everything, then show for the new page.
				items.hide().slice(showFrom, showTo).show();
			}
		});

		const checkFragment = () => {
			// If there's no hash, make sure to go to page 1.
			let hash = window.location.hash || '#page-1';
			// Check the hash string.
			if (hash = hash.match(/^#page-(\d+)$/))
				$("#pagination").pagination('selectPage', parseInt(hash[1]));
		};

		// Call GoogleDriveHandler function whenever the back/forward is pressed.
		$(window).bind('popstate', checkFragment);
		checkFragment();
	},

	/**
	 * Check if current user has authorized GoogleDriveHandler application.
	 */
	checkAuth: function() {
		gapi.auth.authorize({
      'client_id': GoogleDriveHandler.CLIENT_ID,
      'scope': GoogleDriveHandler.SCOPES.join(' '),
      'immediate': true
    }, GoogleDriveHandler.handleAuthResult);
	},

	/**
	 * Handle response from authorization server.
	 */
	handleAuthResult: function(authResult) {
    if (authResult && !authResult.error) {
			GoogleDriveHandler.hideLoginElements();
			GoogleDriveHandler.loadDriveApi();
		} else {
			GoogleDriveHandler.showLoginElements();
		}
	},

	hideLoginElements: function() {
		$('#need-to-login-text').hide();
		$('#google-info-text').hide();
		$('#signin-button').hide();
	},

	showLoginElements: function() {
		$('#need-to-login-text').show();
		$('#google-info-text').show();
		$('#signin-button').show();
	},

	/**
	 * Load Drive API client library.
	 */
	loadDriveApi: function() {
		gapi.client.load('drive', 'v3', GoogleDriveHandler.requestImages);
	},

	requestImages: function() {
		// Show loading animation while images are being loaded.
		$('#loading-animation').show();
		GoogleDriveHandler.imageList.html('');

		const request = gapi.client.drive.files.list({
			'maxResults': 100, // Change to get more (max 1000).
      'fields': "files",
			'q': 'mimeType = "image/jpeg" or mimeType = "image/png"'
		});

		request.execute(response => {
			const images = response.files;
			GoogleDriveHandler.imageArray = images;

			if (images && images.length > 0) {
				for (let image of images) {
					GoogleDriveHandler.renderImage(image);
				}
			} else {
				$('#top-text').html(GoogleDriveHandler.noValidImages);
			}

			$('#loading-animation').hide();
			GoogleDriveHandler.setupPagination();
		});
	},

	renderImage: function(image) {
    // Remove unwanted part of url.
		const largeImageLink = image.webContentLink.replace(/&export=download/i, '');

		GoogleDriveHandler.imageList.append(`
			<div class="mdl-card mdl-shadow--2dp mdl-cell mdl-cell--3-col animated zoomIn"
			     itemscope itemtype ="http://schema.org/ImageObject">
				<div class="mdl-card__title">
					<h2 class="mdl-card__title-text" itemprop="name">
					  ${image.originalFilename}
					</h2>
				</div>
				<div class="mdl-card__media">
				  <a href="${largeImageLink}"
					   title="View large image"
						 aria-label="View large image">
					  <img itemprop="thumbnail"
						   id="${image.id}"
						   src="${image.thumbnailLink}"
						   class="card-thumbnails"
						   alt="${image.originalFilename}" />
				  </a>
				</div>
				<div class="mdl-card__actions" id="actions-for-${image.id}">
					<i title="Edit image"
						 aria-label="Edit image"
					   class="material-icons"
						 id="edit-button"
					   onclick="GoogleDriveHandler.getImageFromDrive('${image.id}')">
					  edit
					</i>
				  <a href="${image.webContentLink}" download>
						<i alt="Download ${image.originalFilename} original"
						   title="Download original image"
							 aria-label="Download original image"
						   class="material-icons">
						  cloud_download
						</i>
					</a>
					<i title="Delete image"
					   aria-label="Delete image"
						 class="material-icons"
						 onclick="GoogleDriveHandler.showConfirmation(\'${image.id}\', \'${image.originalFilename}\')">
					  delete_forever
				  </i>
				</div>
			</div>
		`);
	},

	showConfirmation: function(id, name) {
		const dialog = $('#confirm-dialog')[0];
    if (!dialog.showModal)
		  dialogPolyfill.registerDialog(dialog);

    GoogleDriveHandler.addConfirmationText(id, name);
    dialog.showModal();

		dialog.querySelector('.confirm').addEventListener('click', () => {
      dialog.close();
			GoogleDriveHandler.deleteImageFromDrive(id);
    });

    dialog.querySelector('.cancel').addEventListener('click', () =>
		  dialog.close());
	},

	addConfirmationText: function(id, name) {
		$('#confirmation-text').html(`
			<ul>
			  <li>You are about to delete image: ${name}
				<li>(ID: ${id})</li>
			  <li>The image will be permanently deleted</li>
			  <li>
				  (It will <strong>NOT</strong> be placed in
					your Google Drive trashbin).
				</li>
			</ul>
			<p>Are you really sure?</p>
		`);
	},

	/**
   * Permanently delete an image, skipping the trash.
   *
   * @param {String} id ID of the image to delete.
   */
 	deleteImageFromDrive: function(id) {
 		document.body.className = 'cursor-wait';

 	  const request = gapi.client.drive.files.delete({
       'fileId': id
    });

    request.execute(response => {
 		  if (!response.hasOwnProperty('code')) {
 			  GoogleDriveHandler.requestImages();
 				Toast.showSuccess(GoogleDriveHandler.removeSuccessMessage);
 			} else {
			  Message.show(`
				  An error occurred! Image couldn't be deleted.
					Details: ${response.code}: ${response.message}`,
					'user-message-error'
				);
 			}
 		  document.body.className = 'cursor-default';
 		});
 	},

	addActionButtons: function(imageID, newURL) {
		GoogleDriveHandler.addDownloadButton(imageID, newURL);
		GoogleDriveHandler.addUploadButton(imageID, newURL);
	},

	addDownloadButton: function(id, url) {
		const actionsField = $(`#actions-for-${id}`);
		actionsField.append(`
			<a href="${url}" download>
				<i alt="Download edited ${id}"
				   title="Download edited image"
					 aria-label="Download edited image"
				   class="material-icons animated flash">
				  file_download
				</i>
			</a>
		`);
	},

	addUploadButton: function(id, url) {
		const actionsField = $(`#actions-for-${id}`);
		actionsField.append(`
			<i alt="Upload edited ${id}"
			   title="Upload edited image"
				 aria-label="Upload edited image"
			   class="material-icons"
			   onclick="GoogleDriveHandler.getImageFromAmazon(\'${url}\')">
			  cloud_upload
			</i>
		`);
	},

	getImageFromDrive: function(id) {
		// Save ID to be able to get it from AviaryHandler onSave.
		GoogleDriveHandler.lastEditedImageID = id;
		// In case an earlier user message has been shown.
		Message.remove();

		const accessToken = gapi.auth.getToken().access_token;
		const url = `https://www.googleapis.com/drive/v3/files/${id}?alt=media`;
		const xhr = new XMLHttpRequest();

		xhr.onloadend = () => {
			const reader = new FileReader();
			reader.onload = () => {
        GoogleDriveHandler.setCurrentImageName(id);
				AviaryHandler.launchEditor(id, reader.result);
			};
			reader.readAsDataURL(xhr.response);
		};

		xhr.onerror = () =>
			Message.show(GoogleDriveHandler.driveErrorMessage, 'user-message-error');

		xhr.open('GET', url);
		xhr.responseType = 'blob';
		xhr.setRequestHeader('Authorization', `Bearer ${accessToken}`);
		xhr.send();
	},

	/**
	 * Aviary photo editor saves image temporarily on Amazon server.
	 */
	getImageFromAmazon: function(url) {
		const xhr = new XMLHttpRequest();

		xhr.onload = () =>
			GoogleDriveHandler.postImageToDrive(xhr.response);

		xhr.onerror = () =>
			Message.show(GoogleDriveHandler.amazonErrorMessage, 'user-message-error');

		xhr.open('GET', url);
		xhr.responseType = 'blob';
		xhr.send();
	},

	postImageToDrive: function(fileData, callback) {
		/* Indicate image is being uploaded
		   to avoid user pressing anything. */
		document.body.className = 'cursor-wait';

		const boundary = '-------314159265358979323846';
    const delimiter = `\r\n--${boundary}\r\n`;
    const close_delim = `\r\n--${boundary}--`;
		const reader = new FileReader();

		reader.readAsBinaryString(fileData);
		reader.onload = () => {
			const base64Data = btoa(reader.result);
			const metadata = {
				'title': GoogleDriveHandler.currentImageName,
				'mimeType': fileData.type
		  };

			const multipartRequestBody =
				delimiter +
				'Content-Type: application/json\r\n\r\n' +
				JSON.stringify(metadata) +
				delimiter +
				'Content-Type: ' + fileData.type + '\r\n' +
				'Content-Transfer-Encoding: base64\r\n' +
				'\r\n' +
				base64Data +
				close_delim;

			const request = gapi.client.request({
        'path': '/upload/drive/v3/files?uploadType=multipart',
				'method': 'POST',
        'headers': {
          'Content-Type': `multipart/related; boundary="${boundary}"`
        },
        'body': multipartRequestBody
			});

			if (!callback) {
        callback = file => {
					if (file) {
						Toast.showSuccess(GoogleDriveHandler.uploadSuccessMessage);
						// Request and render all images again to show the newly uploaded one.
						GoogleDriveHandler.requestImages();
					} else {
						Message.show(GoogleDriveHandler.uploadErrorMessage, 'user-message-error');
					}
					document.body.className = 'cursor-default';
      	};
    	}
			request.execute(callback);
		};
	},

	setCurrentImageName: function(imageID) {
		let imageName = GoogleDriveHandler.currentImageName;
		const images = GoogleDriveHandler.imageArray;
		const image = images.find(image => image.id == imageID);
		imageName = image.originalFilename;

		if (!image.originalFilename.match(/_Edited/g)) {
			imageName = imageName.substr(0, imageName.lastIndexOf('.')) || imageName;
			imageName += '_Edited';
		}
		GoogleDriveHandler.currentImageName = imageName;
	}

};

window.onload = GoogleDriveHandler.init();
