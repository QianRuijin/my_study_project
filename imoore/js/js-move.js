(function ($) {
  function Move($elem) {
    this.$elem = $elem;
    this.curX = parseFloat(this.$elem.css('left'));
    this.curY = parseFloat(this.$elem.css('top'));

  }

  Move.prototype.to = function (x, y) {
    x = (typeof x === 'number') ? x : this.curX;
    y = (typeof y === 'number') ? y : this.curY;
    if (this.curX === x && this.curY === y) return;

    this.$elem.trigger('move', [this.$elem]);

    var that = this;
    this.$elem.stop().animate({
      left: x,
      top: y
    }, function () {
      that.$elem.trigger('moved', [that.$elem]);
    });

    this.curX = x;
    this.curY = y;
  }

  Move.prototype.x = function (x) {
    this.to(x, null);
  }

  Move.prototype.y = function (y) {
    this.to(null, y);
  }

  $.fn.extend({
    move: function (x, y) {
      return this.each(function () {
        var $this = $(this),
          mode = $this.data('move');
        if (!mode) {
          $this.data('move', mode = new Move($this));
        }
        if (typeof x === 'number' && typeof y === 'number') {
          mode.to(x, y);
        }
      });
    },
    moveX: function (x) {
      return this.each(function () {
        var $this = $(this),
          mode = $this.data('moveX');
        if (!mode) {
          $this.data('moveX', mode = new Move($this));
        }
        if (typeof x === 'number') {
          mode.x(x);
        }
      })
    },
    moveY: function (y) {
      return this.each(function () {
        var $this = $(this),
          mode = $this.data('moveY');
        if (!mode) {
          $this.data('moveY', mode = new Move($this));
        }
        if (typeof y === 'number') {
          mode.y(y);
        }
      })
    }
  });

  /**测试 
    var $box = $('#box'),
    $box2=$('#box2'),
    $goBtn=$('#go-btn'),
    $backBtn=$('#back-btn');

    var move = new Move($box);

    $box.on('move moved', function(e){
      console.log(e.type);
    })

    $goBtn.click(function() {
         move.to(50, 50)
    })
    $backBtn.click(function() {
      move.to(0, 0)
    })
    */

})(jQuery)

/** 外部调用测试 */
/*
var $box = $('#box'),
  $box2=$('#box2'),
  $goBtn=$('#go-btn'),
  $backBtn=$('#back-btn');


  $box.on('move moved', function(e){
    console.log(e.type);
  })

  $goBtn.click(function() {
    $box.moveX(50)
  })
  $backBtn.click(function() {
    $box.moveX(0)
  })
  */