(function ($) {
  var page = 0,
    isLoading = false;

  function getList() {
    page++;
    isLoading = true;
    $.get('../../src/data/homelist.json', function (data) {
      var list = data.data.poilist || [];
      initContentList(list);
      isLoading = false;
      addClick();
    });
  }

  // 渲染是否时新到热门品牌标签
  function getBrand(data) {
    if (data.brand_type) {
      return '<div class="brand brand-pin">品牌</div>';
    } else {
      return '<div class="brand brand-xin">新到</div>';
    }
  }

  // 渲染月售
  function getMonthNum(data) {
    var num = data.month_sale_num;
    // 大于999采用999+
    if (num > 999) {
      return '999+';
    }
    return num
  }

  // 渲染商家活动
  function getOthers(data) {
    var array = data.discounts2,
      str = '';
    array.forEach(function (item, index) {
      // 内部的商家活动模版字符串
      var _str = '<div class="other-info">' +
        '<img src=$icon_url class="other-tag" />' +
        '<p class="other-content one-line">$info</p>' +
        '</div>';
      // 模版字符串替换数据
      _str = _str.replace('$icon_url', item.icon_url)
        .replace('$info', item.info);
      // 字符串拼接
      str += _str;
    })
    return str;
  }

  // 渲染星数
  function _getStars() {
    var starTmpl = '<div class="star-score iconfont">',
      _score = this.score.toString(),
      scoreArray = _score.split('.'), // 4.4
      fullstar = parseInt(scoreArray[0]), // 满星
      halfstar = parseInt(scoreArray[1]) >= 5 ? 1 : 0, // 半星
      nullstar = 5 - fullstar - halfstar, // 0星
      starstr = '';

    for (var i = 0; i < fullstar; i++) {
      starstr += '&#xe601;'
    }

    for (var j = 0; j < halfstar; j++) {
      starstr += '&#xe62f;'
    }

    for (var k = 0; k < nullstar; k++) {
      starstr += '&#xe600;'
    }

    starTmpl += starstr + '</div>';

    return starTmpl;
  }

  window.StarScore = function (score) {
    this.score = score || '';
    this.getStars = _getStars;
  }

  function initContentList(list) {
    var listTmpl = '<div class="list-item-content">' +
      '<img class="item-img" src=$pic_url />' +
      '$brand' +
      '<div class="item-info-content">' +
      '<p class="item-title">$name</p>' +
      '<div class="item-desc clearfix">' +
      '<div class="item-score">$wm_poi_score</div>' +
      '<div class="item-count">月售$monthNum</div>' +
      '<div class="item-distance">&nbsp;$distance</div>' +
      '<div class="item-time">$mt_delivery_time&nbsp;|</div>' +
      '</div>' +
      '<div class="item-price">' +
      '<div class="item-pre-price">$min_price_tip</div>' +
      '</div>' +
      '<div class="item-others">' +
      '$others' +
      '</div>' +
      '</div>' +
      '</div>';
    list.forEach(function (item, index) {
      var str = listTmpl.replace('$pic_url', item.pic_url)
        .replace('$name', item.name)
        .replace('$distance', item.distance)
        .replace('$min_price_tip', item.min_price_tip)
        .replace('$mt_delivery_time', item.mt_delivery_time)
        .replace('$brand', getBrand(item))
        .replace('$monthNum', getMonthNum(item))
        .replace('$others', getOthers(item))
        .replace('$wm_poi_score', new StarScore(item.wm_poi_score).getStars());
      $('.list-wrap').append($(str));
    })
  }

  // 按需加载
  function addEvent() {
    window.addEventListener('scroll', function () {
      var clientHeight = document.documentElement.clientHeight,
        scrollHeight = document.body.scrollHeight,
        scrollTop = document.documentElement.scrollTop || document.body.scrollTop,
        proDis = 30;

      if ((scrollTop + clientHeight) >= (scrollHeight - proDis)) {
        // 最多滚动加载3页
        if (page < 3) {
          // 在发送ajax请求时避免触发多次滚动加载
          if (isLoading) {
            return;
          }
          getList();
        } else {
          $('#loading').removeClass('loading').addClass('loaded').text('加载完成');
        }
      }
    });
  }

  // 绑定事件 点击跳转
  function addClick() {
    $('.list-item-content').click(function () {
      location.replace('../menu/menu.html');
    })
  }

  getList();
  addEvent();

})(Zepto)