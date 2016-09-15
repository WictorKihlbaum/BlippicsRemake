'use strict';

const DropboxHandler = {

  uploadMessage: 'Image was successfully uploaded to your Dropbox!',


  init: function() {
    $('#progress-container').hide();
  },

  addSaverButton: function(url) {
    const options = {
      success: () => {
        $('#progress-container').hide();
        this.showSuccessMessage(this.uploadMessage);
      },
      progress: progress => {
        $('#progress-container').show();
      },
      error: errorMessage => {
        Message.show(errorMessage, 'user-message-error');
      }
    };
    const button = Dropbox.createSaveButton(url, options);
    $('#saver-container').html(button);
  },

  getButtonOptions: function() {
    return {
      success: image => {
        const url = image[0].link;
        $('#dropbox-image').attr('src', url);
        $('#dropbox-choose-button').html('Choose another Dropbox image');
        this.removeActionButtons();
        this.addEditButton(url);
      },
      linkType: "direct",
      multiselect: false,
      extensions: ['.png', '.jpg', '.jpeg']
    };
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
         onclick="AviaryHandler.launchEditor('dropbox-image', '${url}')"
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

window.onload = DropboxHandler.init();
