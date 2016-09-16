<?php

declare(strict_types = 1);

class FooterView extends LayoutView {

	function __construct() {
		// Empty.
	}

	public function renderFooter() : string {
		return '
		  <div class="mdl-mega-footer__bottom-section">
		    <div class="mdl-logo footer-content">© 2016 Blippics</div>
		    <ul class="mdl-mega-footer__link-list footer-content">
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
