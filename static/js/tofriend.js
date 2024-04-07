// JavaScript Document
// 界面部分
/*
  生成歌词 li
*/

let  lrc = '[00:00.000]对不起 - 周杰伦 (Jay Chou)\
[00:04.250]词：方文山\
[00:08.500]曲：周杰伦\
[00:12.750]编曲：洪敬尧\
[00:17.000]制作人：周杰伦\
[00:21.264]广场一枚铜币悲伤的很隐秘\
[00:24.614]它在许愿池里轻轻叹息\
[00:28.013]太多的我爱你让它喘不过气已经\
[00:33.143]失去意义\
[00:34.971]戒指在哭泣静静躺在抽屉\
[00:38.341]它所拥有的只剩下回忆\
[00:41.750]相爱还有别离像无法被安排的雨\
[00:46.700]随时准备来袭\
[00:49.160]我怀念起国小的课桌椅\
[00:53.630]怀念着用铅笔写日记\
[00:56.150]记录那最原始的美丽\
[00:59.590]记录第一次遇见的你\
[01:02.049]Jay Chou\
[01:03.059]如果我遇见你是一场悲剧\
[01:06.417]我想我这辈子注定一个人演戏\
[01:09.856]最后再一个人慢慢地回忆\
[01:13.335]没有了过去我将往事抽离\
[01:16.765]如果我遇见你是一场悲剧\
[01:20.183]我可以让生命就这样毫无意义\
[01:23.633]或许在最后能听到你一句\
[01:27.002]轻轻地叹息后悔着对不起\
[01:46.149]一枚铜币悲伤的很隐秘\
[01:48.889]它在许愿池里轻轻叹息\
[01:52.338]太多的我爱你让它喘不过气已经\
[01:57.368]失去意义\
[01:59.137]戒指在哭泣静静躺在抽屉\
[02:02.627]它所拥有的只剩下回忆\
[02:06.065]相爱还有别离像无法被安排的雨\
[02:11.084]随时准备来袭\
[02:13.902]我怀念起国小的课桌椅\
[02:18.211]用铅笔写日记\
[02:20.631]记录那最原始的美丽\
[02:24.070]记录第一次遇见的你\
[02:26.169]Jay Chou\
[02:27.129]如果我遇见你是一场悲剧\
[02:30.618]我想我这辈子注定一个人演戏\
[02:34.106]最后再一个人慢慢地回忆\
[02:37.636]没有了过去我将往事抽离\
[02:41.026]如果我遇见你是一场悲剧\
[02:44.525]我可以让生命就这样毫无意义\
[02:47.794]或许在最后能听到你一句\
[02:51.283]轻轻地叹息后悔着对不起\
[03:12.113]如果我遇见你是一场悲剧\
[03:15.460]我想我这辈子注定一个人演戏\
[03:18.790]最后再一个人慢慢地回忆\
[03:22.289]没有了过去我将往事抽离\
[03:26.219]如果我遇见你是一场悲剧\
[03:31.779]我轻轻地叹息\
[03:35.309]后悔着对不起';

//function createLrcList(lrc){
//    // 避免多次操作 DOM。创建一个 DOM 片段，它不会显示，但是可以集中处理 DOM。
//    let frag = document.createDocumentFragment();
//    doms.lrcList.innerHTML = "";
//    lrc.forEach(item=>{
//        let li = document.createElement("li");
//        li.innerHTML = item.word ;
//        frag.appendChild(li);
//    });
//    doms.lrcList.appendChild(frag);
//}
//五、完整 JS 代码 
// 把歌词字符串处理为 Object 对象
/**
 *   解析歌词字符串，的到歌词对象数组
 *   每个歌词对象：
 *   {
        time:开始时间,
        word:歌词
 *   }
*/
function parseLRC(LRC){
    let lines = LRC.split('\n'); // 把歌词转为数组
    let LRCArr = [];  // 歌词数组
    // 遍历数组
    lines.forEach(item => {
        // item数据： [00:06.77]安静地又说分开
        // 切割字符
        let parts = item.split("]"); //  [00:06.77 , 安静地又说分开
        let timer =  parts[0].slice(1).trim();  // 00:06.77
        let obj = {
            time: parseTime(timer),
            word: parts[1].trim()==""?"":parts[1]  // 安静地又说分开
        }
        // console.info( obj );
        LRCArr.push(obj);    
    });
    return LRCArr;
}
/*
    把时间字符串转为时间数字
    eg:
    01:06.77  => 66.77
*/
function parseTime(timer){
   let t = timer.split(":");
   let result = Number(t[0])*60 + Number(t[1]);
   return result ; 
}
 
 
/*
* 计算出，再当前播放器播放到第几秒的情况
* LRCData 应该高亮显示的歌词下标。
* 高亮歌词是: 比当前时间数【第一次大】的上一句。
* 如果没有任何歌词显示，就为 -1 。
* 返回值：当前歌词对应的索引
*/
function findIndex(){
    // 播放器当前时间
    let index = -1;
    let curTime = doms.audio.currentTime;
    for(let i=0; i<=LRCData.length-1 ; i++){
        if( curTime < LRCData[i].time ){
            index = i - 1;
            return  index;
        }
    }
    // 找遍了，都没有歌词，说明播放完毕里，显示最后一句歌词。
    index = LRCData.length-1
    return index;
}
 
// 界面部分
/*
  生成歌词 li
*/
function createLRcList(lrc){
    // 避免多次操作 DOM。创建一个 DOM 片段，它不会显示，但是可以集中处理 DOM。
    let frag = document.createDocumentFragment();
    doms.lrcList.innerHTML = "";
    lrc.forEach(item=>{
        let li = document.createElement("li");
        li.innerHTML = item.word ;
        frag.appendChild(li);
    });
    doms.lrcList.appendChild(frag);
}
 
/*
  设置歌词 ul 的偏移量
*/
function setOffset(index){
    let dis =-1*( index * liH + liH/2  - conH/2 );  // 位移距离
    doms.lrcList.style.transform = `translateY(${dis}px)`;
    console.info(dis);
}
/*
  设置歌词高亮
*/
function setLight(index){
    let ul = doms.lrcList;
    let lis = ul.children;
    let cur = document.querySelector(".current");
    if( cur ){ // 如果存在
        cur.classList.remove("current");
    }
    lis[index].classList.add("current");
}
 
 
let doms = {
    audio:document.querySelector("audio"),
    lrcList:document.querySelector("#lrcList"),
    container:document.querySelector("#container")
}
let LRCData = parseLRC(lrc);
createLRcList(LRCData);  // 创造歌词 li
let conH = doms.container.clientHeight;  // 容器高度
let liH = doms.lrcList.children[0].clientHeight;  // li 高度
// 初始化歌词位置，让第一句歌词在歌词区中间
doms.lrcList.style.transform = `translateY(${-1*( liH/2  - conH/2)}px)`;  
 
doms.audio.addEventListener("timeupdate",function(){
    let index = findIndex();
    setLight(index);  // 歌词位移
    setOffset(index); // 歌词高亮
});