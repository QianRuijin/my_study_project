//动画元素集合
var screenAnimateElements = {
  '.screen-1': [
    '.screen-1__heading',
    '.screen-1__text'
  ],

  '.screen-2': [
    '.screen-2__heading',
    '.screen-2__split',
    '.screen-2__text',
    '.screen-2__person',
    '.screen-2__arrow',
  ],
  '.screen-3': [
    '.screen-3__atom',
    '.screen-3__heading',
    '.screen-3__split',
    '.screen-3__text',
    '.screen-3__icon_i_1',
    '.screen-3__icon_i_2',
    '.screen-3__icon_i_3',
    '.screen-3__icon_i_4',
    '.screen-3__icon_i_5',
  ],
  '.screen-4': [
    '.screen-4__heading',
    '.screen-4__split',
    '.screen-4__text',
    '.screen-4__item_1',
    '.screen-4__item_2',
    '.screen-4__item_3',
    '.screen-4__item_4',
  ],
  '.screen-5': [
    '.screen-5__brain',
    '.screen-5__heading',
    '.screen-5__split',
    '.screen-5__text',
  ]

};

function setScreenAnimate(screenCls) {

  var screen = document.querySelector(screenCls); // 获取当前屏的元素
  var animateElements = screenAnimateElements[screenCls]; // 需要设置动画的元素

  var isSetAnimateClass = false; // 是否有初始化子元素的样式

  var isAnimateDone = false; // 当前屏幕下所有子元素的状态是DONE？

  screen.onclick = function () {

    //  初始化样式，增加init A A_init
    if (isSetAnimateClass === false) {
      for (var i = 0; i < animateElements.length; i++) {
        var element = document.querySelector(animateElements[i]);
        var baseCls = element.getAttribute('class');
        element.setAttribute('class', baseCls + ' ' + animateElements[i].substr(1) + '_animate_init');
      }
      isSetAnimateClass = true;
      return;
    }
    //  切换所有 animateElements 的  init -> done   A A_done
    if (isAnimateDone === false) {
      for (var i = 0; i < animateElements.length; i++) {
        var element = document.querySelector(animateElements[i]);
        var baseCls = element.getAttribute('class');
        element.setAttribute('class', baseCls.replace('_animate_init', '_animate_done'));
      }
      isAnimateDone = true;
      return;
    }
    //  切换所有 animateElements 的  done -> init   A A_init
    if (isAnimateDone === true) {
      for (var i = 0; i < animateElements.length; i++) {
        var element = document.querySelector(animateElements[i]);
        var baseCls = element.getAttribute('class');
        element.setAttribute('class', baseCls.replace('_animate_done', '_animate_init'));
      }
      isAnimateDone = false;
      return;
    }

  }


}

for (k in screenAnimateElements) {
  setScreenAnimate(k);
}