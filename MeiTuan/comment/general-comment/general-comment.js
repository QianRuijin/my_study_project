(function ($) {
  function getData() {
    $.getJSON('../src/data/comments.json', function (data) {
      createHtml(data.data);
    })
  }

  // 渲染星数
  function _getStars(score) {
    var _score = score.toString(),
      scoreArray = _score.split('.'), // 4.4
      fullstar = parseInt(scoreArray[0]), // 满星
      halfstar = parseInt(scoreArray[1]) >= 5 ? 1 : 0, // 半星
      nullstar = 5 - fullstar - halfstar, // 0星
      starStr = '';

    for (var i = 0; i < fullstar; i++) {
      starStr += '&#xe601;'
    }
    for (var j = 0; j < halfstar; j++) {
      starStr += '&#xe62f;'
    }
    for (var k = 0; k < nullstar; k++) {
      starStr += '&#xe600;'
    }
    return starStr;
  }

  function createHtml(data) {
    var itemTmpl = '<div class="general-wrap">' +
      '<dl class="general-container"><dt class="general-item">商家评分</dt>' +
      '<dd class="general-star iconfont">$star</dd>' +
      '<dd class="general-score">$comment_score</dd></dl>' +
      '<dl><dt class="single-item">食品</dt>' +
      '<dd class="single-score">$food_score</dd></dl>' +
      '<dl><dt class="single-item">包装</dt>' +
      '<dd class="single-score">$pack_score</dd></dl>' +
      '<dl><dt class="single-item">配送</dt>' +
      '<dd class="single-score">$delivery_score</dd></dl></div>',
      str = '';

    str = itemTmpl.replace('$star', _getStars(data.comment_score))
      .replace('$comment_score', data.comment_score)
      .replace('$food_score', data.food_score)
      .replace('$pack_score', data.pack_score)
      .replace('$delivery_score', data.delivery_score);

    $('.general-comment').html(str);
  }

  getData()

})(jQuery)