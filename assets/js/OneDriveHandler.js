'use strict';

const OneDriveHandler = {

  imageURL: null,


  launchOneDrivePicker: () => {
    const odOptions = {
      clientId: "c3e33c0d-c915-4e56-bbb5-52c74f7d040e",
      action: "download",
      advanced: {
        redirectUri: "http://localhost:8888"
      },
      success: files => {
        const url = files.value[0]['@microsoft.graph.downloadUrl'];
        OneDriveHandler.getImageFromOneDrive(url);
      },
      error: errorMessage => {
        console.log(errorMessage);
      }
    };
    OneDrive.open(odOptions);
  },

  addSaverButton: () => {
    $('#saver-container').html(`
      <button onclick="OneDriveHandler.launchOneDriveSaver()">
        Save image to OneDrive
      </button>
    `);
  },

  launchOneDriveSaver: () => {
    const odOptions = {
      clientId: "c3e33c0d-c915-4e56-bbb5-52c74f7d040e",
      action: "save",
      sourceUri: OneDriveHandler.imageURL,
      fileName: "testImage.png",
      openInNewWindow: true,
      advanced: {},
      success: function(files) {
        console.log(files);
      },
      progress: function(p) {
        console.log(p);
      },
      cancel: function() {
        console.log('User canceled');
      },
      error: function(errorMessage) {
        Message.show(`An error occurred! ${errorMessage}`);
      }
    };
    OneDrive.save(odOptions);
  },

  getImageFromOneDrive: url => {
		const xhr = new XMLHttpRequest();
    xhr.onloadend = () => {
      const reader = new FileReader();
      reader.onload = () => {
        $('#onedrive-image').attr('src', reader.result);
        $('#onedrive-choose-button').html('Choose another OneDrive image');
        OneDriveHandler.removeActionButtons();
        OneDriveHandler.addEditButton();
      }
      reader.readAsDataURL(xhr.response);
    };

		xhr.onerror = error =>
			Message.show(error, 'user-message-error');

		xhr.open('GET', url);
		xhr.responseType = 'blob';
		xhr.send();
	},

  removeActionButtons: () => {
    $('#download-button').remove();
    $('#saver-container').html('');
  },

  addEditButton: () => {
    $('#edit-button-field').html(`
      <a href="#"
         id="edit-button"
         onclick="AviaryHandler.launchEditor('onedrive-image')"
         class="mdl-button
                mdl-button--raised
                mdl-js-ripple-effect
                mdl-button--primary">
         <i class="material-icons">
           edit
         </i>
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
			  <i class="material-icons">
				  file_download
				</i>
		    Download image
			</a>
		`);
	}

};
