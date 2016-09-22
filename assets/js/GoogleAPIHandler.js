
class GoogleAPIHandler {

  /**
	 * Check if current user has authorized GoogleDriveHandler application.
	 */
	static checkAuth() {
		gapi.auth.authorize({
      'client_id': GoogleDriveHandler.CLIENT_ID,
      'scope': GoogleDriveHandler.SCOPES.join(' '),
      'immediate': true
    }, GoogleDriveHandler.handleAuthResult);
	}

	/**
	 * Handle response from authorization server.
	 */
	static handleAuthResult(authResult) {
    if (authResult && !authResult.error) {
			GoogleDriveHandler.hideLoginElements();
			GoogleDriveHandler.loadDriveApi();
		} else {
			GoogleDriveHandler.showLoginElements();
		}
	}

  /**
	 * Load Drive API client library.
	 */
	static loadDriveApi() {
		gapi.client.load('drive', 'v3', GoogleDriveHandler.requestImages);
	}

  static requestImages() {
		// Show loading animation while images are being loaded.
		$('#loading-animation').show();
		GoogleDriveHandler.imageList.html('');

		const request = gapi.client.drive.files.list({
			'maxResults': 100, // Change to get more (max 1000).
      'fields': "files",
			'q': `mimeType = "image/png" or
			      mimeType = "image/jpg" or
						mimeType = "image/jpeg"`
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
			if (images.length > 8) {
				GoogleDriveHandler.setupPagination();
			}
		});
	}

  /**
   * Permanently delete an image, skipping the trash.
   *
   * @param {String} id ID of the image to delete.
   */
 	static deleteImageFromDrive(id) {
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
				  Image couldn't be deleted.
					Details: ${response.code}: ${response.message}`,
					'user-message-error'
				);
 			}
 		  document.body.className = 'cursor-default';
 		});
 	}

  static postImageToDrive(fileData, callback) {
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
	}

}
