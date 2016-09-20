<?php

declare(strict_types = 1);

class EditView {

  private static $indexURL = '';


	function __construct() {
		// Empty.
	}

	public function response($url) : string {
		return '
      <!-- TODO: Add an option to take a selfie with built in/connected camera. -->

      <div id="editview-page-container">

        <h1 class="mdl-typography--display-1 mdl-color-text--primary">
        '.$this -> getTopic($url).'
        </h1>

        <!-- Response messages will be shown here. -->
        <span id="user-message-field"></span>

        <dialog class="mdl-dialog animated zoomIn">
          <h4 class="mdl-dialog__title">
            Help
          </h4>
          <div class="mdl-dialog__content">
            <ul class="mdl-list">
              <li class="mdl-list__item">
                <span class="mdl-list__item-primary-content">
                  <i class="material-icons mdl-list__item-icon" aria-label="Step one">
                    looks_one
                  </i>
                  Press<i class="material-icons help-dialog-icons">photo</i>
                  to choose which image you want to edit (Png or Jpg/Jpeg).
                </span>
              </li>
              <li class="mdl-list__item">
                <span class="mdl-list__item-primary-content">
                  <i class="material-icons mdl-list__item-icon" aria-label="Step two">
                    looks_two
                  </i>
                  Press <i class="material-icons help-dialog-icons">edit</i>
                  The photo editor will automatically open.
                </span>
              </li>
              <li class="mdl-list__item">
                <span class="mdl-list__item-primary-content">
                  <i class="material-icons mdl-list__item-icon" aria-label="Step three">
                    looks_3
                  </i>
                  Press "<strong>Apply</strong>" in the upper-right corner,
                  after you are done with each tool.
                </span>
              </li>
              <li class="mdl-list__item">
                <span class="mdl-list__item-primary-content">
                  <i class="material-icons mdl-list__item-icon" aria-label="Step four">
                    looks_4
                  </i>
                  Press "<strong>Save</strong>" in the upper-right corner
                  when you are done and then close the editor.
                </span>
              </li>
              <li class="mdl-list__item">
                <span class="mdl-list__item-primary-content">
                  <i class="material-icons mdl-list__item-icon" aria-label="Step five">
                    looks_5
                  </i>
                  Press <i class="material-icons help-dialog-icons">file_download</i>
                  to download your edited image to your computer.
                </span>
              </li>
            </ul>
          </div>
          <div class="mdl-dialog__actions">
            <button type="button"
                    class="close
                           mdl-button
                           mdl-js-button
                           mdl-button--raised
                           mdl-button--colored">
              Close
            </button>
          </div>
        </dialog>

        <div class="mdl-grid" id="image-container">
          <div class="mdl-cell mdl-cell--7-col mdl-cell--2-offset">
            <div id="dropzone">
              <img src="./assets/img/placeholder_image.png"
                   alt="Preview of loaded image"
                   id="editable-image" />
            </div>
          </div>
          <div class="mdl-cell mdl-cell--1-col" id="action-buttons-field">

              <button type="button"
                      id="show-dialog-other"
                      aria-label="Show help"
                      title="Show help"
                      class="mdl-button
                             mdl-js-button
                             mdl-button--fab
                             mdl-button--colored">
                <i class="material-icons">
                  help_outline
                </i>
              </button>

              <div id="choose-button-field">
                '.$this -> getChooseButton($url).'
              </div>
              <span id="edit-button-field"></span>
              <span id="download-button-field"></span>
              <span id="save-button-field"></span>

          </div>
        </div>

        <div class="spinner is-hidden">
          <div class="dot1"></div>
          <div class="dot2"></div>
        </div>

        <div id="success-toast" class="mdl-js-snackbar mdl-snackbar">
					<div class="mdl-snackbar__text"></div>
					<button class="mdl-snackbar__action" type="button"></button>
				</div>

        <p>
          <!-- Go back -->
          <a href="?'.self::$indexURL.'"
             id="go-back-button"
             class="mdl-button
                    mdl-js-button
                    mdl-button--raised
                    mdl-js-ripple-effect
                    mdl-button--accent">
            <i class="material-icons">
              keyboard_arrow_left
            </i>
            Go back
          </a>
        </p>

      </div>
    ';
  }

  private function getTopic($url) : string {
    switch ($url) {
      case 'editlocal': return 'Edit image on computer';
      case 'editdropbox': return 'Edit image on Dropbox';
      case 'editonedrive': return 'Edit image on OneDrive';
      default: return 'Edit image';
    }
  }

  private function getChooseButton($url) : string {
    switch ($url) {
      case 'editlocal':
        return '
          <label for="input"
                 aria-label="Choose image"
                 title="Choose image"
                 id="choose-button"
                 class="label-class
                        mdl-button
                        mdl-js-button
                        mdl-button--fab
                        mdl-button--primary">
            <i class="material-icons">
              image
            </i>
            <input type="file"
                   id="input"
                   multiple accept="image/png, image/jpg, image/jpeg" />
          </label>
        ';

      case 'editdropbox':
        return '
          <button class="mdl-button mdl-js-button mdl-button--fab mdl-button--primary"
                  aria-label="Choose image"
                  title="Choose image"
                  id="choose-button"
                  onclick="Dropbox.choose(DropboxHandler.getChooserOptions())">
            <i class="material-icons">
              photo
            </i>
          </button>
        ';

      case 'editonedrive':
        return '
          <button class="mdl-button mdl-js-button mdl-button--fab mdl-button--primary"
                  aria-label="Choose image"
                  title="Choose image"
                  id="choose-button"
                  onclick="OneDriveHandler.launchOneDrivePicker()">
            <i class="material-icons">
              photo
            </i>
          </button>
        ';

      default: break;
    }
  }

}
