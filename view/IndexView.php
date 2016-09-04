<?php

declare(strict_types = 1);

class IndexView {

	private static $editOnlineURL = 'editonline';
  	private static $editLocalURL = 'editlocal';


	function __construct() {
		// Empty.
	}

	public function response() : string {
		return '
			<div class="mdl-grid" id="index-grid">
			  <div class="mdl-cell mdl-cell--5-col mdl-cell--middle index-cell">
			  	<span class="hint--bottom" aria-label="Edit image on Google Drive">
					  <a href="?'.self::$editOnlineURL.'" class="hvr-bob">
					    <img src="./assets/img/drive_logo.png" width="47%"
					         alt="Edit image on Google Drive"
					         id="drive-logo-button" />
					  </a>
				  </span>
			  </div>
			  <div class="mdl-cell mdl-cell--5-col mdl-cell--middle index-cell">
			  	<span class="hint--bottom" aria-label="Edit image on computer">
				  	<a href="?'.self::$editLocalURL.'" class="hvr-bob">
				  	  <img src="./assets/img/laptop.png" width="60%"
				  	       alt="Edit image on computer"
				  	       id="computer-image-button" />
				  	</a>
			  	</span>
			  </div>
			</div>
		';
	}

}
