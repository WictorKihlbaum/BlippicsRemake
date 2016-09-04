'use strict';

const HelpDialog = {

	setupDialog: () => {
		const dialog = $('dialog')[0];
		const showDialogButton = $('#show-dialog')[0];
		const closeDialogButton = $('.close')[0];

		if (!dialog.showModal) 
			dialogPolyfill.registerDialog(dialog);
		
		showDialogButton.addEventListener('click', () => dialog.showModal());
		closeDialogButton.addEventListener('click', () => dialog.close());
	}

};

window.onload = HelpDialog.setupDialog();