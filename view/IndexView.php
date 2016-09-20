<?php

declare(strict_types = 1);

class IndexView {

	private static $editGoogleDriveURL = 'editgoogledrive';
  private static $editLocalURL = 'editlocal';
	private static $editDropboxURL = 'editdropbox';
	private static $editOneDriveURL = 'editonedrive';
	private static $selfieURL = 'selfie';


	function __construct() {
		// Empty.
	}

	public function response() : string {
		return '
			<div class="mdl-grid" id="index-grid">
			  <div class="mdl-cell mdl-cell--4-col index-cell animated rotateIn">
				  <div id="local-cell-content">
				  	<span class="hint--bottom" aria-label="Edit image on computer">
					  	<a href="?'.self::$editLocalURL.'" class="hvr-bob">
					  	  <img src="./assets/img/laptop.png"
					  	       alt="Edit image on computer"
					  	       id="computer-image-button"
										 class="animated zoomInDown" />
					  	</a>
				  	</span>
					</div>
			  </div>
				<div class="mdl-cell mdl-cell--4-col index-cell animated rotateIn">
				  <div id="googledrive-cell-content">
				  	<span class="hint--bottom" aria-label="Edit image on Google Drive">
						  <a href="?'.self::$editGoogleDriveURL.'" class="hvr-bob">
						    <img src="./assets/img/drive_logo.png"
						         alt="Edit image on Google Drive"
						         id="drive-logo-button"
										 class="animated zoomInDown" />
						  </a>
					  </span>
					</div>
			  </div>
				<div class="mdl-cell mdl-cell--4-col index-cell animated rotateIn">
				  <div id="dropbox-cell-content">
				  	<span class="hint--bottom" aria-label="Edit image on Dropbox">
					  	<a href="?'.self::$editDropboxURL.'" class="hvr-bob">
					  	  <img src="./assets/img/dropbox_logo.png"
					  	       alt="Edit image on Dropbox"
					  	       id="dropbox-image-button"
										 class="animated zoomInDown" />
					  	</a>
				  	</span>
					</div>
			  </div>
				<div class="mdl-cell mdl-cell--4-col index-cell animated rotateIn">
				  <div id="onedrive-cell-content">
				  	<span class="hint--bottom" aria-label="Edit image on OneDrive">
					  	<a href="?'.self::$editOneDriveURL.'" class="hvr-bob">
					  	  <img src="./assets/img/onedrive_logo.png"
					  	       alt="Edit image on OneDrive"
					  	       id="onedrive-image-button"
										 class="animated zoomInDown" />
					  	</a>
				  	</span>
					</div>
			  </div>
				<div class="mdl-cell mdl-cell--4-col index-cell animated rotateIn">
				  <div id="selfie-cell-content">
				  	<span class="hint--bottom" aria-label="Take selfie">
					  	<a href="?'.self::$selfieURL.'" class="hvr-bob">
					  	  <img src="./assets/img/selfie.png"
					  	       alt="Take selfie"
					  	       id="selfie-image-button"
										 class="animated zoomInDown" />
					  	</a>
				  	</span>
					</div>
			  </div>
			</div>
		';
	}

}
