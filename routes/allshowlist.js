var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');

/*Request*/
var showsList = []; 
function reqBananaidolShows(url,showsName,position){
	request(url,function(error, response, body){
		var showsBody = {showsName:showsName,showslist:[]};
		if(!error && response.statusCode == 200){
			var $ = cheerio.load(body);
			$(position).each(function(index, el){
				var title = $(el).text();
				var href = $(el).attr('href');
				showsBody.showslist.push({title:title,href:href,showsName:showsName});
			});
		showsList.push(showsBody);
		}
	});
}

var showListT = [{url:'http://www.bananaidol.com/kd',showsName: '韓劇', position:'#tag_cloud-2 a'},
								 {url:'http://www.bananadramajp.com/',showsName: '日劇', position:'#tag_cloud-2 a'},
								 {url:'http://www.bananaidol.net/',showsName: '華劇', position:'#tag_cloud-2 a'},
								 {url:'http://www.bananaidol.net/show',showsName: '華語綜藝', position:'#sidebar a'},
								 {url:'http://www.bananaidolshow.com/',showsName: '韓國綜藝', position:'#tag_cloud-2 a'}];

for (var i = showListT.length - 1; i >= 0; i--) {
	reqBananaidolShows(showListT[i].url, showListT[i].showsName,showListT[i].position);
};


console.log(showsList);

/* GET users listing. */
router.get('/', function(req, res) {
  res.json(showsList);
});

module.exports = router;
