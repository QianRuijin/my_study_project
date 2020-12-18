//封装方法
function byId(id) {
  return typeof (id) === "string" ? document.getElementById(id) : id;
}

//页面加载完成后调用函数
window.onload = function () {
  var play = null, //用于接收间歇调用返回值
    index = 0,
    main = byId("main"),
    label = byId("tab").getElementsByTagName("div"),
    pics = byId("banner").getElementsByTagName("div"),
    number = label.length; //label.length===pics.length

  //图片切换方法
  function change() {
    for (var j = 0; j < number; j++) {
      pics[j].style.display = "none";
      label[j].className = "label";
    }
    label[index].className = "label active";
    pics[index].style.display = "block";
  }

  //自动轮播函数   
  function start() {
    play = setInterval(function () {
      index++;
      if (index >= number) {
        index = 0;
      }
      change();
    }, 1000)
  }

  //暂停轮播函数
  function pause() {
    if (play) {
      clearInterval(play);
    }
  }

  //自动轮播
  start();

  //点击换图函数
  for (var i = 0; i < number; i++) {
    label[i].index = i;
    label[i].onclick = function () {
      index = this.index;
      change();
    }
  }

  //鼠标移入暂停轮播
  main.onmouseover = pause;
  //鼠标移出恢复轮播
  main.onmouseout = start;
}