<?php

declare(strict_types = 1);

class AttributionView {
	
	function __construct() {
		// Empty.
	}

	public function response() : string {
		return '

			<div class="wrapper">
		      	<div class="clip-text clip-text_one">
		      		Attribution
		      	</div>
		  	</div>

			<h1 class="mdl-typography--display-1 mdl-color-text--primary page-topic">
	    		Attribution
	    	</h1>

	    	<p>
	    		The purpose of this page is to give credit to all used techniques 
	    		and resources which I have been using to develop this website.  
	    	</p>

	    	<h2>Images</h2>
	    		<a href="http://www.freepik.com/"></a>

	    	<h2>Framework</h2>
	    		<a href="https://getmdl.io/">Material Design Lite (MDL)</a> 

	    	<h2>APIs</h2>
    			<a href="https://creativesdk.adobe.com/docs/web/#/articles/gettingstarted/index.html">
	    			Adobe Aviary Photo Editor (part of Adobe Creative SDK) 
	    		</a>
	    		Google Drive API

	    	<h2>JS/CSS Libraries</h2>
	    		<a href="http://jquery.com/">JQuery</a>
	    		<a href="http://ianlunn.github.io/Hover/">Hover</a>
	    		<a href="http://kushagragour.in/lab/hint/">Hint</a>
		';
	}

}