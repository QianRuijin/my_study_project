// 封装简化方法
function getElem(selector){
    return document.querySelector(selector);
}

function getAllElem(selector){
    return document.querySelectorAll(selector);
}

function getCls(element) {
    return element.getAttribute('class');
}

function setCls(element,cls){
    return element.setAttribute('class',cls);
}
  
function addCls(element,cls){
    var baseCls  = getCls(element);
    if( baseCls.indexOf(cls) === -1){
        setCls(element,baseCls+' '+cls); 
    return ;
    }
}

function delCls(element,cls){
    var baseCls  = getCls(element);
    if( baseCls.indexOf(cls) > -1){ 
        setCls( element,baseCls.split(cls).join(' ').replace(/\s+/g,' ') );
    }
    return ;
}

//动画元素集合
var screenAnimateElements = {
    '.screen-1' : [
      '.screen-1__heading',
      '.screen-1__text',
    ],
  
    '.screen-2' : [
      '.screen-2__heading',
      '.screen-2__split',
      '.screen-2__text',
      '.screen-2__person',
      '.screen-2__arrow',
    ],
    '.screen-3' : [
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
    '.screen-4' : [
      '.screen-4__heading',
      '.screen-4__split',
      '.screen-4__text',
      '.screen-4__item_1',
      '.screen-4__item_2',
      '.screen-4__item_3',
      '.screen-4__item_4',
      ],
    '.screen-5' : [
       '.screen-5__brain',
       '.screen-5__heading',
       '.screen-5__split',
       '.screen-5__text',
    ]
  
  } ;

//初始化函数，为动画元素添加初始化的类名
function setScreenAnimateInit(screenCls) {
    var screen = document.querySelector(screenCls); // 获取当前屏的元素
    var animateElements =  screenAnimateElements[screenCls]; // 需要设置动画的元素
    for(var i=0;i<animateElements.length;i++){
        var element = document.querySelector(animateElements[i]);
        var baseCls = element.getAttribute('class');
        element.setAttribute('class',baseCls +' '+animateElements[i].substr(1)+'_animate_init');
    }
}

//初始化设置
window.onload = function () {
    for(k in screenAnimateElements){
      if(k == '.screen-1'){
        continue;
      }
      setScreenAnimateInit(k);
    }
}

//自动播放函数，为动画元素设置完成时的类名
function playScreenAnimateDone(screenCls){
    var screen = document.querySelector(screenCls); // 获取当前屏的元素
    var animateElements =  screenAnimateElements[screenCls]; // 需要设置动画的元素
    for(var i=0;i<animateElements.length;i++){
        var element = document.querySelector(animateElements[i]);
        var baseCls = element.getAttribute('class');
        element.setAttribute('class',baseCls.replace('_animate_init','_animate_done'));    
    }
}

//初始化第一屏的动画
setTimeout(function(){
    playScreenAnimateDone('.screen-1');
},100)

//获取导航栏和右边栏数组
var navItems = getAllElem('.header__nav-item');
var outLineItems = getAllElem('.outline__item');
var navTip = getElem('.header__nav-tip');

//设置右边栏项目随滚动到相应页面而显色
var switchNavItemsActive = function(idx){
    for(var i=0;i<navItems.length;i++){
        delCls(navItems[i],'header__nav-item_status_active');
        navTip.style.right = 549 + 'px';        
    }
    addCls(navItems[idx],'header__nav-item_status_active');
    navTip.style.right=(549 - idx * 96 ) +'px';

    for(var i=0;i<outLineItems.length;i++){
        delCls(outLineItems[i],'outline__item_status_active');       
    }
    addCls(outLineItems[idx],'outline__item_status_active');   
  }

//加载完成后播放
window.onscroll = function () {
    var top=document.body.scrollTop||document.documentElement.scrollTop; //兼容性写法

    if( top > 200 ){
        addCls(getElem('.header'),'header_status_white');
        switchNavItemsActive(0);
    }else{
        delCls(getElem('.header'),'header_status_white');    
    }

    if( top > (300) ){
      playScreenAnimateDone('.screen-2');
      addCls(getElem('.outline'),'outline_status_in');
      switchNavItemsActive(1);
    }else{
         delCls(getElem('.outline'),'outline_status_in');
        }
  

    if( top > (600*2-300) ){
      playScreenAnimateDone('.screen-3');
      switchNavItemsActive(2);
    
    }
    if( top > (600*3-300) ){
      playScreenAnimateDone('.screen-4');
      switchNavItemsActive(3);
     
    }
    if( top > (600*4-300) ){
      playScreenAnimateDone('.screen-5');
      switchNavItemsActive(4);
    
    }
  }
 
//跳转函数
var setNavJump = function(i,lib){
    var elem = lib[i];
    elem.onclick = function(){
        document.body.scrollTop = i*640 + 1;
        document.documentElement.scrollTop = i*640 + 1;        
    }
}

//导航项跳转
for(var i=0;i<navItems.length;i++){
    setNavJump(i,navItems);
}

//右边栏项跳转
for(var i=0;i<outLineItems.length;i++){
    setNavJump(i,outLineItems);
}

// 滑动条函数
var setTip = function(idx,lib){
    lib[idx].onmouseover =function(){
        navTip.style.right=(549 - idx * 96 ) +'px';
    }
    var currentIdx = 0;
    lib[idx].onmouseout = function(){
        for(var i=0;i<lib.length;i++){
            if( getCls( lib[i] ).indexOf('header__nav-item_status_active') > -1  ){
            currentIdx = i;
            break;
            }
        }
    navTip.style.right=(549 - currentIdx * 96 ) +'px';   
    }
}

//滑动条启用
for(var i=0;i<navItems.length;i++){
  setTip(i,navItems);
}