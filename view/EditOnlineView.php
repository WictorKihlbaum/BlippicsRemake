<?php

declare(strict_types = 1);

class EditOnlineView {

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

    		<!--
    			Images per page
    			<button id="menu-amount" class="mdl-button mdl-js-button mdl-button--icon">
				    <i class="material-icons">format_list_numbered</i>
				  </button>
				  <ul class="mdl-menu mdl-js-menu mdl-js-ripple-effect" for="menu-amount">
				    <li class="mdl-menu__item" onclick="DriveClass.setupPagination(8)">8</li>
				    <li class="mdl-menu__item" onclick="DriveClass.setupPagination(16)">16</li>
				    <li class="mdl-menu__item" onclick="DriveClass.setupPagination(32)">32</li>
				    <li class="mdl-menu__item" onclick="DriveClass.setupPagination(64)">64</li>
				  </ul>
				-->

				<!-- Response messages will be shown here. -->
	      <div id="user-message"></div>

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
	           data-height="100"
	           data-longtitle="true"
	           data-theme="dark"
	           data-onsuccess="onSignIn"></div>

	      <div id="loading-animation">
	        <div class="sk-chasing-dots">
	          <div class="sk-child sk-dot1"></div>
	          <div class="sk-child sk-dot2"></div>
	        </div>
	        <p id="loading-animation-text">
					  Loading images...
					</p>
	      </div>

	      <div id="top-text">
	        <p>Your Google Drive images will be listed here.</p>
	      </div>

				<div class="pagination-page"></div>
					<div id="image-list" class="mdl-grid">
						<!-- Images will be rendered from "DriveClass.js" -->
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

      </div>
		';
	}

}
