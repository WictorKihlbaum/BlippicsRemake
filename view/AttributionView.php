<?php

declare(strict_types = 1);

// TODO: Add all specific URLs to used FreePik images.

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

		    <div id="attribution-subtext" class="mdl-typography--display-1">
		      The purpose of this page is to give credit to all used techniques
		    	and resources which I have been using to develop this website.
		    </div>

		    <h2 class="attribution-topics">
				  Images
				</h2>

		    <ul class="mdl-list attribution-list" id="freepik-list">
				  <li class="mdl-list__item">
				    <span class="mdl-list__item-primary-content">
				      <a href="http://www.freepik.com/">
							  FreePik
							</a>
				    </span>
				  </li>
					<ul>
					  <li class="mdl-typography--display-3">
						  Social buttons:
						  <a href="http://www.freepik.com/free-photos-vectors/icon">
							  Icon vector designed by Starline - Freepik.com
							</a>
						</li>
						<li class="mdl-typography--display-3">
						  GitHub head logo:
						  <a href="http://www.flaticon.com/free-icon/github_23586/">Icon</a>
							made by <a href="http://www.flaticon.com/authors/icomoon/">Icomoon</a>
							from <a href="http://www.flaticon.com/">www.flaticon.com</a>
						</li>
						<li class="mdl-typography--display-3">
						  Laptop:
						  <a href="http://www.freepik.com/free-photos-vectors/computer">
							  Computer vector designed by Freepik
							</a>
						</li>
						<li class="mdl-typography--display-3">
						  Circles:
						  <a href="http://www.freepik.com/free-photos-vectors/background">
							  Background vector designed by Freepik
							</a>
						</li>
						<li class="mdl-typography--display-3">
						  Arrows:
						  <a href="http://www.freepik.com/free-photos-vectors/arrow">
							  Arrow vector designed by Freepik
							</a>
						</li>
						<li class="mdl-typography--display-3">
						  Selfie:
						  <a href="http://www.freepik.com/free-photos-vectors/hand">
							  Hand vector designed by Freepik
							</a>
						</li>
					</ul>
				</ul>

		    <h2 class="attribution-topics">
				  Framework
				</h2>

		    <ul class="mdl-list attribution-list">
				  <li class="mdl-list__item">
				    <span class="mdl-list__item-primary-content">
				      <a href="https://getmdl.io/">
							  Material Design Lite (MDL)
							</a>
				    </span>
				  </li>
				</ul>

		    <h2 class="attribution-topics">
				  APIs
				</h2>

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
				      Google APIs
				    </span>
				  </li>
				</ul>

		    <h2 class="attribution-topics">
				  JS/CSS Libraries
				</h2>

		    <ul class="mdl-list attribution-list">
				  <li class="mdl-list__item">
				    <span class="mdl-list__item-primary-content">
				      <a href="http://jquery.com/">
							  JQuery
							</a>
				    </span>
				  </li>
				  <li class="mdl-list__item">
				    <span class="mdl-list__item-primary-content">
				      <a href="http://ianlunn.github.io/Hover/">
							  Hover
							</a>
				    </span>
				  </li>
				  <li class="mdl-list__item">
				    <span class="mdl-list__item-primary-content">
				      <a href="http://kushagragour.in/lab/hint/">
							  Hint
							</a>
				    </span>
				  </li>
				  <li class="mdl-list__item">
				    <span class="mdl-list__item-primary-content">
				      <a href="http://flaviusmatis.github.io/simplePagination.js/">
							  SimplePagination
							</a>
				    </span>
				  </li>
				  <li class="mdl-list__item">
				    <span class="mdl-list__item-primary-content">
				      <a href="https://daneden.github.io/animate.css/">
							  Animate
							</a>
				    </span>
				  </li>
				  <li class="mdl-list__item">
				    <span class="mdl-list__item-primary-content">
				      <a href="http://tobiasahlin.com/spinkit/">
							  SpinKit
							</a>
				    </span>
				  </li>
				</ul>

			</div>
		';
	}

}
