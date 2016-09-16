'use strict';

const HTTPSReplace = {

  baseURL: 'https://www.blippics.com/',

  verifyOrigin: function() {
    if (window.location.origin != this.baseURL) {
      window.location.replace(this.baseURL);
    }
  }

};

window.onload = HTTPSReplace.verifyOrigin();
