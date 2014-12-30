;(function ( $, window, document, undefined ) {
  //Parallax Background Image on Scroll
  $.fn.parallaxScroll = function(options){
    var options  = options || {};
    return this.each(function() {
      var $this    = $(this),
          data     = $this.data('plugin_parallaxScroll');
      if(!data) {
        data = new ParallaxScroll(this, options);
        $this.data('plugin_parallaxScroll', data);
      }
    });
  }
  var ParallaxScroll = function ParallaxScroll(element, options){
    this.$el        = $(element);
    this.rate       = options.rate || .5;
    this.max        = options.max || 0;  // maximum pixel distance to translate the element
    this.starting   = options.starting || 0;  // pixel distance from top to start animation
    if(options.opacity){
      this.opacity        = true;
      this.opacitySpread  = options.opacitySpread || 500;
    }
    this.init();
  };
  ParallaxScroll.prototype = {
    init: function(){
      var $window = $(window);
      if(this.opacity){
        $window.scroll(function() {
          $.throttle(150, false, this.scrollWithOpacity(), true);
        }.bind(this));
      } else {
        $window.scroll(function() {
          $.throttle(150, false, this.scroll(), true);
        }.bind(this));
      }
    },
    scroll: function(){
      var yOffset = window.pageYOffset,
          val     = (yOffset - this.starting)*this.rate,
          translateVal;
      if((this.max === 0) || (Math.abs(this.max) > val) && (yOffset > this.starting)){
        translateVal = val;
      } else if (yOffset <= this.starting) {
        translateVal = 0;
      } else {
        translateVal = this.max;
      }
      this.$el.css({
        '-webkit-transform':'translate3d(0,'+translateVal+'px,0)',
        '-moz-transform':'translate3d(0,'+translateVal+'px,0)',
        '-o-transform':'translate3d(0,'+translateVal+'px,0)',
        '-ms-transform':'translate3d(0,'+translateVal+'px,0)',
        'transform':'translate3d(0,'+translateVal+'px,0)'
      });
    },
    scrollWithOpacity: function(){
      var yOffset = window.pageYOffset,
          val     = (yOffset - this.starting)*this.rate,
          opacity = 1 - (yOffset/this.opacitySpread),
          opacity = (opacity < 0) ? 0 : opacity,
          translateVal,
          opacityVal;
      if((this.max === 0) || (Math.abs(this.max) > val) && (yOffset > this.starting)){
        translateVal = val;
        opacityVal = opacity;
      } else if (yOffset <= this.starting) {
        translateVal = 0;
        opacityVal = 1;
      } else {
        translateVal = this.max;
        opacityVal = 1;
      }
      this.$el.css({
        '-webkit-transform':'translate3d(0,'+translateVal+'px,0)',
        '-moz-transform':'translate3d(0,'+translateVal+'px,0)',
        '-o-transform':'translate3d(0,'+translateVal+'px,0)',
        '-ms-transform':'translate3d(0,'+translateVal+'px,0)',
        'transform':'translate3d(0,'+translateVal+'px,0)',
        '-moz-opacity': opacityVal,
        '-khtml-opacity': opacityVal,
        'opacity': opacityVal
      });
    }
  };
})(jQuery, window, document);