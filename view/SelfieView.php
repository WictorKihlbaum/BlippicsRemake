<?php

declare(strict_types = 1);

class SelfieView {

	function __construct() {
    // Empty.
	}

	public function response() : string {
		return '
		  <h1 class="mdl-typography--display-3 mdl-color-text--primary page-topic">
			  Take a selfie
		  </h1>

			<div class="container">
				<div class="app">

					<a href="#" id="start-camera" class="visible">
					  Touch here to start the app.
					</a>
					<video id="camera-stream"></video>
					<img id="snap" />

					<p id="error-message"></p>

					<div class="controls">
						<a href="#" id="delete-photo" title="Delete Photo" class="disabled">
						  <i class="material-icons">
							  delete
							</i>
						</a>
						<a href="#" id="take-photo" title="Take Photo">
						  <i class="material-icons">
							  camera_alt
							</i>
						</a>
						<a href="#" id="download-photo" download="selfie.png" title="Save Photo" class="disabled">
						  <i class="material-icons">
							  file_download
							</i>
						</a>
					</div>

					<!-- Hidden canvas element. Used for taking snapshot of video. -->
					<canvas></canvas>

				</div>
			</div>
		';
  }

}
