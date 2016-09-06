'use strict';

const Message = {

	field: null,


	init: () => {
		Message.field = $('#user-message-field');
	},

	show: (message, id) => {
		Message.field.html(`
      <div id="${id}" class="user-message animated flash">
        ${message} ${Message.getCloseButton()}
			</div>
		`);
	},

	remove: () => {
	  Message.field.html('');
	},

	getCloseButton: () => {
		return `
      <i class="material-icons"
			   id="close-message-button"
			   title="Close message"
				 aria-label="Close message"
				 onclick="Message.remove()">
        close
			</i>
		`;
	}

};

window.onload = Message.init();
