'use strict';

const Scroll = {

  /* ("html, body") doesn't work with MDL,
     therefore use (".mdl-layout") */
  mdlBody: $('.mdl-layout'),
  speed: 500,

  onScroll: function() {
    const button = $("#top-button");
    this.mdlBody.scroll(function() {
      if ($(this).scrollTop() > 75)
        button.fadeIn();
      else
        button.fadeOut();
    });
  },

  toTop: function() {
    this.mdlBody.animate({scrollTop: 0}, this.speed);
    return false;
  }

};

window.onload = Scroll.onScroll();
