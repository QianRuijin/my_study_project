//将月份转化为两位数
function monthTransform(month) {
  if (month < 10) {
    month = "0" + month;
  };
  return month;
}

//获取当前日期
function now() {
  var time = new Date(),
    year, month, date, today;

  year = time.getFullYear();
  month = monthTransform(time.getMonth() + 1);
  date = time.getDate();
  today = year + "-" + month + "-" + date;
  return today;
}

//data
var storage = {};

storage.appointment = [
  ["2020-07-26", "星期日", "约满"],
  ["2020-07-27", "星期一", "约满"],
  ["2020-07-28", "星期二", "约满"],
  ["2020-07-29", "星期三", "约满"],
  ["2020-07-30", "星期四", "约满"],
  ["2020-07-31", "星期五", "约满"],
  ["2020-08-01", "星期六", "约满"],
  ["2020-08-02", "星期日", "约满"],
  ["2020-08-03", "星期一", "约满"],
  ["2020-08-04", "星期二", "约满"],
  ["2020-08-05", "星期三", "约满"],
  ["2020-08-06", "星期四", "约满"],
  ["2020-08-07", "星期五", "约满"],
  ["2020-08-08", "星期六", "剩余2"],
  ["2020-08-09", "星期日", "约满"],
  ["2020-08-10", "星期一", "约满"],
  ["2020-08-11", "星期二", "约满"],
  ["2020-08-12", "星期三", "约满"],
  ["2020-08-13", "星期四", "约满"],
  ["2020-08-14", "星期五", "约满"],
  ["2020-08-15", "星期六", "剩余3"],
  ["2020-08-16", "星期日", "约满"],
  ["2020-08-17", "星期一", "约满"],
  ["2020-08-18", "星期二", "约满"],
  ["2020-08-19", "星期三", "约满"],
  ["2020-08-20", "星期四", "约满"],
  ["2020-08-21", "星期五", "约满"],
  ["2020-08-22", "星期六", "剩余4"],
  ["2020-08-23", "星期日", "约满"],
  ["2020-08-24", "星期一", "约满"],
  ["2020-08-25", "星期二", "约满"],
  ["2020-08-26", "星期三", "约满"],
  ["2020-08-27", "星期四", "约满"],
  ["2020-08-28", "星期五", "约满"],
  ["2020-08-29", "星期六", "剩余5"],
  ["2020-08-30", "星期日", "约满"],
  ["2020-08-31", "星期一", "约满"],
  ["2020-09-01", "星期二", "约满"],
  ["2020-09-02", "星期三", "约满"],
  ["2020-09-03", "星期四", "约满"],
  ["2020-09-04", "星期五", "约满"],
  ["2020-09-05", "星期六", "剩余6"],
  ["2020-09-06", "星期日", "约满"],
  ["2020-09-07", "星期一", "约满"],
  ["2020-09-08", "星期二", "约满"],
  ["2020-09-09", "星期三", "约满"],
  ["2020-09-10", "星期四", "约满"],
  ["2020-09-11", "星期五", "约满"],
  ["2020-09-12", "星期六", "剩余7"],
  ["2020-09-13", "星期日", "约满"],
  ["2020-09-14", "星期一", "约满"],
  ["2020-09-15", "星期二", "约满"],
  ["2020-09-16", "星期三", "约满"],
  ["2020-09-17", "星期四", "约满"],
  ["2020-09-18", "星期五", "约满"],
  ["2020-09-19", "星期六", "约满"],
  ["2020-09-20", "星期日", "约满"],
  ["2020-09-21", "星期一", "约满"],
  ["2020-09-22", "星期二", "约满"],
  ["2020-09-23", "星期三", "约满"],
  ["2020-09-24", "星期四", "约满"],
  ["2020-09-25", "星期五", "约满"],
  ["2020-09-26", "星期六", "约满"],
  ["2020-09-27", "星期日", "约满"],
  ["2020-09-28", "星期一", "约满"],
  ["2020-09-29", "星期二", "约满"],
  ["2020-09-30", "星期三", "约满"],
];


//获得当前日期在data中的位置
var index = function () {
  var arr = [],
    j = storage.appointment.length,
    today = now(),
    dateIndex;

  for (i = 0; i < j; i++) {
    var _day = storage.appointment[i][0];
    arr.push(_day);
  }
  dateIndex = arr.indexOf(today);
  return dateIndex;
}();

//获取7周时间
var AjaxRemoteGetData = {};

AjaxRemoteGetData.getDate = function () {
  var arr = [];
  for (i = index; i < (index + 49); i++) {
    var _day = storage.appointment[i][1],
      _date = storage.appointment[i][0],
      _time = _day + "<br/>" + _date;

    arr.push(_time);
  }
  return arr;
}

//获取7周预约情况
AjaxRemoteGetData.getStatus = function () {
  var arr = [];
  for (i = index; i < (index + 49); i++) {
    var _status = storage.appointment[i][2];

    arr.push(_status);
  }

  return arr;
}

//科室安排区脚本
$(function () {
  var time = $(".time").attr("data-search"),
    date = AjaxRemoteGetData[time](),
    status = $(".status").attr("data-search"),
    data = AjaxRemoteGetData[status](),
    n = 0; //左右按钮计数指针

  //预约时间显示脚本
  /*
   *$.each(date,function(i,item){
   *    $(".time").eq(i).html(item);
   *});
   */
  var renewDate = function (x) {
    for (var i = 0; i < 7; i++) {
      var dateInput = function (i) {
        $(".time").eq(i).html(date[(i + 7 * x)]);
      };
      dateInput(i);
    }
  };
  renewDate(n); //加载完成即运行显示当前一周预约时间

  //预约情况显示脚本
  var renewStatus = function (x) {
    for (var i = 0; i < 7; i++) {
      var statusInput = function (i) {
        $(".status").eq(i).text(data[(i + 7 * x)]);
      };
      statusInput(i);
    }
  };
  renewStatus(n); //加载完成即运行显示当前一周预约情况

  //向左按钮脚本
  $(".previous").click(function () {
    if (n > 0) {
      n = n - 1;
      renewDate(n);
      renewStatus(n);
    } else {
      n = 0;
      alert("已显示最近预约日期")
    }

    return n;
  });

  //向右按钮脚本
  $(".next").click(function () {
    if (n < 6) {
      n = n + 1;
      renewDate(n);
      renewStatus(n);
    } else {
      n = 6;
      alert("无更多预约日期")
    }

    return n;
  });
})