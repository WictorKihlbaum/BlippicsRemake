'use strict';

const DropboxHandler = {

  imageID: 'dropbox-image',


  init: () => {
    DropboxHandler.addChooserButton();
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

  getButtonOptions: () => {
    return {
      success: image => {
        DropboxHandler.getImageFromDropbox(image[0].link);
        $('#' + DropboxHandler.imageID).attr('src', image[0].link);
      },
      linkType: "direct",
      multiselect: false,
      extensions: ['.png', '.jpg', '.jpeg']
    };
  },

  getImageFromDropbox: url => {
		const xhr = new XMLHttpRequest();

    xhr.onloadend = () => {
      console.log(xhr.response);
      const reader = new FileReader();
      reader.onload = () => {
        AviaryEditor.launchEditor(DropboxHandler.imageID, reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };

		xhr.onerror = error =>
			Message.show(error, 'user-message-error');

		xhr.open('GET', url);
		xhr.responseType = 'blob';
		xhr.send();
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
