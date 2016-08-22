<?php

declare(strict_types = 1);

class EditLocalView {

	private static $indexURL = '';

	
	function __construct() {
		// Empty.
	}

	public function response() : string {
		return '
			<!-- TODO: Add an option to take a selfie with built in/connected camera. -->

    		<div id="editlocal-page-container">

				<button id="show-dialog"
						type="button"
						class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent">
					<i class="material-icons">help_outline</i>
					Show Help
				</button>

	    		<h1 class="mdl-typography--display-1 mdl-color-text--primary page-topic">
	    			Edit image on computer
	    		</h1>

				<!-- Response messages will be shown here. -->
				<div id="user-message"></div>

				<dialog class="mdl-dialog">
					<h4 class="mdl-dialog__title">Help</h4>
					<div class="mdl-dialog__content">
						<ul>
							<li>1. Press "Choose image" to choose which image you want to edit (Png or Jpg/Jpeg).</li>
							<li>2. Press "Edit image". The photo editor will automatically open.</li>
							<li>3. Press "Apply" in the upper-right corner, after you are done with each tool.</li>
							<li>4. Press "Save" in the upper-right corner when you are done and then close the editor.</li>
							<li>5. Press "Download image" to download your edited image to your computer.</li>
						</ul>
					</div>
					<div class="mdl-dialog__actions">
						<button type="button" class="mdl-button close">Close</button>
					</div>
				</dialog>

	    		<div id="image-container">
	                <div>
	                	<label for="input" class="label-class mdl-button mdl-button--raised mdl-button--primary">
	                		<i class="material-icons">image</i>
	                        Choose image
	                        <input type="file"
	                               id="input"
	                               onchange="LocalClass.handleFiles(this.files)"
	                               multiple accept="image/png, image/jpg, image/jpeg" />
	                    </label>
	                </div>
	                <div id="dropzone">
	                    <img src="./assets/img/placeholder_image.png"
							 alt="Preview of loaded image"
							 id="editable-image" />
                	</div>
            	</div>

				<p> 
					<!-- Edit (added from "LocalClass.js") -->
					<span id="edit-button-field"></span>
				</p>
	
				<p> 
					<!-- Download (added from "AviaryLocal.js") -->
        			<span id="download-button-field"></span>
        		</p>

				<p> 
					<!-- Go back -->
					<a href="?'.self::$indexURL.'"
					   id="go-back-button"
					   class="mdl-button
            		   		  mdl-js-button
            		   		  mdl-button--raised
            		   		  mdl-js-ripple-effect
            		   		  mdl-button--accent">
            		    <i class="material-icons">keyboard_arrow_left</i>
						Go back
					</a>
				</p>

        	</div>
		';
	}

}