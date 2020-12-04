(function ($) {
  function getData() {
    $.getJSON('../src/data/restanurant.json', function (data) {
      createHtml(data.data);
    })
  }

  function createHtml(data) {
    var itemTmpl = '<ul class="items">' +
      '<li class="banner"><img src="$pic_url" class="banner-img"/></li>' +
      '<li class="bulletin"><p>提示:</p><p>$bulletin</p></li></ul>' +
      '<ul class="items">' +
      '<li class="address">地址: $address</li>' +
      '<li class="tel">电话: $phone</li>' +
      '<li class="qualify"><a href="$qualify_link" class="qualify_link">' +
      '$qualify_content</a></li>' +
      '</ul><ul class="items">' +
      '<li class="shipping_time">配送时段: $shipping_time</li>' +
      '<li class="shipping_fee">配送费用: $shipping_fee</li>' +
      '<li class="min_price">起送价格: $min_price</li></ul>',
      str = '';

    str = itemTmpl.replace('$pic_url', data.pic_url)
      .replace('$bulletin', data.bulletin)
      .replace('$address', data.address)
      .replace('$phone', data.call_center)
      .replace('$qualify_link', data.poi_qualify_info.url)
      .replace('$qualify_content', data.poi_qualify_info.content)
      .replace('$shipping_time', data.shipping_time)
      .replace('$shipping_fee', data.shipping_fee)
      .replace('$min_price', data.min_price);

    $('.introduction').html(str);
  }

  getData()

})(jQuery)