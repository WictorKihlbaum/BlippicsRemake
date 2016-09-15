<?php

declare(strict_types = 1);

class HeaderView extends LayoutView {

	function __construct() {
		// Empty.
	}

	public function renderHeader() : string {
		return '
      <div class="mdl-layout--large-screen-only mdl-layout__header-row" id="social-buttons-row">

        <!-- Social buttons -->
        <div class="mdl-layout-spacer"></div>

        <!-- Facebook -->
        <span class="hint--bottom" aria-label="Visit my Facebook">
          <a href="https://www.facebook.com/wictor.kihlbaum" class="hvr-grow">
            <img src="./assets/img/facebook-button.png"
                 alt="Visit my Facebook"
                 class="header-social-buttons" />
          </a>
        </span>

        <!-- Twitter -->
        <span class="hint--bottom" aria-label="Visit my Twitter">
          <a href="https://twitter.com/WictorKihlbaum" class="hvr-grow">
            <img src="./assets/img/twitter-button.png"
                 alt="Visit my Twitter"
                 class="header-social-buttons" />
          </a>
        </span>

        <!-- GitHub -->
        <span class="hint--bottom-left" aria-label="Visit my GitHub">
          <a href="https://github.com/WictorKihlbaum" class="hvr-grow">
            <img src="./assets/img/github-button.png"
                 alt="Visit my GitHub"
                 class="header-social-buttons" />
          </a>
        </span>

      </div>
      <div class="mdl-layout--large-screen-only mdl-layout__header-row">
        <nav class="menu">
          <input type="checkbox" href="#" class="menu-open" name="menu-open" id="menu-open" />
          <label class="menu-open-button" for="menu-open">
            <span class="hamburger hamburger-1"></span>
            <span class="hamburger hamburger-2"></span>
            <span class="hamburger hamburger-3"></span>
          </label>
          <a href="?'.self::$indexURL.'" class="menu-item">
            <i class="fa fa-home"></i>
          </a>
          <a href="?'.self::$aboutURL.'" class="menu-item">
            <i class="fa fa-info-circle"></i>
          </a>
          <a href="?'.self::$contactURL.'" class="menu-item">
            <i class="fa fa-at"></i>
          </a>
        </nav>
      </div>
      <div class="mdl-layout--large-screen-only mdl-layout__header-row">
        <h1 class="mdl-typography--display-4
                   mdl-typography--display-4-color-white
									 animated fadeIn">
          Blippics
        </h1>
      </div>
      <div class="mdl-layout__header-row mdl-layout--large-screen-only">
        <!-- Empty -->
      </div>
      <div class="mdl-layout__header-row mdl-layout--large-screen-only">
        <!-- Empty -->
      </div>
    ';
  }

}
