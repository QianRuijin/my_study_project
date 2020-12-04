//封装方法
function byId(id) {
  return document.getElementById(id);
}

function byCls(cls) {
  return document.getElementsByClassName(cls)[0];
}

//JS验证密码安全级别
function AnalyzePwdSecurityLevel(password) {
  var securityLevelFlag = 0;
  if (/[a-zA-Z]/.test(password)) { //是否含字母
    securityLevelFlag++;
  }
  if (/[0-9]/.test(password)) { //是否含数字  
    securityLevelFlag++;
  }
  if (containSpecialChar(password)) { //是否含特殊字符
    securityLevelFlag++;
  }
  return securityLevelFlag;
}

//检验是否含特殊字符函数
function containSpecialChar(str) {
  var containSpecial = RegExp(/[(\ )(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\-)(\_)(\+)(\=)(\[)(\])(\    {)(\})(\|)(\\)(\;)(\:)(\')(\")(\,)(\.)(\/)(\<)(\>)(\?)(\)]+/);
  return (containSpecial.test(str));
}


//获取元素
var myImook = byId("myImooc"),
  triangle = byCls("triangle"),
  subNav = byCls("sub-nav"),
  user = byId("user"),
  usertip = byCls("usertip"),
  pwd = byId("pwd"),
  s2 = byCls("s2"),
  s3 = byCls("s3"),
  pwdtip = byCls("pwdtip"),
  confirm = byId("confirm"),
  confirmtip = byCls("confirmtip"),
  username = byId("username"),
  nametip = byCls("nametip"),
  namerule = byCls("namerule"),
  number = byId("number"),
  numbertip = byCls("numbertip"),
  email = byId("email"),
  emailtip = byCls("emailtip"),
  phone = byId("phone"),
  phonetip = byCls("phonetip"),
  term = byId("term"),
  nextbtn = byId("nextBtn"),
  rule = byId("rule");

//下拉框脚本
myImooc.onmouseover = function () {
  triangle.style.borderTopColor = "red";
  subNav.style.display = "block";
}

subNav.onmouseover = function () {
  subNav.style.display = "block";
}

myImooc.onmouseout = function () {
  triangle.style.borderTopColor = "black";
  subNav.style.display = "none";
}

subNav.onmouseout = function () {
  subNav.style.display = "none";
}

//姓名规则脚本
/*规则框位置固定写法
 *namerule.onmouseover=function(){
 *    rule.style.display="block"
 *    rule.style.top="256px";
 *    rule.style.left="675px";
 *}
 */

//据说offset不兼容Mozilla，我在火狐浏览器上测试可以。那就不写兼容了，主要是看着好复杂啊。。。。
namerule.onmouseover = function () {
  var x = event.offsetX + 600,
    y = event.offsetY + 240,
    leftvalue = x + "px",
    topvalue = y + "px";
  rule.style.display = "block";
  rule.style.top = topvalue;
  rule.style.left = leftvalue;
}

namerule.onmouseout = function () {
  rule.style.display = "none";
}

//表单脚本
var result1 = false,
  result2 = false,
  result3 = false,
  result4 = false,
  result5 = false,
  result6 = false,
  result7 = false,
  result8 = false;

//用户名验证
function check1() {
  var pattern = /^[a-zA-Z]\w{5,29}$/;
  if (pattern.test(user.value)) {
    usertip.innerHTML = "用户名输入正确";
    usertip.style.color = "green";
    result1 = true;
  } else {
    usertip.innerHTML = "6-30位字母、数字或“_”,字母开头";
    usertip.style.color = "red";
    result1 = false;
  }
}

user.onblur = check1;

//密码验证
function check2() {
  var pattern = /^\S{6,20}$/;
  if (pattern.test(pwd.value)) {
    pwdtip.innerHTML = '';
    pwdtip.style.display = "none";
    var security = AnalyzePwdSecurityLevel(pwd.value);
    if (security == 2) {
      s2.style.backgroundColor = "orange";
      s3.style.backgroundColor = "#ddd";
    } else if (security == 3) {
      s2.style.backgroundColor = "orange";
      s3.style.backgroundColor = "green";
    } else {
      s2.style.backgroundColor = "#ddd";
      s3.style.backgroundColor = "#ddd";
    }
    result2 = true;
  } else {
    pwdtip.innerHTML = "请输入6-20位字母、数字或符号";
    pwdtip.style.display = "block";
    pwdtip.style.height = "20px";
    pwdtip.style.color = "red";
    s2.style.backgroundColor = "#ddd";
    s3.style.backgroundColor = "#ddd";
    result2 = false;
  }
}

pwd.onblur = check2;

//确认密码验证
function check3() {
  if (pwd.value == '') {
    confirmtip.innerHTML = "密码不能为空";
    confirmtip.style.color = "red";
    result3 = false;
  } else if (confirm.value === pwd.value) {
    confirmtip.innerHTML = "两次输入一致";
    confirmtip.style.color = "green";
    result3 = true;
  } else {
    confirmtip.innerHTML = "两次输入密码不一致";
    confirmtip.style.color = "red";
    result3 = false;
  }
}

confirm.onblur = check3;

//姓名验证
function check4() {
  var pattern = /^[\u4e00-\u9fa5]{2,15}$|^[a-zA-Z]{3,30}$/;
  if (pattern.test(username.value)) {
    nametip.innerHTML = "姓名输入正确";
    nametip.style.color = "green";
    result4 = true;
  } else {
    nametip.innerHTML = "姓名只能包含中文或者英文,且字符在3-30个之间！";
    nametip.style.color = "red";
    result4 = false;
  }
}

username.onblur = check4;

//证件号码验证
function check5() {
  var pattern = /^\d{17}([\d]|[xX])$/;
  if (pattern.test(number.value)) {
    numbertip.innerHTML = "号码输入正确";
    numbertip.style.color = "green";
    result5 = true;
  } else {
    numbertip.innerHTML = "请输入18位身份证号码";
    numbertip.style.color = "red";
    result5 = false;
  }
}

number.onblur = check5;

//邮箱验证
function check6() {
  var pattern = /^[a-zA-Z0-9]+([._-][a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:[._-][a-zA-Z0-9]+)*\.[a-zA-Z]{2,}$/;
  if (pattern.test(email.value)) {
    emailtip.innerHTML = "邮箱格式正确";
    emailtip.style.color = "green";
    result6 = true;
  } else if (email.value == '') {
    emailtip.innerHTML = "邮箱不能为空";
    emailtip.style.color = "red";
    result6 = false;
  } else {
    emailtip.innerHTML = "请输入正确的邮箱";
    emailtip.style.color = "red";
    result6 = false;
  }
}

email.onblur = check6;

//手机号码验证
function check7() {
  var pattern = /^(1)[0,3,4,5,6,7,8,9]\d{9}$/;
  if (pattern.test(phone.value)) {
    phonetip.innerHTML = "手机格式正确";
    phonetip.style.color = "green";
    result7 = true;
  } else {
    phonetip.innerHTML = "您输入的手机号码不是有效的格式！";
    phonetip.style.color = "red";
    result7 = false;
  }
}

phone.onblur = check7;

//下一步按钮脚本
nextbtn.onclick = function () {
  //阻止按钮默认行为
  event.preventDefault();
  //点击后触发各项验证
  check1();
  check2();
  check3();
  check4();
  check5();
  check6();
  check7();

  //checkbox验证
  (function () {
    if (term.checked == true) {
      result8 = true;
    } else {
      result8 = false;
    }
  })();

  //邮箱为非必要信息，故result6未加入判定
  if (result1 && result2 && result3 && result4 && result5 && result7 && result8) {
    window.location = "http://www.imooc.com";
  }
}