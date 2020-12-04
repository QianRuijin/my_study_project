(function($){
  function Tab($elem, option) {
    this.$elem = $elem;
    this.options = option;
    this.$items = this.$elem.find('.tab-item');
    this.$pages = this.$elem.find('.floor-tab-page');
    this.event = this.options.event === 'click' ? 'click' : 'mouseenter';
    this.pageNum = this.$pages.length;
    this.curIndex = this._getIndex(this.options.activeIndex);
    this.interval = this.options.interval;
    this.delay = this.options.delay;

    // 初始化
    this._init();
    
    // 绑定事件
    var that = this,
        timer = null;
    this.$elem
    .on(this.event, '.tab-item', function() {
      var self = this;
      if (that.delay) {
        clearTimeout(timer);
        timer = setTimeout(function() {
          that.to(that.$items.index(self));
        }, that.delay);
      } else {
        that.to(that.$items.index(this));
      }
    })

    // 自动播放
    if (this.interval && !isNaN(Number(this.interval))){
      this.$elem.find('.container').hover($.proxy(this.pause, this), $.proxy(this.auto, this));
      this.auto();
    }
  }

  Tab.DEFAULTS = {
    event: 'mouseenter',
    activeIndex: 0,
    interval:0,
    delay:0
  };
  // animation: slide 滑动切换方式体验极差

  Tab.prototype._init = function() {
    this.$items.removeClass('active');
    this.$items.eq(this.curIndex).addClass('active');
    this.$pages.removeClass('hiden').hide();
    this.$pages.eq(this.curIndex).show();
  }

  Tab.prototype._getIndex = function(index) {
    if (isNaN(index)) return 0;
    if (index > this.pageNum - 1) return 0;
    if (index < 0) return this.pageNum - 1;
    return index;
  }

  Tab.prototype.to = function(index) {
    if (this.curIndex === index) return;
    this.$pages.eq(this.curIndex).hide();
    this.$pages.eq(index).show();
    this.$items.eq(this.curIndex).removeClass('active');
    this.$items.eq(index).addClass('active');
    this.curIndex = index;
  }

  Tab.prototype.auto = function() {
    var that = this;
    this.autointerval = setInterval(function() { 
      that.to(that._getIndex(that.curIndex + 1));
    }, this.interval);
  }

  Tab.prototype.pause = function() {
    clearInterval(this.autointerval);
  }

  $.fn.extend({
    tab: function(option){
      return this.each(function() {
        var $this = $(this),
            tab = $this.data('tab'),
            options = $.extend({}, Tab.DEFAULTS, $this.data(), typeof option === 'object' && option);

        if (!tab && typeof option !== 'object') return;

        if (!tab) {
          $this.data('tab', tab = new Tab($this, options));
        }

        if (typeof tab[option] === 'function') {
          tab[option]();
        }
      });
    }
  })
  
})(jQuery)
