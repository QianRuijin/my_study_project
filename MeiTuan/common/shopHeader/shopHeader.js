(function ($) {
  function init() {
    var items = [{
        key: 'menu',
        text: '点菜'
      }, {
        key: 'comment',
        text: '评价'
      }, {
        key: 'restanurant',
        text: '商家'
      }],
      itemTmpl = '<a class="$key tab-item" data- href="../$key/$key.html">' + '$text' + '</a>',
      str = '',
      arr = window.location.pathname.split('/'), // 找到当前页面的url来确定key值
      page = arr[arr.length - 1].replace('.html', '');

    items.forEach(function (item) {
      str += itemTmpl.replace(/\$key/g, item.key)
        .replace('$text', item.text)
    });

    $('.tab-bar').append($(str));
    // 将当前的页面对应的key值的a元素设置active的class
    $('a.' + page).addClass('active');

    // 链接优化
    $('.tab-bar').on('click', '.tab-item', function (e) {
      if ($(this).hasClass(page)) {
        e.preventDefault();
      }
    })
  }

  init();

})(jQuery)