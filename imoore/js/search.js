(function ($) {
  var $search = $('.search'),
      $form = $search.find('.search-form'),
      $input = $search.find('.search-inputbox'),
      $layer = $search.find('.search-layer'),
      timer = null;

  // 提交验证是否为空
  $form.on('submit', function () {
    if ($.trim($input.val()) === '') {
      return false;
    }
  })

  // 自动完成
  $input.on('input', function() {
    var $inputVal = $.trim($input.val()),
        url = 'https://suggest.taobao.com/sug?code=utf-8&_ksTS=1484204931352_18291&callback=jsonp18292&k=1&area=c2c&bucketid=6&q=' + encodeURIComponent($inputVal);
        
    clearInterval(timer);
    if ($inputVal) {
      timer = setTimeout(function() {
        $.ajax({
          url: url,
          dataType: 'jsonp',
        }).done(function(data) {
          var html = '',
              dataNum = data['result'].length,
              showNum = dataNum > 10 ? 10 : dataNum;
          if (dataNum === 0) {
            $layer.hide().html('');
            return;
          }
          for (var i = 0; i < showNum; i++) {
            html += '<li class="search-layer-item text-ellipsis">' + data['result'][i][0] + '</li>';
          }
          $layer.html(html).show();
        }).fail(function() {
          $layer.hide().html('');
        });
      },200);
    } else {
      $layer.hide().html('');
    }
  });

  // 点击展示项 提交表单
  $layer.on('click', '.search-layer-item', function() {
    $input.val($(this).text());
    $form.submit();
  });
  // 下拉框的显示状态控制
  $input.on('focus', function() {
    $layer.show();
  }).on('click', function(e) {
    return false;
  });

  
  $(document).on('click', function() {
    $layer.hide();
  });
   
  $search.on('mouseleave', function() {
    setTimeout(function() {
      $layer.hide();
    },500);
  })
})(jQuery);