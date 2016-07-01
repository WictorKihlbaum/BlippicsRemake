/* This JS-file handles events connected to 'driveimage.html' */
'use strict';

const DriveClass = {

	//pagination: null,
	imageArray: [],
	imageList: null,
	currentImageName: '',
	CLIENT_ID: '788591829115-1uq193qnm8r72ujqej7l3hdj558hj7ej.apps.googleusercontent.com',
	SCOPES: ['https://www.googleapis.com/auth/drive'],
	
			  
	init: () => {
		DriveClass.addEventEventListener();
		// Reset list.
		DriveClass.imageList = $('#image-list');
		DriveClass.imageList.html('');
		//DriveClass.pagination = $('.pagination-page');
	},

	setupPagination: () => {
		const items = $('#image-list li'); // Change li.
		const numItems = items.length;
		const perPage = 8;

		// Only show the first 8 items initially.
		items.slice(perPage).hide();

		$(".pagination-page").pagination({
			items: numItems,
			itemsOnPage: perPage,
			cssStyle: 'custom-theme',
			onPageClick: pageNumber => {
				// Someone changed page, lets hide/show li-tags appropriately.
				const showFrom = perPage * (pageNumber - 1);
				const showTo = showFrom + perPage;
				// First hide everything, then show for the new page.
				items.hide().slice(showFrom, showTo).show();
			}
		});

		const checkFragment = () => {
			// If there's no hash, make sure to go to page 1.
			let hash = window.location.hash || '#page-1';
			// Use regex to check the hash string
			hash = hash.match(/^#page-(\d+)$/);
			if (hash) $("#pagination").pagination('selectPage', parseInt(hash[1]));
		};

		// Call this function whenever the back/forward is pressed.
		$(window).bind('popstate', checkFragment);
		checkFragment();
	},
	
	addEventEventListener: () => {
		$('#close-info-message').click(DriveClass.closeWindow);
	},
	
	addDownloadButton: (id, url) => {
		const buttonField = $(`#${id}-edited`);
		buttonField.html(`<a href="${url}" download
			class="button-class button-size-small download-button">Download edited</a>`);
	},
	
	addUploadButton: (id, url) => {
		const buttonField = $('#' + id + '-upload');
		buttonField.html('<a href="#" ' +
			'class="button-class button-size-small upload-button" ' +
			'onclick="DriveClass.getImageFromAmazon(\''+url+'\')">Upload to Drive</a>');
	},
	
	closeWindow: () => {
		const infoWindow = $('#need-to-login-text');
		infoWindow.attr('class', 'fadeout');
		setTimeout(() =>
			infoWindow.css('display', 'none'), 500);
	},
		
	/**
	 * Check if current user has authorized this application.
	 */
	checkAuth: () => {
		gapi.auth.authorize(
			{
				'client_id': DriveClass.CLIENT_ID,
				'scope': DriveClass.SCOPES.join(' '),
				'immediate': true
		  	}, DriveClass.handleAuthResult);
	},
	
	/**
	 * Handle response from authorization server.
	 *
	 * @param {Object} authResult Authorization result.
	 */
	handleAuthResult: authResult => {
		if (authResult && !authResult.error) {
			$('#top-text').css('display', 'none');
			DriveClass.loadDriveApi();
		} else {
			$('#top-text').css('display', 'block');
		}
	},
	
	/**
	 * Load Drive API client library.
	 */
	loadDriveApi: () => {
		gapi.client.load('drive', 'v2', DriveClass.listImages);
	},
	
	/**
	 * Render images.
	 */
	listImages: () => {
		// Show loading animation while images are being loaded.
		$('#loading-animation').attr('class', 'loading-show');
		DriveClass.imageList.html('');
		
		const request = gapi.client.drive.files.list({
			'maxResults': 100, // Change this if you want to get more images.
			'orderBy': 'createdDate desc'
		});
	
		request.execute(resp => {
			const files = resp.items;
			DriveClass.imageArray = files;

			if (files && files.length > 0) {
				for (let file of files) {
					// Only list images in these formats.
					if (file.mimeType === 'image/png' ||
						file.mimeType === 'image/jpg' ||
						file.mimeType === 'image/jpeg') {

						DriveClass.renderListElement(file);
					}
				}

			} else {
				// Tell user if no images (Png, Jpg/Jpeg) are found on Google Drive.
				$('#top-text').html(`No valid images (Png, Jpg/Jpeg) found in your Google Drive`);
			}

			$('#loading-animation').attr('class', 'loading-hide');
			//DriveClass.setupPagination();
		});
	},

	renderListElementOld: image => {
		DriveClass.imageList.append(`
			<li>
				<div class="thumbnail-frame">
				<span class="helper"></span>

				<img id="${image.id}"
					class="thumbnail-image"
					src="${image.thumbnailLink}"
					alt="${image.originalFilename}"
					onclick="Fullscreen.showFullScreen(\'${image.id}\', \'${image.webContentLink}\')"
					title="Click to preview in fullscreen" />
				</div>

				<span class="image-name">${image.originalFilename}</span>

				<a href="#"
					class="button-class button-size-small edit-button"
					onclick="DriveClass.getImageFromDrive(\'${image.id}\', \'${image.downloadUrl}\')">Edit</a>

				<a href="${image.webContentLink}" download
					class="button-class button-size-small download-button">Download original</a>

				<span id="${image.id}-edited"></span>
				<div id="${image.id}-upload"></div>
			</li>
		`);
	},

	renderListElement: image => {
		DriveClass.imageList.append(`
			<div class="card-image mdl-card mdl-shadow--2dp mdl-cell mdl-cell--3-col" style="background: url('${image.thumbnailLink}') center / cover">
				<div class="mdl-card__title mdl-card--expand"></div>
				<div class="mdl-card__actions mdl-typography--text-right">
					<span class="card-image__filename">${image.originalFilename}</span>
					<button id="${image.id}" class="mdl-button mdl-js-button mdl-button--icon">
						<i class="material-icons">more_vert</i>
					</button>
					<ul class="mdl-menu mdl-menu--top-right mdl-js-menu mdl-js-ripple-effect" data-mdl-for="${image.id}">
						<li class="mdl-menu__item">
							Download
						</li>
					  	<li class="mdl-menu__item">
					  		Edit
					  	</li>
					</ul>
				</div>
			</div>
		`);
	},

	getImageFromDrive: (id, downloadURL) => {
		// In case an earlier success message has been shown.
		Message.removeSuccessMessage();
		Message.removeUserMessage();
			
		if (downloadURL) {
			// Get access token.
			const accessToken = gapi.auth.getToken().access_token;
			const xhr = new XMLHttpRequest();

			xhr.onload = () => {
				const reader = new FileReader();

				reader.onloadend = () => {
					DriveClass.setCurrentImageName(id);
					AviaryDrive.launchEditor(id, reader.result);
				};
				reader.readAsDataURL(xhr.response);
			};
				
			xhr.onerror = () => {
				const message = 'Error! Could not get image from Google Drive.';
				Message.showErrorMessage(message);
				Message.showUserMessage(message, 'user-message-error');
			};
				
			xhr.open('GET', downloadURL);
			xhr.responseType = 'blob';
			xhr.setRequestHeader('Authorization', `Bearer ${accessToken}`);
			xhr.send();
		}
	},
	
	// Aviary photo editor saves image temporarily on Amazon server.
	getImageFromAmazon: url => {
		const xhr = new XMLHttpRequest();
			
		xhr.onload = () => {
			// Post image to users Google Drive.
			DriveClass.postImageToDrive(xhr.response);
		};
			
		xhr.onerror = () => {
			// Show error message.
			console.log('Error! Could not get image from Amazons server.');
			const message = `An error occurred! Failed to get the edited image.
				Therefore an upload to Google Drive could not be done.`;
			Message.showErrorMessage(message);
			Message.showUserMessage(message, 'user-message-error');
		};
			
		xhr.open('GET', url);
		xhr.responseType = 'blob';
		xhr.send();	
	},
	
	postImageToDrive: (fileData, callback) => {
		/* Indicate image is being uploaded to Google Drive
		and to avoid user pressing anything. */
		document.body.className = 'cursor-wait';
  		
		const boundary = '-------314159265358979323846';
		const delimiter = "\r\n--" + boundary + "\r\n";
		const close_delim = "\r\n--" + boundary + "--";
	
		const reader = new FileReader();
		reader.readAsBinaryString(fileData);
		
		reader.onload = () => {
			const contentType = fileData.type || 'application/octet-stream';
			const metadata = {
				'title': DriveClass.currentImageName,
				'mimeType': contentType
			};
	
			const base64Data = btoa(reader.result);

			const multipartRequestBody =
				delimiter +
				'Content-Type: application/json\r\n\r\n' +
				JSON.stringify(metadata) +
				delimiter +
				'Content-Type: ' + contentType + '\r\n' +
				'Content-Transfer-Encoding: base64\r\n' +
				'\r\n' +
				base64Data +
				close_delim;
		
			const request = gapi.client.request({
				'path': '/upload/drive/v2/files',
				'method': 'POST',
				'params': {'uploadType': 'multipart'},
				'headers': {
				  'Content-Type': 'multipart/mixed; boundary="' + boundary + '"'
				},
				'body': multipartRequestBody});
				
			if (!callback) {
      			callback = file => {
					// Show success message.
					const message = `The image was successfully
						uploaded to your Google Drive!`;

					Message.showSuccessMessage(message);
					Message.showUserMessage(message, 'user-message-success');
					// List all images again to show the newly uploaded one.
					DriveClass.listImages();
					// Set cursor to default again when upload has finished.
					document.body.className = 'cursor-default';
      			};
				
    		} else {
				// Show error message.
				const message = 'The image failed to upload to your Google Drive!';
				Message.showErrorMessage(message);
				Message.showUserMessage(message, 'user-message-error');
				// Set cursor back to default again.
				document.body.className = 'cursor-default';
			}
			
			request.execute(callback);
		};
	},

	setCurrentImageName: imageID => {
		let imageName = DriveClass.currentImageName;
		const images = DriveClass.imageArray;

		for (let image of images) {
			if (imageID == image.id) {
				imageName = image.originalFilename;
				if (!image.originalFilename.match(/_Edited/g)) {
					imageName = imageName.substr(0, imageName.lastIndexOf('.')) || imageName;
					imageName += '_Edited';
				}
			}
		}
		DriveClass.currentImageName = imageName;
	}
	  
};

window.onload = DriveClass.init();