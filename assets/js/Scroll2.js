
class Scroll {

  static init() {
    this.mdlBody = $('.mdl-layout');
    this.speed = 500;
    this.onScroll();
  }

  static onScroll() {
    const button = $("#top-button");
    this.mdlBody.scroll(function() {
      if ($(this).scrollTop() > 75)
        button.fadeIn();
      else
        button.fadeOut();
    });
  }

  static toTop() {
    this.mdlBody.animate({scrollTop: 0}, this.speed);
    return false;
  }

}

window.onload = Scroll.init();
