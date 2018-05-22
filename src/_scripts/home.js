'use strict';

var Home = function() {
    var momentsContainer = $('.home__moments__list');
    var momentsHeader = $('.home__moments__header');
    var momentsHeaderSibling = $('.home__moments__header__fixer');
    var momentsHeaderHeight = momentsHeader.outerHeight();
    var momentsFooter = $('.home__moments__cta');
    var momentsSection = $('.home__moments');
    var momentsList = $('.home__moments__list');
    var moment = $('.home__moment');
    var momentsListHeight = momentsList.outerHeight();
    var momentHeight = moment.outerHeight();
    var showMoreMoments = $('.home__moments__cta__btn');
    var allMoments = false;
    var gigasAmount = $('.home__moments__index__amount__size');
    var gigasIndex = $('.home__moments__index__bar__fill');
    var gigasCount = 0;

    momentsList.css('maxHeight', momentHeight * 3);

    showMoreMoments.on('click', function() {
        if (!allMoments) {
            momentsList.css('maxHeight', momentsListHeight);
            allMoments = true;
        }
    });

    function round(value, precision) {
        var multiplier = Math.pow(10, precision || 0);
        return Math.round(value * multiplier) / multiplier;
    }

    function gigasUpdater(mode, val) {
        if ( mode === 'sum' && gigasCount < 100) {
            gigasCount = gigasCount + val;
        } else if (mode === 'less' && gigasCount > 0) {
            gigasCount = gigasCount - val;
        }

        gigasAmount.html(gigasCount > 100 ? '100 GB' : round(gigasCount, 1) + ' GB');
        gigasIndex.css('width', gigasCount > 100 ? '100%' : round(gigasCount, 1) + '%');
    }

    moment.each(function(){
        var $this = $(this);

        $this.on('click', function(){
            var gigas = $this.data('size');
            if (!$this.hasClass('-checked') && gigasCount + gigas <= 100) {
                gigasUpdater('sum', gigas);
                $this.addClass('-checked');
            } else if ($this.hasClass('-checked')) {
                gigasUpdater('less', gigas);
                $this.removeClass('-checked');
            }
        });
    });

    $(window).on("scroll", function() {
        var scroll = $(window).scrollTop();
        var momentsSectionTop = momentsSection.get(0).getBoundingClientRect().top;
        var momentsTop = momentsHeader.get(0).getBoundingClientRect().top;
        var momentsBottom = momentsFooter.get(0).getBoundingClientRect().top;

        if ( momentsTop <= 0 ) {
            momentsHeader.addClass('-fixed');
            momentsHeaderSibling.css('height', momentsHeaderHeight);
        }

        if ( momentsSectionTop > 0 || momentsBottom <= momentsHeaderHeight ) {
            momentsHeader.removeClass('-fixed');
            momentsHeaderSibling.css('height', 0);
        }
    });
}

module.exports = Home;
