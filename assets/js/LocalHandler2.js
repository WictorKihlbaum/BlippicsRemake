
class LocalHandler {

	static init() {
    this.dropArea = $("#dropzone");
  	this.preview = $('#editable-image');
  	this.fileInput = $('#input');
  	this.defaultImagePath = 'assets/img/placeholder_image.png';
  	this.invalidImageError = `
  		Invalid file! The file has to be a
      Png or Jpg/Jpeg image. Please try again.
  	`;
		this.setupDroparea();
	}

	static setupDroparea() {
		// Prevent defaults on drag/drop events.
		this.dropArea.on('drag dragstart dragend dragover dragenter dragleave drop', e => {
			if (e.preventDefault) e.preventDefault();
			if (e.stopPropagation) e.stopPropagation();
		})
		.on('click', e => {
			// Click anywhere in Droparea to upload file.
		  this.fileInput.click();
		})
		.on('dragover', e => {
			this.dropArea.css('background-color', '#E4F1FE');
		})
		.on('dragleave', e => {
			this.dropArea.css('background-color', 'white');
		})
		.on('drop', e => {
			this.dropArea.css('background-color', 'white');
			// Get the dropped file.
			const file = e.originalEvent.dataTransfer.files[0];
			this.handleFile(file);
		});
		// Takes file from file chooser.
		this.fileInput.on('change', e => {
			const file = e.originalEvent.target.files[0];
			this.handleFile(file);
		});
	}

	static handleFile(file) {
		if (this.isValidImageFormat(file)) {
			// In case an earlier message has been shown.
			Message.remove();
			ActionButtons.removeButtons();

			if (file) {
				this.createFileReader(file);
			} else {
				this.resetPreview();
				ActionButtons.removeButtons();
			}
		} else {
			Message.show(this.invalidImageError, 'user-message-error');
			this.resetPreview();
			ActionButtons.removeButtons();
		}
	}

	static createFileReader(file) {
		const reader = new FileReader();
		reader.onload = () => {
			this.hideSpinner();
			this.updatePreview(reader.result);
			ActionButtons.addEditButton(reader.result);
		};
		reader.onprogress = () => {
			this.showSpinner();
		};
		reader.onerror = error => {
			Message.show(error, 'user-message-error');
		};
		reader.readAsDataURL(file);
	}

	static isValidImageFormat(file) {
		// Adobe Aviary photo editor only supports Png and Jpg/Jpeg.
		return ['image/png', 'image/jpg', 'image/jpeg'].includes(file.type);
	}

	static updatePreview(result) {
		this.preview.attr('src', result);
	}

	static resetPreview() {
		this.preview.attr('src', this.defaultImagePath);
	}

	static showSpinner() {
		$('.spinner').removeClass('is-hidden');
	}

	static hideSpinner() {
		$('.spinner').addClass('is-hidden');
	}

}

window.onload = LocalHandler.init();
