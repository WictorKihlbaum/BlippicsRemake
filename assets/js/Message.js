'use strict';

const Message = {

	userMessage: null,


	init: () => {
		Message.userMessage = $('#user-message');
	},

	showUserMessage: (message, messageID) => {
		Message.userMessage.html(message + Message.getCloseButton());
		Message.userMessage.attr('class', 'user-message-show');
		Message.userMessage.attr('id', messageID);
	},

	removeUserMessage: () => {
		Message.userMessage.addClass('fadeout');
		setTimeout(() =>
			Message.userMessage.attr('class', 'message-hide'), 500);
	},

	getCloseButton: () => {
		return `
			<img src="assets/img/close_button.png"
			alt="Close error message"
			title="Close message"
			class="close-message"
			onclick="Message.removeUserMessage()" />`;
	}
	
};

window.onload = Message.init();