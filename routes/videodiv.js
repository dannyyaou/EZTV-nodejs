var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');

/*Request*/

/* GET users listing. */
router.get('/', function(req, res) {
  var url = req.query.url;
  var videodiv;
  request(url,function(error, response, body){
  	if(!error && response.statusCode == 200){
  		var $ = cheerio.load(body);
  		videodiv = $('#video').html();
  		res.send(videodiv);
  	}
  });
  
});

module.exports = router;
