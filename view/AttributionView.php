<?php

declare(strict_types = 1);

class AttributionView {
	
	function __construct() {
		// Empty.
	}

	public function response() : string {
		return '
			<div id="attribution-container">

				<h1 class="mdl-typography--display-3 mdl-color-text--primary page-topic">
		    		Attribution
		    	</h1>

		    	<p id="attribution-subtext">
		    		The purpose of this page is to give credit to all used techniques 
		    		and resources which I have been using to develop this website.  
		    	</p>


		    	<h2 class="attribution-topics">Images</h2>

		    	<ul class="mdl-list attribution-list">
				  <li class="mdl-list__item">
				    <span class="mdl-list__item-primary-content">
				      <a href="http://www.freepik.com/">FreePik</a>
				    </span>
				  </li>
				</ul>
		    		

		    	<h2 class="attribution-topics">Frameworks</h2>

		    	<ul class="mdl-list attribution-list">
				  <li class="mdl-list__item">
				    <span class="mdl-list__item-primary-content">
				      <a href="https://getmdl.io/">Material Design Lite (MDL)</a> 
				    </span>
				  </li>
				</ul>
		    		

		    	<h2 class="attribution-topics">APIs</h2>

		    	<ul class="mdl-list attribution-list">
				  <li class="mdl-list__item">
				    <span class="mdl-list__item-primary-content">
				      <a href="https://creativesdk.adobe.com/docs/web/#/articles/gettingstarted/index.html">
		    			Adobe Aviary Photo Editor (part of Adobe Creative SDK) 
		    		  </a>
				    </span>
				  </li>
				  <li class="mdl-list__item">
				    <span class="mdl-list__item-primary-content">
				      Google Drive APIs
				    </span>
				  </li>
				</ul>


		    	<h2 class="attribution-topics">JS/CSS Libraries</h2>

		    	<ul class="mdl-list attribution-list">
				  <li class="mdl-list__item">
				    <span class="mdl-list__item-primary-content">
				      <a href="http://jquery.com/">JQuery</a>
				    </span>
				  </li>
				  <li class="mdl-list__item">
				    <span class="mdl-list__item-primary-content">
				      <a href="http://ianlunn.github.io/Hover/">Hover</a>
				    </span>
				  </li>
				  <li class="mdl-list__item">
				    <span class="mdl-list__item-primary-content">
				      <a href="http://kushagragour.in/lab/hint/">Hint</a>
				    </span>
				  </li>
				  <li class="mdl-list__item">
				    <span class="mdl-list__item-primary-content">
				      <a href="http://flaviusmatis.github.io/simplePagination.js/">SimplePagination</a>
				    </span>
				  </li>
				  <li class="mdl-list__item">
				    <span class="mdl-list__item-primary-content">
				      <a href="https://daneden.github.io/animate.css/">Animate</a>
				    </span>
				  </li>
				  <li class="mdl-list__item">
				    <span class="mdl-list__item-primary-content">
				      <a href="http://tobiasahlin.com/spinkit/">SpinKit</a>
				    </span>
				  </li>
				</ul>

			</div>
		';
	}

}