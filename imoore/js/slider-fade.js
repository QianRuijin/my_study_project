// 定义插件
(function($) {
  'use strict';

  function Slider($elem, options) {
    this.$elem = $elem;
    this.options = options;
    this.$items = this.$elem.find('.slider-item');
    this.$indicators = this.$elem.find('.slider-indicator');
    this.$controls = this.$elem.find('.slider-control');
    this.curIndex = this.options.activeIndex;
    this.totalNum = this.$items.length;

    this._init();

    // 绑定事件
    var that = this;
    this.$elem
    .hover(function() {
      that.$controls.show();
      that.pause()
    }, function() {
      that.$controls.hide();
      that.auto();
    })
    .on('click', '.slider-control-left', function() {
      that.changeto(that._getindex(that.curIndex - 1));
    })
    .on('click', '.slider-control-right', function() {
      that.changeto(that._getindex(that.curIndex + 1));
    })
    .on('click', '.slider-indicator', function() {
      that.changeto(that.$indicators.index(this));
    })

    // 自动播放
    if (this.options.interval && !isNaN(Number(this.options.interval))){
      this.$elem.hover($.proxy(this.pause, this), $.proxy(this.auto, this));
      this.auto();
    }
  }

  Slider.DEFAULTS = {
    activeIndex: 0,
    interval: 0
  };

  Slider.prototype._init = function() {
    this.$items.eq(this.curIndex).show();
    this.$indicators.removeClass('active');
    this.$indicators.eq(this.curIndex).addClass('active');
  };

  Slider.prototype._getindex = function(index) {
    if (isNaN(index)) return 0;
    if (index > this.totalNum - 1) return 0;
    if (index < 0) return this.totalNum - 1;
    return index;
  }

  Slider.prototype.changeto = function(index) {
    if (this.curIndex === index) return;
    this.$items.eq(this.curIndex).hide();
    this.$items.eq(index).show();
    this.$indicators.removeClass('active');
    this.$indicators.eq(index).addClass('active');
    this.curIndex = index;
  };
  
  Slider.prototype.auto = function() {
    var that = this;
    this.autointerval = setInterval(function() {
      that.changeto(that._getindex(that.curIndex + 1));
      console.log(that.curIndex);
    }, this.options.interval)
  };

  Slider.prototype.pause = function() {
    clearInterval(this.autointerval);
  };


  $.fn.extend({
    slide: function(option) {
      return this.each(function() {
        var $this = $(this),
        slider = $this.data('slider'),
        options = $.extend({}, Slider.DEFAULTS, $(this).data(), typeof option === 'object' && option);
        if (!slider) {
          $this.data('slider', slider = new Slider($this, options));
        }
        if (typeof slider[option] === 'function') {
          slider[option]();
        }
      });
    }
  });
})(jQuery)

// 调用插件
var $carousel = $('#carousel');

$carousel.slide({
  interval: 1000
})



/**
 (function($) {
  function Slide ($elem, option){
    this.$elem = $elem;
    this.options = option;
    this.$items = this.$elem.find('.slider-item');
    this.$indicators = this.$elem.find('.slider-indicator');
    this.$contorls = this.$elem.find('.slider-control');
    this.curIndex = this.options.activeIndex || 0;
    this.interval = this.options.interval || 1000;
    this.totalNum = this.$items.length;

    this._init();

    // 绑定事件
    var that = this;
    this.$elem
    .hover(function() {
      that.$contorls.show();
    }, function() {
      that.$contorls.hide();
    })
    .on('click', '.slider-control-left', function() {
      that._changeto(that._getindex(that.curIndex - 1));
    })
    .on('click', '.slider-control-right', function() {
      that._changeto(that._getindex(that.curIndex + 1));
    })
    .on('click', '.slider-indicator', function() {
      that._changeto(that._getindex(that.$indicators.index(this)));
    })
    
    // 自动播放
    if (this.options.interval && !isNaN(Number(this.options.interval))){
      this.$elem.hover($.proxy(this.pause, this), $.proxy(this.auto, this));
      this.auto();
    }
  }

  Slide.prototype._init = function() {
    this.$items.eq(this.curIndex).show();
    this.$indicators.removeClass('active');
    this.$indicators.eq(this.curIndex).addClass('active');
  }

  Slide.prototype._getindex = function(index) {
    if (isNaN(index)) return 0;
    if (index > this.totalNum -1) return 0;
    if (index < 0) return this.totalNum -1;
    return index;
  }

  Slide.prototype._changeto = function(index) {
    if (index === this.curIndex) return;
    this.$items.eq(this.curIndex).hide();
    this.$items.eq(index).show();
    this.$indicators.eq(this.curIndex).removeClass('active');
    this.$indicators.eq(index).addClass('active');
    this.curIndex = index;
  }

  Slide.prototype.auto = function() {
    var that = this;
    this.interval = setInterval(function() {
      that._changeto(that._getindex(that.curIndex + 1));
    }, 1000);
  }

  Slide.prototype.pause = function() {
    clearInterval(this.interval);
  }

  window.$Slide = Slide;
})(jQuery)

// 调用组件
var $carousel = $('#carousel'),
    slide = new $Slide($carousel, {interval: 0, activeIndex: 3});



 * 
 */