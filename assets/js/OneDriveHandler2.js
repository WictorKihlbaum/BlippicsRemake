
class OneDriveHandler {

  // TODO: Validate file extension for choosen file.
  // Microsoft doesn't give this functionality. Keep updated on this!

  static launchOneDrivePicker() {
    const odOptions = {
      clientId: "c3e33c0d-c915-4e56-bbb5-52c74f7d040e",
      action: "download",
      advanced: {
        redirectUri: this.getRedirectUri()
      },
      success: files => {
        const url = files.value[0]['@microsoft.graph.downloadUrl'];
        $('#editable-image').attr('src', url);
        ActionButtons.removeButtons();
        ActionButtons.addEditButton(url);
      },
      error: errorMessage => {
        Message.show(errorMessage, 'user-message-error');
      }
    };
    OneDrive.open(odOptions);
  }

  static getRedirectUri() {
    if (window.location.origin.match('localhost')) {
      return 'http://localhost:8888/'; // Developer
    }
    return 'https://www.blippics.com/'; // Production
  }

  static launchOneDriveSaver(url) {
    const odOptions = {
      clientId: "c3e33c0d-c915-4e56-bbb5-52c74f7d040e",
      action: "save",
      sourceUri: url,
      fileName: "testImage.png", // TODO: Get name from API file picker.
      openInNewWindow: true,
      advanced: {},
      success: files => {
        const message = 'Image was successfully uploaded to your OneDrive!';
        Toast.showSuccess(message);
        $('.spinner').addClass('is-hidden');
        ActionButtons.reStyleSaveButton();
      },
      progress: progress => {
        $('.spinner').removeClass('is-hidden');
      },
      error: errorMessage => {
        Message.show(errorMessage, 'user-message-error');
      }
    };
    OneDrive.save(odOptions);
  }

}
