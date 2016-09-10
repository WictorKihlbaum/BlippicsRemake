<?php

declare(strict_types = 1);

class LayoutView {

  protected static $indexURL = '';
  protected static $aboutURL = 'about';
  protected static $contactURL = 'contact';
  private static $editOnlineURL = 'editonline';
  private static $editLocalURL = 'editlocal';
  protected static $attributionURL = 'attribution';
  private static $editDropboxURL = 'editdropbox';
  private static $editOneDriveURL = 'editonedrive';

  private $pageSpecificScripts = '';
  private $pageSpecificStyles = '';


  function __construct(array $views, array $sharedViews) {
    $this -> indexView = $views['index'];
		$this -> aboutView = $views['about'];
		$this -> contactView = $views['contact'];
    $this -> editOnlineView = $views['editonline'];
    $this -> editLocalView = $views['editlocal'];
    $this -> attributionView = $views['attribution'];
    $this -> editDropboxView = $views['editdropbox'];
    $this -> editOneDriveView = $views['editonedrive'];

    $this -> headerView = $sharedViews['header'];
    $this -> footerView = $sharedViews['footer'];

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
          <meta name="google-signin-client_id" content="117700549617-ol49l4bkna7ch6qbb44gubuj3t2p8vep.apps.googleusercontent.com">
          <title>Blippics | '. $this -> pageTitle .'</title>
          <!-- Google Material Lite -->
          <link rel="stylesheet" href="./assets/css/framework/material.min.css" />
          <link rel="stylesheet" href="./assets/css/libs/pace-theme.css" />
          <link rel="stylesheet" href="./assets/css/custom.css" />
          <link rel="stylesheet" href="./assets/css/hamburger.css" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
          <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:300,400,500,700">
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" />
          <link rel="stylesheet" href="./assets/css/libs/hover.css" />
          <link rel="stylesheet" href="./assets/css/libs/hint.min.css" />
          <link rel="stylesheet" href="./assets/css/libs/animate.min.css" />
          <script src="https://npmcdn.com/dropbox/dist/Dropbox-sdk.min.js"></script>
          '. $this -> getPageSpecificStyles() .'
        </head>
        <body>
          <div class="mdl-layout mdl-js-layout">
            <a name="top"></a> <!-- Top anchor -->
            <header class="mdl-layout__header mdl-layout__header--scroll mdl-color--primary-dark" id="page-header">
              '. $this -> headerView -> renderHeader() .'
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
              '. $this -> footerView -> renderFooter() .'
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
          <script src="./assets/js/framework/material.min.js"></script>
          <script src="./assets/js/libs/pace.js"></script>
          <script src="./assets/js/libs/jquery-3.1.0.min.js"></script>
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
          <script src="./assets/js/libs/jquery.simplePagination.js"></script>
          <script src="./assets/js/Message.js"></script>
          <script src="./assets/js/HelpDialog.js"></script>
          <script src="./assets/js/DriveClass.js"></script>
          <script src="./assets/js/AviaryEditor.js"></script>
        ';
        $this -> pageSpecificStyles = '
          <link rel="stylesheet" href="./assets/css/libs/loading.css" />
          <link rel="stylesheet" href="./assets/css/libs/simplePagination.css" />
        ';
        break;

      case self::$editLocalURL:
        $this -> pageTitle = 'Edit Local';
        $this -> pageContent = $this -> editLocalView -> response();
        $this -> pageSpecificScripts = '
          <script src="https://dme0ih8comzn4.cloudfront.net/imaging/v3/editor.js"></script>
          <script src="./assets/js/HelpDialog.js"></script>
          <script src="./assets/js/AviaryEditor.js"></script>
          <script src="./assets/js/LocalClass.js"></script>
          <script src="./assets/js/Message.js"></script>
        ';
        break;

      case self::$attributionURL:
        $this -> pageTitle = 'Attribution';
        $this -> pageContent = $this -> attributionView -> response();
        break;

      case self::$editDropboxURL:
        $this -> pageTitle = 'Edit Dropbox';
        $this -> pageContent = $this -> editDropboxView -> response();
        $this -> pageSpecificScripts = '
          <script src="https://www.dropbox.com/static/api/2/dropins.js" id="dropboxjs" data-app-key="c8hfkxzclokzwl0"></script>
          <script src="./assets/js/DropboxHandler.js"></script>
          <script src="https://dme0ih8comzn4.cloudfront.net/imaging/v3/editor.js"></script>
          <script src="./assets/js/AviaryEditor.js"></script>
          <script src="./assets/js/Message.js"></script>
        ';
        break;

      case self::$editOneDriveURL:
        $this -> pageTitle = 'Edit OneDrive';
        $this -> pageContent = $this -> editOneDriveView -> response();
        $this -> pageSpecificScripts = '
          <script src="https://js.live.net/v7.0/OneDrive.js"></script>
          <script src="./assets/js/OneDriveHandler.js"></script>
        ';
        break;

      default:
        $this -> pageTitle = 'Home';
        $this -> pageContent = $this -> indexView -> response();
        break;
    }
  }
}
