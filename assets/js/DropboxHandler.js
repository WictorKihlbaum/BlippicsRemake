'use strict';

const DropboxHandler = {

  init: () => {
    //DropboxHandler.addChooserButton();
    //DropboxHandler.addSaverButton();
  },

  addChooserButton: () => {
    const options = DropboxHandler.getButtonOptions();
    $('#container').append(`
      <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
              onclick="Dropbox.choose(${DropboxHandler.getButtonOptions})">
        <i class="material-icons">
          photo
        </i>
        Choose a Dropbox image
      </button>
    `);
  },

  addSaverButton: url => {
    const options = {
      success: () => {
          alert("Success! Files saved to your Dropbox.");
      },
      progress: progress => {
        console.log(progress);
      },
      error: errorMessage => {
        Message.show(errorMessage, 'user-message-error');
      }
    };
    const button = Dropbox.createSaveButton(url, options);
    $('#saver-container').html(button);
  },

  getButtonOptions: () => {
    return {
      success: image => {
        const url = image[0].link;
        DropboxHandler.getImageFromDropbox(url);
      },
      linkType: "direct",
      multiselect: false,
      extensions: ['.png', '.jpg', '.jpeg']
    };
  },

  getImageFromDropbox: url => {
		const xhr = new XMLHttpRequest();
    xhr.onloadend = () => {
      const reader = new FileReader();
      reader.onload = () => {
        $('#dropbox-image').attr('src', reader.result);
        $('#dropbox-choose-button').html('Choose another Dropbox image');
        DropboxHandler.removeActionButtons();
        DropboxHandler.addEditButton();
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
         onclick="AviaryHandler.launchEditor('dropbox-image')"
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

//window.onload = DropboxHandler.init();
