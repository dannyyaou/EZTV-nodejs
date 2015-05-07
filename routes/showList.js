var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');

/*Request*/
var showList = []; 
function reqBananaidolShow(url){
	request(url,function(error, response, body){
		if(!error && response.statusCode == 200){
			var $ = cheerio.load(body);
			showList = [];
			$('h4 a').each(function(index, el){
				var title = $(el).text();
				var href = $(el).attr('href');
				showList.push({title:title,href:href});
			});
		}
	});
}


/* GET users listing. */
router.get('/', function(req, res) {
	var url = req.query.url;
	reqBananaidolShow(url);
  res.json(showList);
});

module.exports = router;
