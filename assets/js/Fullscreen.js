'use strict';

const Fullscreen = {
	
	thumbnail: '',
	thumbnailSrc: '',
	
	
	init: () => {
		// Make it work for all major browsers.
		// Call 'fullscreenChanged' everytime fullscreen are opened or closed.
		document.addEventListener("fullscreenchange", () => { Fullscreen.fullscreenChanged(); });
		document.addEventListener("webkitfullscreenchange", () => { Fullscreen.fullscreenChanged(); });
		document.addEventListener("mozfullscreenchange", () => { Fullscreen.fullscreenChanged(); });
		document.addEventListener("MSFullscreenChange", () => { Fullscreen.fullscreenChanged(); });
	},
	
	fullscreenChanged: () => {
		if (document.fullscreenElement) {
			document.fullscreenElement.className = 'thumbnail-image-opened';
		} else if (document.webkitFullscreenElement) {
			document.webkitFullscreenElement.className = 'thumbnail-image-opened';
		} else if (document.mozFullScreenElement ) {
			document.mozFullScreenElement.className = 'thumbnail-image-opened';
		} else if (document.msFullscreenElement) {
			document.msFullscreenElement.className = 'thumbnail-image-opened';
		}
		
		if (!document.fullscreenElement &&
			!document.webkitFullscreenElement &&
			!document.mozFullScreenElement &&
			!document.msFullscreenElement) {
			
			Fullscreen.thumbnail.className = 'thumbnail-image';
			Fullscreen.thumbnail.src = Fullscreen.thumbnailSrc;
		}
	},
	
	showFullScreen: (id, src) => {
		// Check if full-screen is available.
		if (document.fullscreenEnabled || 
			document.webkitFullscreenEnabled || 
			document.mozFullScreenEnabled ||
			document.msFullscreenEnabled) {
			
			// Remove unnecessary part of url.
			const newSrc = src.replace(/&export=download/i, '');
			const image = document.getElementById(id);
			
			// Save thumbnail image source for later use.
			Fullscreen.thumbnailSrc = image.src;
			
			/* 1. Go fullscreen.
			 * 2. Change img src to high-res version.
			 * 3. Save thumbnail element for later use.
			 */
			if (image.requestFullscreen) {
				image.requestFullscreen();
				image.src = newSrc;
				Fullscreen.thumbnail = document.fullscreenElement;
				
			} else if (image.webkitRequestFullscreen) {
				image.webkitRequestFullscreen();
				image.src = newSrc;
				Fullscreen.thumbnail = document.webkitFullscreenElement;
				
			} else if (image.mozRequestFullScreen) {
				image.mozRequestFullScreen();
				image.src = newSrc;
				Fullscreen.thumbnail = document.mozFullScreenElement;
				
			} else if (image.msRequestFullscreen) {
				image.msRequestFullscreen();
				image.src = newSrc;
				Fullscreen.thumbnail = document.msFullscreenElement;
			}
			
		} else {
			// Show error message.
			const message = `Ooops! Unfortunately your browser
				does not support fullscreen preview.`;
			Message.showErrorMessage(message);
		}
	},
	
};

window.onload = Fullscreen.init();