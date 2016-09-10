<?php

declare(strict_types = 1);

class EditOneDriveView {

	function __construct() {
		// Empty.
	}

	public function response() : string {
		return '
      <h1>Edit image on OneDrive</h1>
			<button onclick="OneDriveHandler.launchOneDrivePicker()">
			  Open from OneDrive
			</button>
    ';
  }

}
