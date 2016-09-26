<?php

declare(strict_types = 1);

class LayoutView {

  protected static $indexURL = '';
  protected static $aboutURL = 'about';
  protected static $contactURL = 'contact';
  private static $editGoogleDriveURL = 'editgoogledrive';
  private static $editLocalURL = 'editlocal';
  protected static $attributionURL = 'attribution';
  private static $editDropboxURL = 'editdropbox';
  private static $editOneDriveURL = 'editonedrive';
  private static $selfieURL = 'selfie';

  private $pageSpecificScripts = '';
  private $pageSpecificStyles = '';


  function __construct(array $views, array $sharedViews) {
    $this -> indexView = $views['index'];
		$this -> aboutView = $views['about'];
		$this -> contactView = $views['contact'];
    $this -> editGoogleDriveView = $views['editgoogledrive'];
    $this -> attributionView = $views['attribution'];
    $this -> selfieView = $views['selfie'];

    $this -> headerView = $sharedViews['header'];
    $this -> footerView = $sharedViews['footer'];
    $this -> editView = $sharedViews['editview'];

    $this -> setCurrentURL();
    $this -> setupPageContent();
  }

  public function renderLayout() {
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
          '. $this -> getPageSpecificStyles() .'
        </head>
        <body>
          <div class="mdl-layout mdl-js-layout">
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
            <footer class="mdl-mega-footer">
              '. $this -> footerView -> renderFooter() .'
            </footer>

            <!-- Go-to-top-->
            <div id="top-button">
              <span class="hint--left" aria-label="Back to Top">
                <a href="#"
                   onclick="Scroll.toTop()"
                   class="mdl-button
                          mdl-button--fab
                          mdl-button--primary
                          animated zoomIn">
                  <i class="material-icons">
                    keyboard_arrow_up
                  </i>
                </a>
              </span>
            </div>

          </div>

          <!--
          <script>
            if ("serviceWorker" in navigator) {
                navigator.serviceWorker.register("./sw.js").then(registration => {
                // Registration was successful
                console.log(`ServiceWorker registration successful with scope: ${registration.scope}`);
              }).catch(err => {
                console.log(`ServiceWorker registration failed: ${err}`);
              });
            }
          </script>
          -->

          <!--<script src="./assets/js/HTTPSReplace.js"></script>-->
          <!-- Google Material Lite -->
          <script src="./assets/js/framework/material.min.js"></script>
          <script src="./assets/js/libs/pace.js"></script>
          <script src="./assets/js/libs/jquery-3.1.0.min.js"></script>
          <script src="//fast.eager.io/cluq6Cumbb.js"></script>
          <script src="https://js.live.net/v7.0/OneDrive.js"></script>
          <script src="./assets/js/Scroll.js"></script>
          '. $this -> getPageSpecificScripts() .'

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

      case self::$editGoogleDriveURL:
        $this -> pageTitle = 'Edit Google Drive';
        $this -> pageContent = $this -> editGoogleDriveView -> response();
        $this -> pageSpecificScripts = '
          <script src="https://apis.google.com/js/platform.js"></script>
          <script src="https://apis.google.com/js/client.js"></script>
          <script src="https://dme0ih8comzn4.cloudfront.net/imaging/v3/editor.js"></script>
          <script src="./assets/js/libs/jquery.simplePagination.js"></script>
          <script src="./assets/js/Message.js"></script>
          <script src="./assets/js/HelpDialog.js"></script>
          <script src="./assets/js/GoogleDriveHandler.js"></script>
          <script src="./assets/js/AviaryHandler.js"></script>
          <script src="./assets/js/SignHandler.js"></script>
          <script src="./assets/js/Toast.js"></script>
          <script>
            function onSignIn(googleUser) {
              SignHandler.signIn(googleUser);
            }
          </script>
        ';
        $this -> pageSpecificStyles = '
          <link rel="stylesheet" href="./assets/css/libs/loading.css" />
          <link rel="stylesheet" href="./assets/css/libs/simplePagination.css" />
        ';
        break;

      case self::$editLocalURL:
        $this -> pageTitle = 'Edit computer';
        $this -> pageContent = $this -> editView -> response($this -> currentURL);
        $this -> pageSpecificScripts = '
          <script src="https://dme0ih8comzn4.cloudfront.net/imaging/v3/editor.js"></script>
          <script src="./assets/js/HelpDialog.js"></script>
          <script src="./assets/js/AviaryHandler.js"></script>
          <script src="./assets/js/LocalHandler.js"></script>
          <script src="./assets/js/Message.js"></script>
          <script src="./assets/js/ActionButtons.js"></script>
        ';
        break;

      case self::$attributionURL:
        $this -> pageTitle = 'Attribution';
        $this -> pageContent = $this -> attributionView -> response();
        break;

      case self::$editDropboxURL:
        $this -> pageTitle = 'Edit Dropbox';
        $this -> pageContent = $this -> editView -> response($this -> currentURL);
        $this -> pageSpecificScripts = '
          <script src="./assets/js/HelpDialog.js"></script>
          <script src="https://www.dropbox.com/static/api/2/dropins.js" id="dropboxjs" data-app-key="c8hfkxzclokzwl0"></script>
          <script src="./assets/js/DropboxHandler.js"></script>
          <script src="https://dme0ih8comzn4.cloudfront.net/imaging/v3/editor.js"></script>
          <script src="./assets/js/AviaryHandler.js"></script>
          <script src="./assets/js/Message.js"></script>
          <script src="./assets/js/ActionButtons.js"></script>
          <script src="./assets/js/Toast.js"></script>
        ';
        break;

      case self::$editOneDriveURL:
        $this -> pageTitle = 'Edit OneDrive';
        $this -> pageContent = $this -> editView -> response($this -> currentURL);
        $this -> pageSpecificScripts = '
          <script src="./assets/js/HelpDialog.js"></script>
          <script src="./assets/js/OneDriveHandler.js"></script>
          <script src="https://dme0ih8comzn4.cloudfront.net/imaging/v3/editor.js"></script>
          <script src="./assets/js/AviaryHandler.js"></script>
          <script src="./assets/js/ActionButtons.js"></script>
          <script src="./assets/js/Toast.js"></script>
        ';
        break;

      case self::$selfieURL:
        $this -> pageTitle = 'Take selfie';
        $this -> pageContent = $this -> selfieView -> response();
        $this -> pageSpecificScripts = '
          <script src="./assets/js/SelfieHandler.js"></script>
        ';
        $this -> pageSpecificStyles = '
          <link rel="stylesheet" href="./assets/css/selfie-styles.css" />
        ';
        break;

      default:
        $this -> pageTitle = 'Home';
        $this -> pageContent = $this -> indexView -> response();
        break;
    }
  }
}
