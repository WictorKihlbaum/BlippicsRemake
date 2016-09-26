
class SelfieHandler {

  static init() {
    this.setupVariables();
    if (this.isBrowserSupported()) {
      this.requestCamera();
      this.setupButtons();
    } else {
      this.displayErrorMessage(`
        Your browser doesn't have support for
        the navigator.getUserMedia interface.
      `);
    }
  }

  static setupVariables() {
    this.video = $('#camera-stream')[0];
    this.image = $('#snap')[0];
    this.startCameraButton = $('#start-camera')[0];
    this.controls = $('.controls')[0];
    this.takePhotoButton = $('#take-photo')[0];
    this.deletePhotoButton = $('#delete-photo')[0];
    this.downloadPhotoButton = $('#download-photo')[0];
    this.errorMessage = $('#error-message')[0];
    this.snap = null;
  }

  static isBrowserSupported() {
    // The getUserMedia interface is used for handling camera input.
    // Some browsers need a prefix so here we're covering all the options
    navigator.getMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia;

    if (navigator.getMedia) return true;
    return false;
  }

  static requestCamera() {
    navigator.getMedia(
      {
        video: true
      },
      // Success Callback
      stream => {
        // Create an object URL for the video stream and
        // set it as src of our HTLM video element.
        this.video.src = window.URL.createObjectURL(stream);
        // Play the video element to start the stream.
        this.video.play();
        this.video.onplay = () => {
          this.showVideo();
        };
      },
      // Error Callback
      error => {
        console.log(error);
        this.displayErrorMessage(`
          There was an error with accessing
          the camera stream: ${err.name}`, error
        );
      }
    );
  }

  static setupButtons() {
    this.setupStartCameraButton();
    this.setupTakePhotoButton();
    this.setupDeletePhotoButton();
  }

  static setupStartCameraButton() {
    // Mobile browsers cannot play video without user input,
    // so here we're using a button to start it manually.
    this.startCameraButton.addEventListener('click', e => {
      e.preventDefault();
      // Start video playback manually.
      this.video.play();
      this.showVideo();
    });
  }

  static setupTakePhotoButton() {
    this.takePhotoButton.addEventListener('click', e => {
      e.preventDefault();
      this.snap = this.takeSnapshot();
      // Show image.
      this.image.setAttribute('src', this.snap);
      this.image.classList.add('visible');
      // Enable delete and save buttons
      this.deletePhotoButton.classList.remove('disabled');
      this.downloadPhotoButton.classList.remove('disabled');
      // Set the href attribute of the download button to the snap url.
      this.downloadPhotoButton.href = this.snap;
      // Pause video playback of stream.
      this.video.pause();
    });
  }

  static setupDeletePhotoButton() {
    this.deletePhotoButton.addEventListener('click', e => {
      e.preventDefault();
      // Hide image.
      this.image.setAttribute('src', '');
      this.image.classList.remove('visible');
      // Disable delete and save buttons
      this.deletePhotoButton.classList.add('disabled');
      this.downloadPhotoButton.classList.add('disabled');
      // Resume playback of stream.
      this.video.play();
    });
  }

  static showVideo() {
    // Display the video stream and the controls.
    this.hideUI();
    this.video.classList.add('visible');
    this.controls.classList.add('visible');
  }

  static takeSnapshot() {
    // Here we're using a trick that involves a hidden canvas element.
    let hidden_canvas = document.querySelector('canvas'),
        context = hidden_canvas.getContext('2d');

    let width = this.video.videoWidth,
        height = this.video.videoHeight;

    if (width && height) {
      // Setup a canvas with the same dimensions as the video.
      hidden_canvas.width = width;
      hidden_canvas.height = height;
      // Make a copy of the current frame in the video on the canvas.
      context.drawImage(this.video, 0, 0, width, height);
      // Turn the canvas image into a dataURL that can be used as a src for our photo.
      return hidden_canvas.toDataURL('image/png');
    }
  }

  // Remove later.
  static displayErrorMessage(error_msg, error) {
    error = error || '';
    if (error) {
      console.error(error);
    }

    this.errorMessage.innerText = error_msg;
    this.hideUI();
    this.errorMessage.classList.add('visible');
  }

  static hideUI() {
    // Helper function for clearing the app UI.
    this.controls.classList.remove('visible');
    this.startCameraButton.classList.remove('visible');
    this.video.classList.remove('visible');
    this.errorMessage.classList.remove('visible');
  }

}

window.onload = SelfieHandler.init();
