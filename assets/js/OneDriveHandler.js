'use strict';

const OneDriveHandler = {

  // TODO: Validate file extension for choosen file.

  uploadMessage: 'Image was successfully uploaded to your OneDrive!',


  init: () => {
    $('#progress-container').hide();
  },

  launchOneDrivePicker: () => {
    const odOptions = {
      clientId: "c3e33c0d-c915-4e56-bbb5-52c74f7d040e",
      action: "download",
      advanced: {
        redirectUri: "http://localhost:8888/" // TODO: Change in production.
      },
      success: files => {
        console.log(files.value[0]);
        const url = files.value[0]['@microsoft.graph.downloadUrl'];
        $('#onedrive-image').attr('src', url);
        $('#onedrive-choose-button').html('Choose another OneDrive image');
        OneDriveHandler.removeActionButtons();
        OneDriveHandler.addEditButton(url);
      },
      error: errorMessage => {
        Message.show(errorMessage, 'user-message-error');
      }
    };
    OneDrive.open(odOptions);
  },

  addSaverButton: url => {
    $('#saver-container').html(`
      <button onclick="OneDriveHandler.launchOneDriveSaver('${url}')">
        Save image to OneDrive
      </button>
    `);
  },

  launchOneDriveSaver: url => {
    const odOptions = {
      clientId: "c3e33c0d-c915-4e56-bbb5-52c74f7d040e",
      action: "save",
      sourceUri: url,
      fileName: "", // TODO: Change. Maybe let user choose?
      openInNewWindow: true,
      advanced: {},
      success: files => {
        OneDriveHandler.showSuccessMessage(OneDriveHandler.uploadMessage);
        $('#progress-container').hide();
      },
      progress: p => {
        $('#progress-container').show();
      },
      cancel: () => {
        // Empty.
      },
      error: errorMessage => {
        Message.show(errorMessage, 'user-message-error');
      }
    };
    OneDrive.save(odOptions);
  },

  showSuccessMessage: message => {
		const snackbarContainer = $('#success-toast')[0];
		const data = {
			message: message,
			timeout: 10000
		};
		snackbarContainer.MaterialSnackbar.showSnackbar(data);
	},

  removeActionButtons: () => {
    $('#download-button').remove();
    $('#saver-container').html('');
  },

  addEditButton: url => {
    $('#edit-button-field').html(`
      <a href="#"
         id="edit-button"
         onclick="AviaryHandler.launchEditor('onedrive-image', '${url}')"
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

window.onload = OneDriveHandler.init();
