var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');

/*Request*/
var showList = []; 
function reqBananaidolShow(url,showName){
	request(url,function(error, response, body){
		var showBody = {showName:showName,showEpisodes:[],nickName:[]};
		if(!error && response.statusCode == 200){
		var $ = cheerio.load(body);
		$('.widget-title a').each(function(index, el){
			var title = $(el).text();
			var href = $(el).attr('href');
			showBody.showEpisodes.push({title:title,href:href});
		});
		showList.push(showBody);
		// for (var i = nickNames.length - 1; i >= 0; i--) {
		// 	showBody.nickName.push(nickNames[i])
		// };
	}
	});
}

var showListT = [{url:'http://www.bananaidolshow.com/3151.html',showName: '奔跑男女'},
								 {url:'http://www.bananaidolshow.com/5072.html',showName: '我去上學啦'},
								 {url:'http://www.bananaidolshow.com/160.html',showName: '超人回來了'},
								 {url:'http://www.bananaidol.net/3074.html',showName: '康熙來了'},
								 {url:'http://www.bananaidol.net/3144.html',showName: '奔跑吧兄弟'},
								 {url:'http://www.bananaidol.net/3082.html',showName: '國光幫幫忙'},
								 {url:'http://www.bananaidol.net/2825.html',showName: '大學生了沒'},
								 {url:'http://www.bananaidolshow.com/903.html',showName: '爸爸去哪兒'},
								 {url:'http://www.bananaidol.com/6834.html',showName:'學校2015'}];

for (var i = showListT.length - 1; i >= 0; i--) {
	reqBananaidolShow(showListT[i].url, showListT[i].showName);
};
console.log(showList);

/* GET users listing. */
router.get('/', function(req, res) {
  res.json(showList);
});

module.exports = router;
