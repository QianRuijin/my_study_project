//从原生select获取数据
var originData=document.getElementsByTagName("option"),
    data=[];

for(let i of originData){
    let obj={type:"",text:""};
    obj.type=i.getAttribute("type");
    obj.text=i.innerText;
    data.push(obj);
}

//脚本内容
(function(window,document){
  //定义变量
  var layerstatus=false, //下拉框状态指示
      searchRecords=["未选择"],  //搜索记录
      searchList=[];     //展示的记录

    // 公共方法集合
  const methods = {
    //根据id获取元素
    $(id) {
      return document.getElementById(id);
    },

    $$(selector, root = document) {
      return root.querySelectorAll(selector);
    }
  };

    //构造函数
    let Select=function(option){
        this._init(option);
        this._createElement();
        this._bind();
        this._search(option);
    }

    //公共方法
    //显示下拉框脚本
  Select.prototype._showlayer=function(){
    if(!layerstatus){
      methods.$("search-layer").style.display="block";
      layerstatus=true;
    }
  }
  //隐藏下拉框脚本
  Select.prototype._hidelayer=function(){
    if(layerstatus){
      methods.$("search-layer").style.display="none";
      layerstatus=false;
    }
  }
  //获取元素序号方法，用于显示第几个
  Select.prototype._getIndex=function(obj,array){
    for(var i=0; i<array.length;i++){
      if(array[i]===obj){
        return i+1;
      }
    }
  }
  //去除字符串的首尾空格
  Select.prototype._trim=function(str){
    if (str && typeof str === 'string') {
        return str.replace(/^\s+|\s+$/g,'');
    }
  }
  
    //初始化 分类
    Select.prototype._init=function(data){
      this.types=[];       //所有类别
      this.texts=[];       //所有文本
      this.classified={};  //文本分类
      this._classify(data);
    };
    //分类
    Select.prototype._classify=function(data){
      data.forEach(({type,text})=>{
        if(!this.types.includes(type)){
          this.types.push(type);
        }

        if(!Object.keys(this.classified).includes(type)){
          this.classified[type]=[];
        }

        if(!this.texts.includes(text)){
          this.texts.push(text);

          this.classified[type].push(this.texts.length-1);
        }

      });

    };
    //生成DOM
    Select.prototype._createElement=function(){
      let dom=methods.$("search-layer")
      for(let i of this.types){
        let h3=document.createElement("h3");
        h3.innerText=i;
        h3.setAttribute("class","search-type");
        dom.appendChild(h3);
        for(let j of this.classified[i]){
          let p=document.createElement("p");
          p.innerText=this.texts[j];
          p.setAttribute("class","search-item");
          dom.appendChild(p);
        }
      }
    };
    //绑定事件
    Select.prototype._bind=function(){
      //点击下拉框部分不影响显示
      methods.$("search-layer").addEventListener("click",(e)=>{
        e.stopPropagation();
        this._showlayer();
      })
      //点击按钮与下拉框部分显示或隐藏下拉框
      methods.$("search-wrap").addEventListener("click",(e)=>{
        e.stopPropagation();
        if(!layerstatus){
          this._showlayer();
        }else{
          this._hidelayer();
        }
      })    
      //点击非下拉框的部分收起下拉列表      
      methods.$("body").addEventListener("click",()=>{
        this._hidelayer();
      },false)

      //点击切换下拉列表的显示
      methods.$("search-layer").addEventListener("click",({target})=>{
        if(target.nodeName !=="P"){
          return;
        }else{
        methods.$("select-input").value=target.innerText;
        //选中项颜色背景
        for(let i of methods.$$(".search-item")){
          i.setAttribute("class","search-item");
        }
        target.setAttribute("class","search-item selected")
        this._hidelayer();

        //搜索记录
        var searchRecord=methods.$("select-input").value;
        searchRecords.push(searchRecord);
        var searchList=searchRecords.slice(-2);

        //展示内容
        methods.$("out").innerText=`之前的值是  ${searchList[0]} - ${this._getIndex(searchList[0],this.texts)}\n 改变后的值是  ${searchList
        [1]} - ${this._getIndex(searchList[1],this.texts)}`
      }
      }) 
    };

    Select.prototype._search=function(){
      var searchItem=methods.$$(".search-item");
      var that=this;
      //搜索输入事件
      methods.$("search-input").oninput=function(){
        //用于匹配的正则表达式
        var pattern=eval(`/^${that._trim(this.value)}/i`); 

        if(this.value===""){
          searchItem.forEach((item,i) =>{
            item.style.display="block";
          })
        }else{
          searchItem.forEach((item,i) =>{
            item.style.display="block";
            if(item.innerText.search(pattern)===-1){
              item.style.display="none";
            }
          })
        }
      }  
    };
    window.$Select=Select;
})(window,document);

//调用函数
const select = new $Select(data)