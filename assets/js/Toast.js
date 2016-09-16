'use strict';

const Toast = {

  showSuccess: function(message) {
    const snackbarContainer = $('#success-toast')[0];
		const data = {
			message: message,
			timeout: 10000
		};
		snackbarContainer.MaterialSnackbar.showSnackbar(data);
  }

};
