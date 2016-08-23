<?php

declare(strict_types = 1);

class EditOnlineView {
	
	function __construct() {
		// Empty.
	}

	public function response() : string {
		return '
			<div id="editonline-page-container">
    			<h1 class="mdl-typography--display-1 mdl-color-text--primary page-topic">
    				Edit image on Google Drive
    			</h1>

	            <div id="user-message"></div>

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
	                <p id="loading-animation-text">Loading images...</p>
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
            		<a href="index.html"
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