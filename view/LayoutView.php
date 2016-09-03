<?php

declare(strict_types = 1);

class LayoutView {

  private static $indexURL = '';
  private static $aboutURL = 'about';
  private static $contactURL = 'contact';
  private static $editOnlineURL = 'editonline';
  private static $editLocalURL = 'editlocal';
  private static $attributionURL = 'attribution';

  private $pageSpecificScripts = '';
  private $pageSpecificStyles = '';


  function __construct(array $views) {
    $this -> indexView = $views['index'];
		$this -> aboutView = $views['about'];
		$this -> contactView = $views['contact'];
    $this -> editOnlineView = $views['editonline'];
    $this -> editLocalView = $views['editlocal'];
    $this -> attributionView = $views['attribution'];

    $this -> setCurrentURL();
    $this -> setupPageContent();
  }

  public function renderLayout() { // Remember to add: manifest="manifest.appcache" in production.
		echo '
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta name="google-signin-scope" content="https://www.googleapis.com/auth/drive">
          <meta name="google-signin-client_id" content="788591829115-1uq193qnm8r72ujqej7l3hdj558hj7ej.apps.googleusercontent.com">
          <title>Blippics | '. $this -> pageTitle .'</title>
          <!-- Google Material Lite -->
          <link rel="stylesheet" href="./assets/css/material.min.css" />
          <link rel="stylesheet" href="./assets/css/pace-theme.css" />
          <link rel="stylesheet" href="./assets/css/custom.css" />
          <link rel="stylesheet" href="./assets/css/hamburger.css" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
          <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:300,400,500,700">
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" />
          <link rel="stylesheet" href="./assets/css/hover.css" />
          <link rel="stylesheet" href="./assets/css/hint.min.css" />
          <link rel="stylesheet" href="./assets/css/animate.css" />
          '. $this -> getPageSpecificStyles() .'
        </head>
        <body>
          <div class="mdl-layout mdl-js-layout">
            <a name="top"></a> <!-- Top anchor -->
            <header class="mdl-layout__header mdl-layout__header--scroll mdl-color--primary-dark" id="page-header">
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
                           mdl-typography--display-4-color-white" 
                           id="header-topic">
                  Blippics
                </h1>
              </div>
              <div class="mdl-layout__header-row mdl-layout--large-screen-only">
                <!-- Empty -->
              </div>
              <div class="mdl-layout__header-row mdl-layout--large-screen-only">
                <!-- Empty -->
              </div>
            </header>
            <div class="mdl-layout__drawer mdl-layout--small-screen-only">
              <span class="mdl-layout-title">Menu</span>
              <nav class="mdl-navigation">
                <a class="mdl-navigation__link" href="?'.self::$indexURL.'">
                  Home
                </a>
                <a class="mdl-navigation__link" href="?'.self::$aboutURL.'">
                  About
                </a>
                <a class="mdl-navigation__link" href="?'.self::$contactURL.'">
                  Contact
                </a>
              </nav>
            </div>
            <main class="mdl-layout__content">
              <div class="page-content">
                '. $this -> pageContent .'
              </div>
            </main>
            <footer class="mdl-mini-footer">
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
            </footer>
          </div>

          <!-- Go-to-top-button (Needs to be outside framework container div) -->
          <div id="top-button">
            <span class="hint--left" aria-label="Back to Top">
              <a href="#top"
                 class="mdl-button mdl-js-button 
                        mdl-button--fab 
                        mdl-js-ripple-effect 
                        mdl-button--colored">
                <i class="material-icons">
                  keyboard_arrow_up
                </i>
              </a>
            </span>
          </div>

          <!-- Google Material Lite -->
          <script src="./assets/js/material.min.js"></script>
          <script src="./assets/js/pace.js"></script>
          <script src="./assets/js/jquery-3.1.0.min.js"></script>
          <script src="//apis.google.com/js/platform.js"></script>
          <script src="//apis.google.com/js/client.js"></script>
          <script src="./assets/js/SignEvent.js"></script>
          <script src="./assets/js/header.js"></script>
          <script src="//fast.eager.io/cluq6Cumbb.js"></script>
          '. $this -> getPageSpecificScripts() .'
          <script>
            function onSignIn(googleUser) {
              SignEvent.signIn(googleUser);
            }
          </script>

        </body>
      </html>
    ';
  }

  private function getPageSpecificStyles() : string {
    return $this -> pageSpecificStyles;
  }

  private function getPageSpecificScripts() : string {
    return $this -> pageSpecificScripts;
  }

  private function setCurrentURL() {
    $this -> currentURL = $_SERVER['QUERY_STRING'];
  }

  private function setupPageContent() {
    switch ($this -> currentURL) {
    
      case self::$indexURL: 
        $this -> pageTitle = 'Home';
        $this -> pageContent = $this -> indexView -> response();
        break;

      case self::$aboutURL:
        $this -> pageTitle = 'About';
        $this -> pageContent = $this -> aboutView -> response();
        $this -> pageSpecificStyles = '
          <link rel="stylesheet" href="./assets/css/background-edge.css" />
        ';
        break;

      case self::$contactURL: 
        $this -> pageTitle = 'Contact';
        $this -> pageContent = $this -> contactView -> response();
        $this -> pageSpecificStyles = '
          <link rel="stylesheet" href="./assets/css/background-edge.css" />
        ';
        break;

      case self::$editOnlineURL: 
        $this -> pageTitle = 'Edit Online';
        $this -> pageContent = $this -> editOnlineView -> response();
        $this -> pageSpecificScripts = '
          <script src="https://dme0ih8comzn4.cloudfront.net/imaging/v3/editor.js"></script>
          <script src="./assets/js/jquery.simplePagination.js"></script>
          <script src="./assets/js/Message.js"></script>
          <script src="./assets/js/DriveClass.js"></script>
          <script src="./assets/js/Fullscreen.js"></script>
          <script src="./assets/js/AviaryDrive.js"></script>
        ';
        $this -> pageSpecificStyles = '
          <link rel="stylesheet" href="./assets/css/loading.css" />
          <link rel="stylesheet" href="./assets/css/simplePagination.css" />
          <link rel="stylesheet" href="./assets/css/editonline.css" />
        ';
        break;

      case self::$editLocalURL: 
        $this -> pageTitle = 'Edit Local';
        $this -> pageContent = $this -> editLocalView -> response();
        $this -> pageSpecificScripts = '
          <script src="https://dme0ih8comzn4.cloudfront.net/imaging/v3/editor.js"></script>
          <script src="./assets/js/AviaryLocal.js"></script>
          <script src="./assets/js/LocalClass.js"></script>
          <script src="./assets/js/Message.js"></script>
        ';
        break;

      case self::$attributionURL:
        $this -> pageTitle = 'Attribution';
        $this -> pageContent = $this -> attributionView -> response();
        break;
      
      default: 
        $this -> pageTitle = 'Home';
        $this -> pageContent = $this -> indexView -> response();
        break;  
    }
  }
}