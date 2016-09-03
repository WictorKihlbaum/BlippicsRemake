/* This JS-file handles events connected to 'editonline.html' */
'use strict';

const DriveClass = {

	pagination: null,
	imageArray: [],
	imageList: null,
	currentImageName: '',
	CLIENT_ID: '788591829115-1uq193qnm8r72ujqej7l3hdj558hj7ej.apps.googleusercontent.com',
	SCOPES: ['https://www.googleapis.com/auth/drive'],
	
			  
	init: () => {
		$('#loading-animation').hide();
		DriveClass.imageList = $('#image-list');
		DriveClass.pagination = $('.pagination-page');
	},

	setupPagination: amount => {
		const items = $('#image-list .mdl-card');
		const numItems = items.length;
		const perPage = amount || 8;

		// Only show the first "perPage" images initially.
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
			hash = hash.match(/^#page-(\d+)$/);
			if (hash) $("#pagination").pagination('selectPage', parseInt(hash[1]));
		};

		// Call this function whenever the back/forward is pressed.
		$(window).bind('popstate', checkFragment);
		checkFragment();
	},
	
	addDownloadButton: (id, url) => {
		const actionsField = $(`#actions-for-${id}`);
		actionsField.append(`
			<a href="${url}" download>
				<i alt="Download edited ${id}" 
				   title="Download edited image" 
				   class="material-icons">file_download</i>
			</a>
		`);
	},
	
	addUploadButton: (id, url) => {
		const actionsField = $(`#actions-for-${id}`);
		actionsField.append(`
			<i alt="Upload edited ${id}" 
			   title="Upload edited image" 
			   class="material-icons" 
			   onclick="DriveClass.getImageFromAmazon(\'${url}\')">cloud_upload</i>
		`);
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
            },
            DriveClass.handleAuthResult
        );
	},
	
	/**
	 * Handle response from authorization server.
	 *
	 * @param {Object} authResult Authorization result.
	 */
	handleAuthResult: authResult => {
		if (authResult && !authResult.error) {
            $('#need-to-login-text').hide();
            $('#top-text').hide();
            $('.g-signin2').hide();
			DriveClass.loadDriveApi();
		} else {
            $('#need-to-login-text').show();
            $('#top-text').show();
            $('.g-signin2').show();
		}
	},
	
	/**
	 * Load Drive API client library.
	 */
	loadDriveApi: () => {
		gapi.client.load('drive', 'v2', DriveClass.renderImages);
	},

	renderImages: () => {
		// Show loading animation while images are being loaded.
		$('#loading-animation').show();
		//DriveClass.imageList.html('');
		
		const request = gapi.client.drive.files.list({
			'maxResults': 100, // Change this to get more images.
			'orderBy': 'createdDate desc'
		});
	
		request.execute(resp => {
			const files = resp.items;
			DriveClass.imageArray = files;

			if (files && files.length > 0) {
				for (let file of files) {
					if (DriveClass.isValidImageFormat(file)) {
						DriveClass.renderImageElement(file);
					}
				}
			} else {
				$('#top-text').html('No valid images (Png, Jpg/Jpeg) found in your Google Drive.');
			}

			$('#loading-animation').hide();
			DriveClass.setupPagination();
		});
	},

	isValidImageFormat: file => {
		// Adobe Aviary photo editor only supports Png and Jpg/Jpeg.
		return ['image/png', 'image/jpg', 'image/jpeg'].includes(file.mimeType);
	},

	renderImageElement: image => {
		DriveClass.imageList.append(`
			<div class="mdl-card mdl-shadow--2dp mdl-cell mdl-cell--3-col" 
				 itemscope itemtype ="http://schema.org/ImageObject">
				<div class="mdl-card__title">
					<h2 class="mdl-card__title-text" itemprop="name">${image.originalFilename}</h2>
				</div>
				<div class="mdl-card__media">
					<img itemprop="thumbnail"
						 id="${image.id}"
						 src="${image.thumbnailLink}" 
						 class="card-thumbnails" 
						 alt="${image.originalFilename}"
						 onclick="Fullscreen.showFullScreen(\'${image.id}\', \'${image.webContentLink}\')"
						 title="Show in fullscreen">
				</div>
				<div class="mdl-card__actions" id="actions-for-${image.id}">

					<i alt="Edit ${image.originalFilename}" 
					   title="Edit image" 
					   class="material-icons" 
					   onclick="DriveClass.getImageFromDrive(\'${image.id}\', \'${image.downloadUrl}\')">edit</i>

				    <a href="${image.webContentLink}" download>
						<i alt="Download ${image.originalFilename} original" 
						   title="Download original image" 
						   class="material-icons">cloud_download</i>
					</a>

				</div>
			</div>
		`);
	},

	getImageFromDrive: (id, downloadURL) => {
		// In case an earlier message has been shown.
		Message.removeUserMessage();
			
		if (downloadURL) {
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
				Message.showUserMessage(message, 'user-message-error');
			};
				
			xhr.open('GET', downloadURL);
			xhr.responseType = 'blob';
			xhr.setRequestHeader('Authorization', `Bearer ${accessToken}`);
			xhr.send();

			/*
			$.ajax({
				url: downloadURL,
				type: 'GET',
				headers: {'Authorization': `Bearer ${accessToken}`},
				success: success => {
					console.log('success');
				},
				error: error => {
					console.log('Error');
				},
				done: hej => {
					console.log('hej');
				},
				dataType: 'blob'
			});
			*/
		}
	},
	
	// Aviary photo editor saves image temporarily on Amazon server.
	getImageFromAmazon: url => {
		const xhr = new XMLHttpRequest();

		xhr.onload = () => {
			DriveClass.postImageToDrive(xhr.response);
		};
		xhr.onerror = () => {
			const message = `
			    An error occurred! Failed to get the edited image.
				Therefore an upload to Google Drive could not be done.
			`;
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
        const delimiter = `\r\n--${boundary}\r\n`;
        const close_delim = `\r\n--${boundary}--`;
	
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

            const request = gapi.client.request(
                {
                    'path': '/upload/drive/v2/files',
                    'method': 'POST',
                    'params': {'uploadType': 'multipart'},
                    'headers': {
                        'Content-Type': `multipart/mixed; boundary="${boundary}"`
                    },
                    'body': multipartRequestBody
                }
            );
				
			if (!callback) {
      			callback = file => {
					DriveClass.showSuccessMessage();
					// Render all images again to show the newly uploaded one.
					DriveClass.renderImages();
					document.body.className = 'cursor-default';
      			};
    		} else {
				const message = 'The image failed to upload to your Google Drive!';
				Message.showUserMessage(message, 'user-message-error');
				document.body.className = 'cursor-default';
			}
			request.execute(callback);
		};
	},

	showSuccessMessage: () => {
		const snackbarContainer = document.querySelector('#success-toast');
		const data = {
			message: 'The image was successfully uploaded to your Google Drive',
			timeout: 7000
		};
		snackbarContainer.MaterialSnackbar.showSnackbar(data);
	},

	setCurrentImageName: imageID => {
		let imageName = DriveClass.currentImageName;
		const images = DriveClass.imageArray;
		const image = images.find(image => image.id == imageID);
		imageName = image.originalFilename;

		if (!image.originalFilename.match(/_Edited/g)) {
			imageName = imageName.substr(0, imageName.lastIndexOf('.')) || imageName;
			imageName += '_Edited';
		}
		DriveClass.currentImageName = imageName;
	}
	  
};

window.onload = DriveClass.init();