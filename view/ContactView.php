<?php

declare(strict_types = 1);

class ContactView {

	function __construct() {
		// Empty.
	}

	public function response() : string {
		return '
			<h1 class="mdl-typography--display-3 page-topic mdl-color-text--primary">
			  Contact
		  </h1>

			<div class="quote">
	  	  <p id="contact-text" class="mdl-typography--display-2">
					If you are experiencing any technical issues or just want to report
					some bugs which you have encountered do not hesitate to contact me.
					You can contact me by Facebook, Twitter, Gmail or GitHub which are
					listed below.
				</p>
			</div>

			<div class="contact-lists">
				<ul class="mdl-list">
				  <li class="mdl-list__item mdl-list__item--two-line">
				    <span class="mdl-list__item-primary-content">
				      <img src="./assets/img/facebook_logo.png" alt="Facebook logotype" />
							<a href="https://www.facebook.com/wictor.kihlbaum">
								facebook.com/wictor.kihlbaum
							</a>
				    </span>
				  </li>
				</ul>
				<ul class="mdl-list">
				  <li class="mdl-list__item mdl-list__item--two-line">
				    <span class="mdl-list__item-primary-content">
					    <img src="./assets/img/twitter_logo.png" alt="Twitter logotype" />
							<a href="https://twitter.com/WictorKihlbaum">
								twitter.com/WictorKihlbaum
							</a>
				    </span>
				  </li>
				</ul>
				<ul class="mdl-list">
				  <li class="mdl-list__item mdl-list__item--two-line">
				    <span class="mdl-list__item-primary-content">
					    <img src="./assets/img/gmail_logo.svg" alt="Gmail logotype" />
					    <a href="mailto:wictor.kihlbaum@gmail.com">
					      wictor.kihlbaum@gmail.com
					    </a>
				    </span>
				  </li>
				</ul>
				<ul class="mdl-list">
				  <li class="mdl-list__item mdl-list__item--two-line">
				    <span class="mdl-list__item-primary-content">
				      <img src="./assets/img/github_logo.png" alt="GitHub logotype" />
							<a href="https://github.com/WictorKihlbaum">
								github.com/WictorKihlbaum
							</a>
				    </span>
				  </li>
				</ul>
			</div>
		';
	}

}
