//header nav 脚本
var headerlink = document.getElementsByClassName("header-nav-link"),
  active = "header-nav-link link-active",
  normal = "header-nav-link";
for (var i = 0; i < headerlink.length; i++) {
  headerlink[i].index = i;
  headerlink[i].onclick = function () {
    for (var j = 0; j < headerlink.length; j++) {
      headerlink[j].setAttribute("class", normal);
    };
    this.setAttribute("class", active);
  }
}
//main nav 脚本
var mainlink = document.getElementsByClassName("main-nav-link");

for (var i = 0; i < mainlink.length; i++) {
  mainlink[i].index = i;
  mainlink[i].onclick = function () {
    for (var j = 0; j < mainlink.length; j++) {
      mainlink[j].className = "main-nav-link";
    };
    this.className = "main-nav-link main-nav-link-active";
  }
}
//header按钮点击脚本
var nav = document.getElementById('nav');
var navExtendedClassName = 'nav-container-extended';

document.getElementById('btn-toggle').onclick = function () {
  // nav.className += ' ' + navExtendedClassName;
  if (nav.classList.contains(navExtendedClassName)) { // 收起
    nav.classList.remove(navExtendedClassName);
  } else { // 展开
    nav.classList.add(navExtendedClassName);
  }
};