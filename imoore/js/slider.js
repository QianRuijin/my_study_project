(function($) {
  function Slide ($elem, option){
    this.$elem = $elem;
    this.options = option;
    this.$items = this.$elem.find('.slider-item');
    this.$indicators = this.$elem.find('.slider-indicator');
    this.$contorls = this.$elem.find('.slider-control');
    this.totalNum = this.$items.length;
    this.curIndex = this._getindex(this.options.activeIndex);
    this.interval = this.options.interval || 1000; 
    this.animation = this.options.animation || 'fade';

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
      that.to(that._getindex(that.curIndex - 1), 1);
    })
    .on('click', '.slider-control-right', function() {
      that.to(that._getindex(that.curIndex + 1), -1);
    })
    .on('click', '.slider-indicator', function() {
      that.to(that._getindex(that.$indicators.index(this)));
    })

    // 自动播放
    if (this.options.interval && !isNaN(Number(this.options.interval))){
      this.$elem.hover($.proxy(this.pause, this), $.proxy(this.auto, this));
      this.auto();
    }
  }

  Slide.prototype._init = function() {    
    this.$indicators.removeClass('active');
    this.$indicators.eq(this.curIndex).addClass('active');

    if (this.animation === 'slide') {
      this.itemWidth = this.$items.eq(0).width();
      this.$items.removeClass('fade').addClass('slide');
      this.$items.eq(this.curIndex).css('left', 0);
      this.to = this._slide;
    } else {
      this.$items.removeClass('slide').addClass('fade').hide();
      this.$items.eq(this.curIndex).show();
      this.to = this._fade;
    }
  }

  Slide.prototype._getindex = function(index) {
    if (isNaN(index)) return 0;
    if (index > this.totalNum -1) return 0;
    if (index < 0) return this.totalNum -1;
    return index;
  }

  Slide.prototype._slide = function(index, direction) {
    if (this.curIndex === index) return;

    if (!direction) {
      if (this.curIndex < index) {
        direction = -1
      } else {
        direction = 1
      }
    }
    // 将滑入项目进入准备区域
    this.$items.eq(index).css('left', -1 * direction * this.itemWidth);
    // 切换动画
    this.$items.eq(this.curIndex).moveX(direction * this.itemWidth);
    this.$items.eq(index).moveX(0);
    this.$indicators.eq(this.curIndex).removeClass('active');
    this.$indicators.eq(index).addClass('active');

    this.curIndex = index;
  }

  Slide.prototype._fade = function(index) {
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
      that.to(that._getindex(that.curIndex + 1), -1);
    }, 1000);
  }

  Slide.prototype.pause = function() {
    clearInterval(this.interval);
  }

  window.$Slide = Slide;
})(jQuery)

// 调用组件
var $carousel = $('#carousel'),
    slide = new $Slide($carousel, {animation: 'slide', interval: 3000, activeIndex: 0});