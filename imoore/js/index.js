(function ($) {
  // 轮播图组件调用
  var $carousel = $('#carousel'),
    slide = new $Slide($carousel, {
      animation: 'slideBlock',
      interval: 1000,
      activeIndex: 0
    });

  // 楼层按需加载
  var $win = $(window),
    $doc = $(document),
    $floor = $('.floor');

  function isVisible($elem) {
    return $win.height() + $win.scrollTop() > $elem.offset().top && $win.scrollTop() < $elem.offset().top + $elem.height();
  }

  function timeToShow() {
    $floor.each(function (index, elem) {
      if (isVisible($(elem))) {
        $doc.trigger('floor-show', [index, elem]);
      }
    })
  }

  function buildFloor(floorData) {
    var html = '';
    html += '<div class="container">';
    html += buildFloorHead(floorData);
    html += buildFloorBody(floorData);
    html += '</div>'

    return html;
  }

  function buildFloorHead(floorData) {
    var html = '';
    html += '<div class="floor-top"><h2 class="floor-title fl"><span class="floor-title-sign">' +
      floorData.num +
      'F</span><span class="floor-title-text">' +
      floorData.text +
      '</span></h2><ul class="tab-item-wrap fr">';

    for (var i = 0; i < floorData.tabs.length; i++) {
      html += '<li class="fl"><a href="javascript:;" class="tab-item">' +
        floorData.tabs[i] +
        '</a></li>';

      if (i !== floorData.tabs.length - 1) {
        html += '<li class="floor-divider fl text-hidden">分隔线</li>';
      }
    }

    html += '</ul></div>';

    return html;
  }

  function buildFloorBody(floorData) {
    var html = '';
    html += '<div class="floor-body">';
    for (var i = 0; i < floorData.items.length; i++) {
      html += '<div class="floor-tab-page">';

      for (var j = 0; j < floorData.items[i].length; j++) {
        html += '<div class="floor-item fl"><a href="javascript:;" class="floor-commodity link">' +
          '<img src="img/floor/' +
          floorData.num + '/' + (i + 1) + '/' + (j + 1) +
          '.jpg" class="floor-commodity-img" /></a><p class="floor-commodity-info">' +
          '<a href="###" class="link">' +
          floorData.items[i][j].name +
          '</a></p><p class="floor-commidity-price">' +
          floorData.items[i][j].price +
          '</p></div>';
      }
      html += '</div>';
    }
    html += '</div>';

    return html;
  }

  function lazyLoadFloor() {
    var items = [],
      loadedItemNum = 0,
      totalItemNum = $floor.length,
      loadItemFn = null;

    $doc.on('floor-show', loadItemFn = function (e, index, elem) {
      if (items[index] !== 'loaded') {
        $doc.trigger('floor-loadItem', [index, elem]);
      }
    });

    $doc.on('floor-loadItem', function (e, index, elem) {
      var html = buildFloor(floorData[index]),
        $elem = $(elem);
      items[index] = 'loaded';
      loadedItemNum++;

      if (loadedItemNum === totalItemNum) {
        $doc.trigger('floor-itemsLoaded');
      }
      $elem.html(html);
      $elem.tab({
        interval: 3000,
        delay: 200,
      });
    });

    $doc.on('floor-itemsLoaded', function (e) {
      $doc.off('floor-show', loadItemFn);
      $win.off('scroll resize', timeToShow);

    })
  }

  $win.on('scroll resize', timeToShow);
  timeToShow();
  lazyLoadFloor();

  // elevator
  var $elevator = $('#elevator'),
    $elevatorItems = $elevator.find('.elevator-item'),
    elevatorTimer = null;

  function whichFloor() {
    var num = -1;
    $floor.each(function (index, elem) {
      var $elem = $(elem);
      num = index;
      if ($win.scrollTop() + $win.height() / 2 < $elem.offset().top) {
        num = index - 1;
        return false;
      }
    });
    return num;
  }

  function setElevator() {
    var num = whichFloor();

    if (num === -1) { // hide
      $elevator.fadeOut();
    } else { // show
      $elevator.fadeIn();
      $elevatorItems.removeClass('elevator-active');
      $elevatorItems.eq(num).addClass('elevator-active');
    }
  };

  setElevator();

  $win.on('scroll resize', function () {
    clearTimeout(elevatorTimer);
    elevatorTimer = setTimeout(setElevator, 150);
  });

  // 返回顶部
  $('#backToTop').on('click', function () {
    $('html, body').animate({
      scrollTop: 0
    });
  });

})(jQuery)