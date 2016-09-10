<?php

declare(strict_types = 1);

class EditDropboxView {

	function __construct() {
		// Empty.
	}

	public function response() : string {
		return '
      <h1>Edit image on Dropbox</h1>
			<h2>Under development</h2>

			<!-- Response messages will be shown here. -->
			<span id="user-message-field"></span>

			<div id="container">
				<button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
								onclick="Dropbox.choose(DropboxHandler.getButtonOptions())">
					<i class="material-icons">
						photo
					</i>
					Choose a Dropbox image
				</button>

        <div>
          <img src="" id="dropbox-image" />
				</div>

				<p>
					<!-- Download (added from "AviaryEditor.js") -->
        	<span id="download-button-field"></span>
        </p>

			</div>
    ';
  }

}
