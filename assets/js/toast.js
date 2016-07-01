'use strict';
  	
let toast = {

	snackbarContainer: null,
	showToastButton: null,

	// Toast data.
	toastMessage: 'Help info', // Change message.
	toastTimeout: 15000,



	init: () => {
		toast.snackbarContainer = document.querySelector('#toast-container');
		toast.showToastButton = document.querySelector('#show-toast-button');
		toast.showToastButton.addEventListener('click', toast.showToast);
	},

	showToast: () => {
		let data = {message: toast.toastMessage, timeout: toast.toastTimeout};
    	toast.snackbarContainer.MaterialSnackbar.showSnackbar(data);
	}

	

};

window.onload = toast.init();