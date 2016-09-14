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

				<button type="button"
						    id="show-dialog"
						    class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent">
				  <i class="material-icons">
					  help_outline
					</i>
					Show Help
				</button>

	    	<h1 class="mdl-typography--display-1 mdl-color-text--primary page-topic">
	    	  Edit image on computer
	    	</h1>

				<!-- Response messages will be shown here. -->
				<span id="user-message-field"></span>

				<dialog class="mdl-dialog animated zoomIn">
					<h4 class="mdl-dialog__title">
						Help
					</h4>
					<div class="mdl-dialog__content">
						<ul class="mdl-list">
						  <li class="mdl-list__item">
							  <span class="mdl-list__item-primary-content">
						      <i class="material-icons mdl-list__item-icon" aria-label="Step one">
						    	  looks_one
						    	</i>
						    	Press "<strong>Choose image</strong>" to choose which image
									you want to edit (Png or Jpg/Jpeg).
								</span>
						  </li>
						  <li class="mdl-list__item">
						    <span class="mdl-list__item-primary-content">
						    	<i class="material-icons mdl-list__item-icon" aria-label="Step two">
						    		looks_two
						    	</i>
						    	Press "<strong>Edit image</strong>".
						    	The photo editor will automatically open.
						  	</span>
						  </li>
						  <li class="mdl-list__item">
						    <span class="mdl-list__item-primary-content">
						    	<i class="material-icons mdl-list__item-icon" aria-label="Step three">
						    		looks_3
						    	</i>
						    	Press "<strong>Apply</strong>" in the upper-right corner,
						    	after you are done with each tool.
						  	</span>
						  </li>
						  <li class="mdl-list__item">
						    <span class="mdl-list__item-primary-content">
						    	<i class="material-icons mdl-list__item-icon" aria-label="Step four">
						    		looks_4
						    	</i>
						    	Press "<strong>Save</strong>" in the upper-right corner
						    	when you are done and then close the editor.
						  	</span>
						  </li>
						  <li class="mdl-list__item">
						    <span class="mdl-list__item-primary-content">
						    	<i class="material-icons mdl-list__item-icon" aria-label="Step five">
						    		looks_5
						    	</i>
						    	Press "<strong>Download image</strong>" to download your
						    	edited image to your computer.
						  	</span>
						  </li>
						</ul>
					</div>
					<div class="mdl-dialog__actions">
						<button type="button"
						        class="close
										       mdl-button
										       mdl-js-button
													 mdl-button--raised
													 mdl-button--colored">
						  Close
						</button>
					</div>
				</dialog>

				<div class="mdl-grid" id="image-container">
          <div class="mdl-cell mdl-cell--10-col">
					  <div id="dropzone">
						  <img src="./assets/img/placeholder_image.png"
								   alt="Preview of loaded image"
								   id="editable-image" />
					  </div>
					</div>
          <div class="mdl-cell mdl-cell--1-col">
						<label for="input"
						       aria-label="Choose image"
									 title="Choose image"
						       class="label-class
									        mdl-button
													mdl-js-button
													mdl-button--fab
													mdl-button--primary">
							<i class="material-icons">
								image
							</i>
							<input type="file"
										 id="input"
										 onchange="LocalHandler.handleFiles(this.files)"
										 multiple accept="image/png, image/jpg, image/jpeg" />
						</label>
						<p>
							<!-- Edit (added from "LocalHandler.js") -->
							<span id="edit-button-field"></span>
						</p>
						<p>
							<!-- Download (added from "AviaryHandler.js") -->
		        	<span id="download-button-field"></span>
		        </p>
					</div>
        </div>

        <!-- Progressbar will be shown while image is being loaded. -->
        <div id="progressbar" class="mdl-progress mdl-js-progress mdl-progress__indeterminate"></div>

				<p>
					<!-- Go back -->
					<a href="?'.self::$indexURL.'"
					   id="go-back-button"
					   class="mdl-button
            		   	mdl-js-button
            			  mdl-button--raised
            		   	mdl-js-ripple-effect
            		   	mdl-button--accent">
            <i class="material-icons">
						  keyboard_arrow_left
						</i>
						Go back
					</a>
				</p>

      </div>
		';
	}

}
