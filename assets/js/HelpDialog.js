'use strict';

const HelpDialog = {

	setupDialog: function() {
		const dialog = $('dialog')[0];
		let showDialogButton = null;
		if (window.location.href.includes('editgoogledrive'))
		  showDialogButton = $('#show-dialog')[0];
		else
		  showDialogButton = $('#show-dialog-local')[0];

		const closeDialogButton = $('.close')[0];

		if (!dialog.showModal)
			dialogPolyfill.registerDialog(dialog);

		showDialogButton.addEventListener('click', () => dialog.showModal());
		closeDialogButton.addEventListener('click', () => dialog.close());
	}

};

window.onload = HelpDialog.setupDialog();
