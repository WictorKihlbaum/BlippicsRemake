<?php

declare(strict_types = 1);

class EditGoogleDriveView {

	private static $indexURL = '';


	function __construct() {
		// Empty.
	}

	public function response() : string {
		return '
			<div id="editonline-page-container">

				<button type="button"
						    id="show-dialog"
						    class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent">
					<i class="material-icons">
						help_outline
					</i>
					Show Help
				</button>

    		<h1 class="mdl-typography--display-1 mdl-color-text--primary page-topic">
    		  Edit image on Google Drive
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
						      <i class="material-icons mdl-list__item-icon">
						    	  edit
						    	</i>
						    	= Edit image.
								</span>
						  </li>
						  <li class="mdl-list__item">
						    <span class="mdl-list__item-primary-content">
						      <i class="material-icons mdl-list__item-icon">
						    	  cloud_download
						    	</i>
						    	= Download original image.
						  	</span>
						  </li>
							<li class="mdl-list__item">
						    <span class="mdl-list__item-primary-content">
						      <i class="material-icons mdl-list__item-icon">
						    	  delete_forever
						    	</i>
						    	= Delete image permanently.
						  	</span>
						  </li>
						  <li class="mdl-list__item">
						    <span class="mdl-list__item-primary-content">
						      <i class="material-icons mdl-list__item-icon">
						    	  file_download
						    	</i>
						    	= Download edited image (will be shown when done editing).
						  	</span>
						  </li>
						  <li class="mdl-list__item">
						    <span class="mdl-list__item-primary-content">
						      <i class="material-icons mdl-list__item-icon">
						    	  cloud_upload
						    	</i>
						    	= Upload edited image (will be shown when done editing).
						  	</span>
						  </li>
						</ul>
					</div>
					<div class="mdl-dialog__actions">
						<button type="button"
						        class="mdl-button close
										       mdl-js-button
													 mdl-button--raised
													 mdl-button--colored">
					    Close
						</button>
					</div>
				</dialog>

				<div id="success-toast" class="mdl-js-snackbar mdl-snackbar">
					<div class="mdl-snackbar__text"></div>
					<button class="mdl-snackbar__action" type="button"></button>
				</div>

	      <div id="need-to-login-text">
	        You have to login to be able to load your Google Drive images.
	        Only images in formats Png and Jpg/Jpeg will be shown.
					These are the formats the photo editor accepts.
	      </div>

	      <div class="g-signin2 mdl-layout--large-screen-only"
	           data-width="960px"
	           data-height="100px"
	           data-longtitle="true"
	           data-theme="dark"
	           data-onsuccess="onSignIn">
				</div>

	      <div id="loading-animation">
	        <div class="sk-chasing-dots">
	          <div class="sk-child sk-dot1"></div>
	          <div class="sk-child sk-dot2"></div>
	        </div>
	        <p id="loading-animation-text">
					  Loading images...
					</p>
	      </div>

	      <div id="google-info-text" class="mdl-color-text--primary mdl-typography--display-1">
	        Your Google Drive images will be listed here.
	      </div>

				<div class="pagination-page"></div>
					<div class="mdl-grid" id="image-list">
						<!-- Images will be rendered from "GoogleDriveHandler.js" -->
					</div>
				<div class="pagination-page"></div>

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

			  <dialog class="mdl-dialog" id="confirm-dialog">
          <h4 class="mdl-dialog__title">
					  Delete image?
					</h4>
          <div class="mdl-dialog__content">
            <span id="confirmation-text">
              <!-- Text is added from GoogleDriveHandler.js -->
            </span>
          </div>
          <div class="mdl-dialog__actions">
            <button type="button" class="mdl-button mdl-color-text--primary confirm">
						  Yes
						</button>
            <button type="button" class="mdl-button cancel" id="cancel-button">
						  Cancel
						</button>
          </div>
        </dialog>

      </div>
		';
	}

}
