"use strict";

const loadcard = {

	container: null,

	
	init: () => {
		loadcard.container = document.getElementById('main-container');
		loadcard.renderCards();
	},

	renderCards: () => {
		for (let i = 0; i <= 5; i++) {
			loadcard.container.innerHTML += `
				<div class="demo-card-image mdl-card mdl-shadow--2dp mdl-cell mdl-cell--4-col">
					<div class="mdl-card__title mdl-card--expand"></div>
					<div class="mdl-card__actions mdl-typography--text-right">
						<span class="demo-card-image__filename">Image.jpg</span>

						<!-- Right aligned menu on top of button  -->
						<button id="demo-menu-top-right-${i}"
						        class="mdl-button mdl-js-button mdl-button--icon">
							<i class="material-icons">more_vert</i>
						</button>

						<ul class="mdl-menu mdl-menu--top-right 
								   mdl-js-menu mdl-js-ripple-effect" 
								data-mdl-for="demo-menu-top-right-${i}">
							<li class="mdl-menu__item">Download</li>
						  	<li class="mdl-menu__item">Edit</li>
						  	<li class="mdl-menu__item">Upload</li>
						</ul>
					</div>
				</div>
			`;
		}
	}

};

window.onload = loadcard.init();