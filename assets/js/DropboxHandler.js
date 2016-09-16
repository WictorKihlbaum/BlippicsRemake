'use strict';

const DropboxHandler = {

  image: null,
  uploadMessage: 'Image was successfully uploaded to your Dropbox!',


  getChooserOptions: function() {
    return {
      success: image => {
        const url = image[0].link;
        this.image = image[0];
        $('#editable-image').attr('src', url);
        ActionButtons.removeButtons();
        ActionButtons.addEditButton(url);
      },
      linkType: "direct",
      multiselect: false,
      extensions: ['.png', '.jpg', '.jpeg']
    };
  },

  getSaverOptions: function(url) {
    return {
      files: [{'url': `${url}`, 'filename': `${this.image.name}`}],
      success: () => {
        $('#spinner').removeClass('is-active');
        Toast.showSuccess(this.uploadMessage);
        ActionButtons.reStyleSaveButton();
      },
      progress: progress => {
        $('#spinner').addClass('is-active');
      },
      error: errorMessage => {
        Message.show(errorMessage, 'user-message-error');
      }
    };
  }

};
