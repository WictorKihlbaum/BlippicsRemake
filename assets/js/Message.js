'use strict';

const Message = {

	field: null,


	init: function() {
		this.field = $('#user-message-field');
	},

	show: function(message, id) {
		this.field.html(`
      <div id="${id}" class="user-message animated flash">
        ${message} ${this.getCloseButton()}
			</div>
		`);
	},

	remove: function() {
	  this.field.html('');
	},

	getCloseButton: function() {
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
