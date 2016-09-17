'use strict';

const Scroll = {

  // ("html, body") doesn't work with MDL, therefore use (".mdl-layout")
  mdlBody: $('.mdl-layout'),
  speed: 500,

  toTop: function() {
    this.mdlBody.animate({scrollTop: 0}, this.speed);
    return false;
  }

};
