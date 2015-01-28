;(function ( $, window, document, undefined ) {
  //Parallax Background Image on Scroll
  var inc = 0,
      $window;
  $.fn.parallaxScroll = function(options){
    var options  = options || {};
    return this.each(function() {
      var $this    = $(this),
          data     = $this.data('plugin_parallaxScroll');
      if(data) {
        $this.data('plugin_parallaxScroll').init(options);
      } else {
        data = new ParallaxScroll(this, options);
        $this.data('plugin_parallaxScroll', data);
      }
    });
  }
  var ParallaxScroll = function ParallaxScroll(element, options){
    this.$el        = $(element);
    this.rate       = options.rate || .5;
    this.max        = options.max || 0;  // maximum pixel distance to translate the element

    this.currentVal = 0;

    if(!this.hasOwnProperty('id')) {
      inc++;
      this.id = inc;
    }

    if(options.opacity){
      this.opacity        = true;
      this.opacitySpread  = options.opacitySpread || 500;
    }
    this.init(options);
  };
  ParallaxScroll.prototype = {
    init: function(options){
      $window = $(window);
      var _this   = this;
      this.starting = options.starting || 0;  // pixel distance from top of the element to start animation
      if(this.starting !== 0){
        this.starting = this.$el.offset().top + (this.starting);
      }

      this.destroy();
      if(!this.isMobile()){
        if(this.opacity){
          this.scrollWithOpacity();
          $window.on('scroll.parallaxScroll'+this.id,function() {
            $.throttle(150, false, _this.scrollWithOpacity(), true);
          }.bind(this));
        } else {
          this.scroll();
          $window.on('scroll.parallaxScroll'+this.id,function() {
            $.throttle(150, false, _this.scroll(), true);
          }.bind(this));
        }
      }
    },
    destroy: function(){
      var _this   = this;
      $window.off('scroll.parallaxScroll'+this.id);
      if(this.opacity){
        this.$el.css({
          '-webkit-transform':'',
          '-moz-transform':'',
          '-o-transform':'',
          '-ms-transform':'',
          'transform':'',
          '-moz-opacity': '',
          '-khtml-opacity': '',
          'opacity': ''
        });
      } else {
        this.$el.css({
          '-webkit-transform':'',
          '-moz-transform':'',
          '-o-transform':'',
          '-ms-transform':'',
          'transform':''
        });
      }
    },
    scroll: function(){
      var _this   = this;
      var yOffset = window.pageYOffset,
          val     = parseInt((yOffset - this.starting)*this.rate, 10),
          translateVal;
      if((this.max === 0) || (Math.abs(this.max) > val) && (yOffset > this.starting)){
        translateVal = val;
      } else if (yOffset <= this.starting) {
        translateVal = 0;
      } else {
        translateVal = this.max;
      }
      if(this.currentVal !== translateVal){
        this.currentVal = translateVal;
        this.$el.css({
          '-webkit-transform':'translate3d(0,'+translateVal+'px,0)',
          '-moz-transform':'translate3d(0,'+translateVal+'px,0)',
          '-o-transform':'translate3d(0,'+translateVal+'px,0)',
          '-ms-transform':'translate3d(0,'+translateVal+'px,0)',
          'transform':'translate3d(0,'+translateVal+'px,0)'
        });
      }
    },
    scrollWithOpacity: function(){
      var _this   = this;
      var yOffset = window.pageYOffset,
          val     = parseInt((yOffset - this.starting)*this.rate,10),
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
        opacityVal = 0;
      }
      if(this.currentVal !== translateVal){
        this.currentVal = translateVal;
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
    },
    isMobile: function(){
      if($(window).width() < 768) {
        return true;
      }
      if (window.navigator.appName === "Microsoft Internet Explorer") {
        return document.documentMode < 8;
      }
      if (/iP(od|hone)/i.test(window.navigator.userAgent)) {
        return true;
      }
      if (/Android/i.test(window.navigator.userAgent)) {
        if (/Mobile/i.test(window.navigator.userAgent)) {
          return true;
        }
      }
      return false;
    }
  };
})(jQuery, window, document);