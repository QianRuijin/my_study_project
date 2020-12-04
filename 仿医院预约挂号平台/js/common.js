// header区 search脚本
$.fn.UiSearh = function(){
    var ui = $(this);
    
    $(".search-selected",ui).click(function(){
        $('.search-list').show();
        return false;
    })
    
    $(".search-list a",ui).click(function(){
        $(".search-selected").text($(this).text());
        $('.search-list').hide();
        return false;
    });
    
    $('body').on('click',function(){
        $('.search-list').hide();
    })	
}

//search脚本调用
$(function () {
    $('.search').UiSearh();
})

//医院体系区tab卡脚本
$(".label-item").on("click",function(){
    $(this).addClass("selected").siblings().removeClass("selected");
    $(".page-item").eq($(this).index()).removeClass("hidden").siblings().addClass("hidden");
})

//科室安排区脚本
$(function(){
    var time=$(".time").attr("data-search"),
        date=AjaxRemoteGetData[time](),
        status=$(".status").attr("data-search"),
        data=AjaxRemoteGetData[status](),
        n=0;//左右按钮计数指针

    //预约时间显示脚本
    /*
    *$.each(date,function(i,item){
    *    $(".time").eq(i).html(item);
    *});
    */
   var renewDate=function(x){
    for(var i=0;i<7;i++){
        var dateInput=function(i){
            $(".time").eq(i).html(date[(i+7*x)]);
        };
        dateInput(i);
        }
    };
    renewDate(n); //加载完成即运行显示当前一周预约时间

    //预约情况显示脚本
    var renewStatus=function(x){   
        for(var i=0;i<7;i++){
            var statusInput=function(i){
                $(".status").eq(i).text(data[(i+7*x)]);
            };
            statusInput(i);
        }
    };  
    renewStatus(n); //加载完成即运行显示当前一周预约情况

    //向左按钮脚本
    $(".previous").click(function(){
        if(n>0){
            n=n-1;
            renewDate(n);
            renewStatus(n);
        }else{
            n=0;
            alert("已显示最近预约日期")
        }
        
        return n;
    });

    //向右按钮脚本
    $(".next").click(function(){
        if(n<6){
            n=n+1;
            renewDate(n);
            renewStatus(n);
        }else{
            n=6;
            alert("无更多预约日期")
        }
        
        return n;
    });  
})
