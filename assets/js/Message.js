'use strict';

const Message = {

	message: null,


	init: () => {
		Message.message = $('#user-message');
	},

	show: (message, messageID) => {
		Message.message.html(message + Message.getCloseButton());
		Message.message.attr('class', 'user-message-show');
		Message.message.attr('id', messageID);
	},

	remove: () => {
		Message.message.addClass('fadeout');
		setTimeout(() =>
			Message.message.attr('class', 'message-hide'), 500);
	},

	getCloseButton: () => {
		return `
			<img src="assets/img/close_button.png"
				 alt="Close error message"
				 title="Close message"
				 class="close-message"
				 aria-label="Close message"
				 onclick="Message.remove()" />
		`;
	}
	
};

window.onload = Message.init();