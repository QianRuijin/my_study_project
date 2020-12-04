(function ($) {
  function getList() {
    $.get('../src/data/food.json', function (data) {
      window.food_spu_tags = data.data.food_spu_tags || [];
      initContentList(window.food_spu_tags);
    })
  }

  // left
  // 渲染item内容
  function getItemContent(data) {
    if (data.icon) {
      return '<img class="item-icon" src=' + data.icon + ' />' + data.name;
    } else {
      return data.name;
    }
  }
  // 渲染列表
  function initContentList(list) {
    var leftTmpl = '<div class="left-item">' +
      '<div class="item-text">$getItemContent' +
      '</div>';
    list.forEach(function (item) {
      var str = leftTmpl.replace('$getItemContent', getItemContent(item)),
        $target = $(str);
      // 将item数据挂载到left-item上面
      $target.data('itemData', item);
      $('.left-bar-inner').append($target);
    })
    // 激活第一项
    $('.left-item').first().click();
  }

  // right
  // 渲染右侧title
  function initRightTitle(str) {
    $('.right-title').text(str);
  }
  // 渲染右侧列表
  function initRightList(list, toTop) {
    var rightTmpl = '<div class="menu-item">' +
      '<img class="img" src=$picture />' +
      '<div class="menu-item-right">' +
      '<p class="item-title">$name</p>' +
      '<p class="item-desc">$description</p>' +
      '<p class="item-zan">$praise_content</p>' +
      '<p class="item-price">¥$min_price<span class="unit">/$unit</span></p>' +
      '</div>' +
      '<div class="select-content">' +
      '<div class="minus"></div>' +
      '<div class="count">$chooseCount</div>' +
      '<div class="plus"></div>' +
      '</div>' +
      '</div>';
    // 每次加载新内容前清空之前的
    $('.right-list-inner').html('');
    if (toTop){
      $('.right-list-inner').scrollTop(0);
    }
    // 渲染新内容
    list.forEach(function (item) {
      if (!item.chooseCount) {
        item.chooseCount = 0;
      }
      var str = rightTmpl.replace('$picture', item.picture)
        .replace('$name', item.name)
        .replace('$description', item.description)
        .replace('$praise_content', item.praise_content)
        .replace('$min_price', item.min_price)
        .replace('$unit', item.unit)
        .replace('$chooseCount', item.chooseCount),
        $target = $(str);

      $target.data('itemData', item);
      $('.right-list-inner').append($target);
    })
  }
  // 渲染右侧
  function initright(data, toTop) {
    initRightList(data.spus || [], toTop);
    initRightTitle(data.name);
    addClick();
  }

  window.Right = {
    refresh: initright
  }

  // 事件绑定
  $('.menu-inner').on('click', '.left-item', function (e) {
    var $target = $(e.currentTarget);
    // 点击当前展示项不会触发更新
    if ($target.hasClass('active')) return;
    $target.addClass('active');
    $target.siblings().removeClass('active');
    // 将数据传给右侧详情列表进行渲染
    window.Right.refresh($target.data('itemData'), 'toTop');
  });

  function addClick() {
    // 点菜
    $('.menu-item').on('click', '.plus', function (e) {
      var $count = $(e.currentTarget).parent().find('.count'),
        $item = $(e.currentTarget).parents('.menu-item').first(),
        itemData = $item.data('itemData');

      $count.text(parseInt($count.text() || '0') + 1);
      itemData.chooseCount = itemData.chooseCount + 1;

      window.ShopBar.renderItems();
    });
    $('.menu-item').on('click', '.minus', function (e) {
      var $count = $(e.currentTarget).parent().find('.count');

      if ($count.text() == 0) return;
      $count.text(parseInt($count.text() || '0') - 1);

      var $item = $(e.currentTarget).parents('.menu-item').first(),
        itemData = $item.data('itemData');

      itemData.chooseCount = itemData.chooseCount - 1;

      window.ShopBar.renderItems();
    });
  }

  getList();

})(jQuery);