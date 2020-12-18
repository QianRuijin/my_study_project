// header区 search脚本
$.fn.UiSearh = function () {
  var ui = $(this);

  $(".search-selected", ui).click(function () {
    $('.search-list').show();
    return false;
  })

  $(".search-list a", ui).click(function () {
    $(".search-selected").text($(this).text());
    $('.search-list').hide();
    return false;
  });

  $('body').on('click', function () {
    $('.search-list').hide();
  })
}

//search脚本调用
$(function () {
  $('.search').UiSearh();
})

//医院体系区tab卡脚本
$(".label-item").on("click", function () {
  $(this).addClass("selected").siblings().removeClass("selected");
  $(".page-item").eq($(this).index()).removeClass("hidden").siblings().addClass("hidden");
})