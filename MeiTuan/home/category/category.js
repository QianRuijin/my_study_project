(function ($) {
  function getData($elem, success) {
    $.getJSON('../../src/data/head.json', function (data) {
      if (typeof success === 'function') success($elem, data);
    })
  }

  function createCategory($elem, data) {
    var filter = data.data.primary_filter,
      pageNum = Math.ceil(filter.length / 8),
      html = '<div class="swiper-container"><div class="swiper-wrapper">';

    for (var i = 0; i < pageNum; i++) {
      var pageItem = filter.splice(0, 8);
      html += '<div class="swiper-slide">';
      for (var j = 0; j < pageItem.length; j++) {
        var itemTmpl = '<div class="category-item">' +
          '<img class="item-icon" src=$url />' +
          '<p class="item-name">$name</p>' +
          '</div>',
          itemHtml = itemTmpl.replace('$url', pageItem[j].url).replace('$name', pageItem[j].name);
        html += itemHtml;
      }
      html += '</div>';
    }
    html += '</div></div>';
    $elem.html(html);
    var swiper = new Swiper('.swiper-container');
  }

  getData($('.category-content'), createCategory);
})(Zepto)