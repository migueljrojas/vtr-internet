'use strict';

// Constructor
var Header = function() {
    var header = $('.header');
    var body = $('body');
    var menuOpen = $('.header__hamburguer');
    var menuLink = $('.header__menu a');

    menuOpen.on('click', function(){
        header.toggleClass('-open');
        body.toggleClass('-hideOverflow');
    });

    menuLink.on('click', function(){
        header.removeClass('-open');
        body.removeClass('-hideOverflow');
    });

    $('a[href="#"]').on('click', function(e){
        e.preventDefault();
    });

    // Select all links with hashes
    var links = $('a[href*="#"]');

    $(document).on('click', 'a[href*="#"]', function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
      &&
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top + -0
        }, 1000, function() {
          return false;
        });
      }
    }
    });
};

module.exports = Header;
