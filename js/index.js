var flag=false;//是否再请求中
var li=document.getElementsByTagName("li");
var minHeight;
var num=1;
function send(){
    if(!flag){//加锁，防止再请求数据的同时继续请求
        ajax("get","http://localhost/waterfall/getPics.php",cbs,"cpage="+num,true);
        flag=true;
        num++;
    }
}
send();

function cbs(value){
    flag=false;
    var data=JSON.parse(value);
    if(data.length>0){
        console.log(data);
        data.forEach(function(ele,index){
            var div=document.createElement("div");
            div.className="item";
            var img=document.createElement("img");
            img.src=ele.image;
            img.height=220* ele.height/ele.width;
            var p=document.createElement("p");
            p.innerText=ele.title;
            img.onload=function(){
                div.appendChild(img);
                div.appendChild(p);
                append(div);
            }
            
        })
    }else{
        alert("加载到底了quq");
    }
}

//插入到最短的一行
function append(ele){
    var minLine=li[0].offsetHeight;
    var index=0;
    for(var i=1;i<li.length;i++){
        var h=li[i].offsetHeight;
        if(h<minLine){
            minLine=h;
            index=i;
        }
    }
    li[index].appendChild(ele);
    minHeight=li[index].offsetHeight;
}
// console.log(minHeight);
// 获取更多内容
// var next=document.getElementsByClassName("bottom")[0];
// next.onclick=function(){
//     ajax("get","http://localhost/waterfall/getPics.php",cbs,"cpage=1",true);
// }
window.onscroll=function(){
    console.log(minHeight);
    var scrollHeight=document.documentElement.scrollTop||document.body.scrollTop;
    var clientHeight=document.documentElement.clientHeight||document.body.clientHeight;
    if(scrollHeight+clientHeight>minHeight){
        send();
    }
}