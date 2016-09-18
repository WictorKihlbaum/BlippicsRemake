<?php

declare(strict_types = 1);

class AboutView {

	function __construct() {
		// Empty.
	}

	public function response() : string {
		return '
			<h1 class="mdl-typography--display-3 mdl-color-text--primary page-topic">
				About
			</h1>

			<div class="quote">
	  	  <div id="about-text">
				  <p class="mdl-typography--display-2">
					  Blippics was initially the product of a final project in one of my previously
						courses at Linnaeus university. Blippics has however been undergoing several
						updates ever since and still is. The main idea with the Blippics site
						is to offer you the tools you need to edit your desired images.
						This application gives you the chance to edit your images from
						your computer, Google Drive, Dropbox and OneDrive. When you are
						done editing you can choose to either download the image or upload
						it to the cloud of the choosen service.
					</p>

					<p class="mdl-typography--display-2">
						I hope you enjoy this site as much I did making it.
					</p>

					<p class="mdl-typography--display-2">
						Happy editing!
					</p>

					<p class="mdl-typography--display-2">
						<span id="worth-noting">Worth noting</span>
						The photo editor can open images in all resolutions.
						However, by default, the photo editor works on a medium resolution
						image in order to speed up the performance of the editor.
						This means it will save a high-res image in lower quality.
					</p>
				</div>
			</div>
		';
	}

}
