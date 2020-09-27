// ==UserScript==
// @name 		ABC看电影：在豆瓣
// @namespace 		ABCMovie@douban
// @version 		0.2.0
// @author 		bengben
// @description 	播放豆瓣电影

// @include     https://movie.douban.com/subject/*
// @require     https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.min.js
// @grant 		GM_getValue
// @grant 		GM_setValue
// @grant 		GM_listValues
// ==/UserScript==

// test script
// GM_setValue('GMTest1','hello kitty');
// alert(GM_getValue('GMTest1'));
console.log("------------------------ABC看豆瓣----------------------------");
//获取豆瓣电影id
var url = window.location.href;
var search = "subject/";
var douurl = url.substr(url.indexOf(search) + search.length, url.length);
var movieid = douurl.substr(0, douurl.indexOf("/"));
//获取电影名字
var namestr = $("title").text().trim();
// console.log('title',namestr);
var moviename = namestr.substr(0, namestr.indexOf("(")).trim();
// console.log('moviename',moviename);
//获取导演
var directedBy = $('a[rel="v:directedBy"]').eq(0).text();
//获取电影类型
var genre = $('span[property="v:genre"]').text();
//主演
var starring;
// $('a[rel="v:starring"]').forEach(element => {
//     starring +=  element.text()+",";
// });
//c
var yearstr = $('span[property="v:initialReleaseDate"]').text();
var year = yearstr.substr(0, 4);

var postMovivedata = {
  movieid: movieid,
  moviename: moviename,
  directedBy: directedBy,
  genre: genre,
  starring: starring,
  year: year,
};

//临存获取的电影数据
var moiveData;

$("div.aside").prepend(
  '<div id="abcmoive" class="gray_ad"><h2>ABC看电影：在豆瓣 &nbsp;·&nbsp;·&nbsp;·&nbsp;·&nbsp;·&nbsp;·</h2><span id="md_loadingtext" class="md-opjjpmhoiojifppkkcdabiobhakljdgm_doc">资源搜索中...</span></div>'
);
// console.log('abcmoive :',$('#abcmoive'));
// console.log('请求条件：',postMovivedata);
$.ajax({
  //请求方式
  type: "POST",
  //请求的媒体类型
  contentType: "application/x-www-form-urlencoded",
  //请求地址
  url: "https://51aabbcc.com:8670/s/",
  //数据，json字符串
  data: postMovivedata,
  beforeSend: function (XMLHttpRequest) {
    // console.log('请求之前返回请求参数：loading...');
  },
  //请求成功
  success: function (result) {
    moiveData = result;
    // console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',result.data);
    // console.log(result);
    if (result.data.length > 0) {
      renderPlayHtml(result);
    } else {
      $("#md_loadingtext").text("很抱歉，没有找到相关资源。");
    }
    // console.log('-------------ABC看豆瓣-------------');
  },
  //请求失败，包含具体的错误信息
  error: function (e) {
    console.log("ABC看电影，请求出错!");
    moiveData = [{ url: "#", tip: "没有找到片源" }];
    // console.log(e.status);
    // console.log(e.responseText);
  },
});

/**
 * 渲染播放地址
 * @param {电影播放数据} result
 */
function renderPlayHtml(result) {
  $("#md_loadingtext").remove(); //.text('播放资源：');
  $("#abcmoive").append(
    "<script>function ajaxsubmit(){" +
      'console.log("kitty!");' +
    
      "}</script>"
  );
  // $('#abcmoive').append('<hr style="border:0;background-color:#ffd596;height:1px;">');
  $("#abcmoive").append(
    '<div id="md_tagsbody" class="tags-body" style="margin-top:10px;">'
  );
  for (var index = 0; index < result.data.length; index++) {
    var element = result.data[index];
    $("#md_tagsbody").append(
      '<a href="' +
        element.url +
        '" target="view_window" class="md-opjjpmhoiojifppkkcdabiobhakljdgm_doc">' +
        element.tip +
        "</a>"
    );
  }
  $("#abcmoive").append(
    '<hr style="border:0;background-color:#ddd;height:1px;">'
  );
  $("#abcmoive").append(
    '<p class="pl"><span><a>点击这里，提出你的想法</a>，我很愿意倾听！</p></span>'
  );
  $("#abcmoive").append(
    '<form id="cform" action=""  method="post"><div class="form-area-wrap"><textarea id="comments" name="comments" class="form-area" placeholder="请讲..." rows="4" cols="30"></textarea></div>'
  );
  // $('#abcmoive').append('<a type="button" href="javascript:$.ajax({type=\"post\",url=\"https://51aabbcc.com:8670/comments\",data:{\"comments\":$(\"#comments\").val()},dataType:\"json\",success:function(result){ alert(result)   }})" class="comment-form-btn">提交</a>&nbsp; &nbsp; &nbsp;');
  $("#abcmoive").append(
    '<a type="button" href="javascript:ajaxsubmit();" style="margin:centers" class="ticket-btn md-opjjpmhoiojifppkkcdabiobhakljdgm_doc">提交</a>&nbsp;'
  );
  // $('#abcmoive').append('<button type="button" class="comment-form-btn">取消</button></form>');
  // $('#abcmoive').append('<p class="buylink-price"><span><a>如果觉得棒，也可以打赏一下。</span></p>');
  $("#abcmoive").append("</div>");
}
