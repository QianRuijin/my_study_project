(function($) {
  $('#category').find('.dropdown').on('hover', function () {
            loadOnce($(this), createCategoryDetail);
        });


  function createCategoryDetail($elem, data) {
    var html = '';

    for (var i = 0; i < data.length; i++) {            
        html += '<dl class="category-detail cf"><dt class="category-detail-title fl"><a href="###" target="_blank" class="category-detail-title-link">' + data[i].title + '</a></dt><dd class="category-detail-item fl">';

        for (var j = 0; j < data[i].items.length; j++) {
            html += '<a href="###" target="_blank" class="link">' + data[i].items[j] + '</a>';
        }

        html += '</dd></dl>';
    }
    $elem.find('.dropdown-layer').html(html);
  };

  function loadOnce($elem, success) {
    var dataLoad = $elem.data('load');

    if(!dataLoad) return;

    if(!$elem.data('loaded')){
      $elem.data('loaded', true);
      $.getJSON(dataLoad).done(function(data) {
        if (typeof success === 'function') success($elem, data);
      }).fail(function() {
        $elem.data('loaded', false);
      })
    }
  };

})(jQuery)

/**
 * var $dropdown = $('.category-list .dropdown');
 * console.log()

 * for(var i = 0, n = $dropdown.length; i < n; i++) {
 *   var dropdown = $dropdown[i],
 *       datasrc = $($dropdown[i]).data('load');
 *   (function(i) {
 *     $.getJSON(datasrc, function(data) {
 *       var html = '';
 *       for (var j = 0, m = data.length; j < m; j++) {
 *         var dataItem = data[j];
 *         html += '<dt class="category-detail-title fl"><a href="###" target="_blank" class="category-detail-title-link">' + dataItem.title + '</a></dt><dd class="category-detail-item fl">';
 *         for (var k = 0, p = dataItem.items.length; k < p; k++) {
 *           html += '<a href="###" target="_blank" class="link">' + dataItem.items[k] + '</a>';
 *         }
 *         html += '</dd></dl>';
 *       }
 *       html = '<dl class="category-detail cf">' + html + '</dd></dl>';
 *       $dropdown.find('.dropdown-layer').html(html)
 *       console.log();
 *       
 *     })

 *   })(i)
 * }
 * 
 */