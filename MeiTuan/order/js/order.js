(function ($) {
  var isLoading = false,
    page = 0;

  function getData() {
    page++;
    isLoading = true;
    $.getJSON('../../src/data/orders.json', function (data) {
      setTimeout(function () {
        var list = data.data.digestlist || [];
        createOrder(list);
        isLoading = false;
      }, 1000)
    })
  }

  // 渲染评价
  function getComment(data) {
    var evaluation = !data.is_comment;
    if (evaluation) {
      return '<div class="evaluation clearfix">' +
        '<div class="evaluation-btn">评价</div>' +
        '</div>'
    }
    return '';
  }

  // 渲染订单总价
  function getTotalPrice(data) {
    var str = '<div class="product-item">' +
      '<span>...</span>' +
      '<div class="p-total-count">' +
      '总计' + data.product_count + '个菜，实付' +
      '<span class="total-price">¥' + data.total + '</span>' +
      '</div>' +
      '</div>'
    return str;
  }

  // 渲染订单内容
  function getProduct(data) {
    var list = data.product_list || [],
      str = '';

    list.push({
      type: 'more'
    });

    list.forEach(function (item) {
      if (item.type === 'more') {
        str += getTotalPrice(data);
      } else {
        str += '<div class="product-item">' +
          item.product_name +
          '<div class="p-conunt">x' +
          +item.product_count +
          '</div>' +
          '</div>';
      }
    })
    return str;
  }

  // 生成订单
  function createOrder(data) {
    var itemTmpl = '<div class="order-item">' +
      '<div class="order-item-inner">' +
      '<img class="item-img" src=$poi_pic />' +
      '<div class="item-right">' +
      '<div class="item-top">' +
      '<p class="order-name one-line">$poi_name</p>' +
      '<div class="arrow"></div>' +
      '<div class="order-state">$status_description</div>' +
      '</div>' +
      '<div class="item-bottom">$getProduct</div>' +
      '</div>' +
      '</div>' +
      '$getComment' +
      '</div>',
      itemHtml = '';

    data.forEach(function (item, index) {
      itemHtml = itemTmpl
        .replace('$poi_pic', item.poi_pic)
        .replace('$poi_name', item.poi_name)
        .replace('$status_description', item.status_description)
        .replace('$getProduct', getProduct(item))
        .replace('$getComment', getComment(item));
      $('.order-list').append($(itemHtml));
    })
  }

  // 按需加载
  function addEvent() {
    window.addEventListener('scroll', function () {
      var clientHeight = document.documentElement.clientHeight,
        scrollHeight = document.body.scrollHeight,
        scrollTop = document.documentElement.scrollTop || document.body.scrollTop,
        preDis = 30;

      if (scrollTop + clientHeight >= (scrollHeight - preDis)) {
        if (page < 3) {
          if (isLoading) {
            return;
          }
          getData();
        } else {
          $('#loading').removeClass('loading').addClass('loaded').text('加载完成');
        }
      }
    });
  }

  getData();
  addEvent();
})(Zepto)