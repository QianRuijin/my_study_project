(function ($) {
  function getData() {
    $.getJSON('../src/data/comments.json', function (data) {
      createHtml(data.data);
    })
  }

  function createHtml(data) {
    var str = '<ul class="comment-tag clearfix">',
      tags = data.comment_categories;

    for (var i = 0, len = tags.length; i < len; i++) {
      str += '<li class="tag-item">' + tags[i] + '</li>';
    }
    str += '</ul>';
    $('.comment-filter').html(str);
  }

  getData()

})(jQuery)