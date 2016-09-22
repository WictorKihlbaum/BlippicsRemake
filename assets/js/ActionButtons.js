
class ActionButtons {

  static addButtons(url) {
		this.addEditButton(url);
		this.addDownloadButton(url);
    // Add save button.
    const location = window.location.href;
    if (location.match('dropbox'))
      this.addSaveButtonDropbox(url);
    else if (location.match('onedrive'))
      this.addSaveButtonOneDrive(url);
	}

  static removeButtons() {
    $('#edit-button').remove();
    $('#download-button').remove();
    $('#save-button').remove();
  }

  static addEditButton(url) {
		$('#edit-button-field').html(`
			<a href="#"
			   id="edit-button"
			   onclick="AviaryHandler.launchEditor('editable-image', '${url}')"
				 aria-label="Edit image"
				 title="Edit image"
			   class="mdl-button
				        mdl-js-button
				        mdl-button--fab
				        mdl-button--primary
								animated bounceIn">
			  <i class="material-icons">
				  edit
				</i>
			</a>
		`);
	}

  static addDownloadButton(url) {
		$('#download-button-field').html(`
			<a href="${url}" download
			   id="download-button"
				 aria-label="Download image"
				 title="Download image"
			   class="mdl-button
				        mdl-js-button
				        mdl-button--fab
				        mdl-button--primary
								animated bounceIn">
			  <i class="material-icons">
				  file_download
				</i>
			</a>
		`);
	}

  static addSaveButtonDropbox(url) {
    $('#save-button-field').html(`
      <button class="mdl-button mdl-js-button mdl-button--fab mdl-button--primary has-hover"
              id="save-button"
              aria-label="Save image on Dropbox"
              title="Save image on Dropbox"
              onclick="Dropbox.save(DropboxHandler.getSaverOptions('${url}'))">
        <i class="material-icons" id="save-icon">
          cloud_upload
        </i>
      </button>
    `);
  }

  static addSaveButtonOneDrive(url) {
    $('#save-button-field').html(`
      <button class="mdl-button mdl-js-button mdl-button--fab mdl-button--primary has-hover"
              id="save-button"
              aria-label="Save image on OneDrive"
              title="Save image on OneDrive"
              onclick="OneDriveHandler.launchOneDriveSaver('${url}')">
        <i class="material-icons" id="save-icon">
          cloud_upload
        </i>
      </button>
    `);
  }

  static reStyleSaveButton() {
    const saveButton = $('#save-button');
    saveButton.attr('title', 'Image is saved');
    saveButton.attr('aria-label', 'Image is saved');
    saveButton.css('color', '#2196F3');
    saveButton.attr('disabled', true);
    $('#save-icon').html('done');
    saveButton.css('background-color');
    saveButton.removeClass('has-hover');
  }

};
