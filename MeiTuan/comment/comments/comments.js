(function ($) {
  function getData() {
    $.getJSON('../src/data/comments.json', function (data) {
      createHtml(data.data.comments);
    })
  }

  // 获取用户头像
  function _getProfile(url) {
    if (url) return url;
    return 'http://i.waimai.meituan.com/static/img/default-avatar.png';
  }

  // 获取评论时间
  function _getTime(time) {
    return new Date(time * 1000).toLocaleDateString().replace(/\//g, '.');
  }

  // 获取用户评分
  function _getStars(score) {
    var _score = score.toString(),
      scoreArray = _score.split('.'), // 4.4
      fullstar = parseInt(scoreArray[0]), // 满星
      halfstar = parseInt(scoreArray[1]) >= 5 ? 1 : 0, // 半星
      nullstar = 5 - fullstar - halfstar, // 0星
      starStr = '<span class="score-star iconfont">',
      content = '';

    for (var i = 0; i < fullstar; i++) {
      starStr += '&#xe601;'
    }
    for (var j = 0; j < halfstar; j++) {
      starStr += '&#xe62f;'
    }
    for (var k = 0; k < nullstar; k++) {
      starStr += '&#xe600;'
    }

    starStr += '</span><span class="score-content">';

    switch (fullstar) {
      case 5:
        content = '超赞';
        break;
      case 4:
        content = '赞';
        break;
      case 3:
        content = '一般';
        break;
      case 2:
        content = '差';
        break;
      case 1:
        content = '极差';
        break;
    }

    starStr += content + '</span>'
    return starStr;
  }

  // 获取评论图片
  function _getImg(data) {
    var imgNum = data.length,
      imgHtml = '<div class="comment-img-wrap"><img class="comment-img" src="$url"/></div>';
    if (imgNum === 0) {
      return '';
    } else if (imgNum === 1) {
      var singleImg = imgHtml.replace('$url', data[0].url);
      return singleImg;
    } else {
      var multilineImg = '<div class="swiper-container"><div class="swiper-wrapper">';
      for (var i = 0; i < imgNum; i++) {
        multilineImg += '<div class="swiper-slide"><img class="comment-img" src="' +
          data[i].url + '" /></div>';
      }
      multilineImg += '</div><div class="swiper-pagination"></div></div>';
      return multilineImg;
    }
  }

  function createHtml(data) {
    var itemTmpl = '<div class="comment-item"><div class="user-info">' +
      '<div class="user-profile"><img class="user-img" src="$user-profile" /></div>' +
      '<div class="comment-time">$comment-time</div>' +
      '<div class="user-name">$user-name</div>' +
      '<div class="user-score">$user-score</div>' +
      '</div><div class="comment-wrap">' +
      '<div class="comment-content">$comment-content</div>' +
      '$comment-img</div></div>',
      str = '';

    data.forEach(function (item) {
      str = itemTmpl.replace('$user-profile', _getProfile(item.user_pic_url))
        .replace('$comment-time', _getTime(item.comment_time))
        .replace('$user-name', item.user_name)
        .replace('$user-score', _getStars(item.order_comment_score))
        .replace('$comment-content', item.comment)
        .replace('$comment-img', _getImg(item.comment_pics));

      $('.comments').append($(str));
    })

    var swiper = new Swiper('.swiper-container', {
      pagination: {
        el: '.swiper-pagination',
      }
    });
  }

  getData()

})(jQuery)