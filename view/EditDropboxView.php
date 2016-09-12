<?php

declare(strict_types = 1);

class EditDropboxView {

	function __construct() {
		// Empty.
	}

	public function response() : string {
		return '
      <h1>Edit image on Dropbox</h1>
			<h4>This page is under development</h4>
			<p>
			  <strong>
				  The functionality is pretty much done. The design is however NOT done.
				</strong>
			</p>

			<!-- Response messages will be shown here. -->
			<span id="user-message-field"></span>

			<div id="container">
				<button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
								onclick="Dropbox.choose(DropboxHandler.getButtonOptions())">
					<i class="material-icons">
					  photo
					</i>
					<span id="dropbox-choose-button">
					  Choose Dropbox image
					</span>
				</button>

        <div>
          <img src="" id="dropbox-image" />
				</div>

				<p>
					<!-- Edit (added from "DropboxHandler.js") -->
					<span id="edit-button-field"></span>
				</p>

				<p>
					<!-- Download (added from "AviaryHandler.js") -->
        	<span id="download-button-field"></span>
        </p>

				<p>
				  <span id="saver-container"></span>
				</p>

			</div>
    ';
  }

}
