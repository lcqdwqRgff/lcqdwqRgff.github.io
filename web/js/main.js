// JavaScript Document

window.onload = function(){
    function elect_ele(type){
        qianzhui = type.substr(0, 1);
        houzhui = type.substr(1);
        if(qianzhui == "."){
            return document.getElementsByClassName(houzhui)
        }else if(qianzhui == "#"){
            return document.getElementById(houzhui)
        }else{
            return document.getElementsByTagName(houzhui)
        }
}
    var search = elect_ele(".search");
    search[0].onclick=function(){
        alert("这是个按钮，可以点");
    }
}
