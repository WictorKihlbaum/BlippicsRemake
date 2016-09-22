
class Message {

	static init() {
		this.field = $('#user-message-field');
	}

	static show(message, id) {
		this.field.html(`
      <div id="${id}" class="user-message animated flash">
        ${message} ${this.getCloseButton()}
			</div>
		`);
	}

	static remove() {
	  this.field.html('');
	}

	static getCloseButton() {
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

}

window.onload = Message.init();
