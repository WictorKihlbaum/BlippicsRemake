<?php

declare(strict_types = 1);

class FooterView extends LayoutView {

	function __construct() {
		// Empty.
	}

	public function renderFooter() : string {
		return '
      <div class="mdl-mini-footer__left-section">
        <div class="mdl-logo">© 2016 Blippics</div>
        <ul class="mdl-mini-footer__link-list">
          <li>
            <a href="?'.self::$aboutURL.'">
              About
            </a>
          </li>
          <li>
            <a href="?'.self::$contactURL.'">
              Contact
            </a>
          </li>
          <li>
            <a href="?'.self::$attributionURL.'">
              Attribution
            </a>
          </li>
        </ul>
      </div>
    ';
  }

}
