
class HelpDialog {

	static setupDialog() {
		const dialog = $('dialog')[0];
		let showDialogButton = null;

		if (window.location.href.includes('editgoogledrive'))
		  showDialogButton = $('#show-dialog-google')[0];
		else
		  showDialogButton = $('#show-dialog-other')[0];

		const closeDialogButton = $('.close')[0];

		if (!dialog.showModal)
			dialogPolyfill.registerDialog(dialog);

		showDialogButton.addEventListener('click', () => dialog.showModal());
		closeDialogButton.addEventListener('click', () => dialog.close());
	}

}

window.onload = HelpDialog.setupDialog();
