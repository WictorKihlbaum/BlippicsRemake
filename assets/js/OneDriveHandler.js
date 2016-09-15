'use strict';

const OneDriveHandler = {

  // TODO: Validate file extension for choosen file.
  // Microsoft doesn't give this functionality. Keep updated on this!

  uploadMessage: 'Image was successfully uploaded to your OneDrive!',


  init: function() {
    $('#progress-container').hide();
  },

  launchOneDrivePicker: function() {
    const odOptions = {
      clientId: "c3e33c0d-c915-4e56-bbb5-52c74f7d040e",
      action: "download",
      advanced: {
        redirectUri: "http://localhost:8888/" // TODO: Change in production.
      },
      success: files => {
        const url = files.value[0]['@microsoft.graph.downloadUrl'];
        $('#onedrive-image').attr('src', url);
        this.removeActionButtons();
        this.addEditButton(url);
      },
      error: errorMessage => {
        Message.show(errorMessage, 'user-message-error');
      }
    };
    OneDrive.open(odOptions);
  },

  addSaverButton: function(url) {
    $('#saver-container').html(`
      <button onclick="OneDriveHandler.launchOneDriveSaver('${url}')">
        Save image to OneDrive
      </button>
    `);
  },

  launchOneDriveSaver: function(url) {
    const odOptions = {
      clientId: "c3e33c0d-c915-4e56-bbb5-52c74f7d040e",
      action: "save",
      sourceUri: url,
      fileName: "", // TODO: Change. Maybe let user choose?
      openInNewWindow: true,
      advanced: {},
      success: files => {
        this.showSuccessMessage(this.uploadMessage);
        $('#progress-container').hide();
      },
      progress: p => {
        $('#progress-container').show();
      },
      error: errorMessage => {
        Message.show(errorMessage, 'user-message-error');
      }
    };
    OneDrive.save(odOptions);
  },

  showSuccessMessage: function(message) {
		const snackbarContainer = $('#success-toast')[0];
		const data = {
			message: message,
			timeout: 10000
		};
		snackbarContainer.MaterialSnackbar.showSnackbar(data);
	},

  addActionButtons: function(url) {
    this.addEditButton(url);
		this.addDownloadButton(url);
	},

  removeActionButtons: function() {
    $('#download-button').remove();
    $('#saver-container').html('');
  },

  addEditButton: function(url) {
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

  addDownloadButton: function(url) {
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
