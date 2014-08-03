
var config = require('../config.json');

var exec = require('child_process').exec;
var uuid = require('node-uuid');

var languages = {
	'es': '(language_castillian_spanish)',
	'en': ''
}


module.exports = function (text, lang, callback){

	var id = uuid.v4();

	console.log(id);

};

module.exports();