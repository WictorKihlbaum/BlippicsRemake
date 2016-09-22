
class DropboxHandler {

  static getChooserOptions() {
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
  }

  static getSaverOptions(url) {
    return {
      files: [{'url': `${url}`, 'filename': `${this.image.name}`}],
      success: () => {
        $('.spinner').addClass('is-hidden');
        const message = 'Image was successfully uploaded to your Dropbox!';
        Toast.showSuccess(message);
        ActionButtons.reStyleSaveButton();
      },
      progress: progress => {
        $('.spinner').removeClass('is-hidden');
      },
      error: errorMessage => {
        Message.show(errorMessage, 'user-message-error');
      }
    };
  }

}
