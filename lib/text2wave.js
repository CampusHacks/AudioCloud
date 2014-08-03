
var config = require('../config.json');

var exec = require('child_process').exec,
	fs   = require('fs'),
	uuid = require('node-uuid'),
	path = require('path');

var languages = {
	'es': '(language_castillian_spanish)',
	'en': ''
}


module.exports = function (text, lang, callback){

	var id = uuid.v4()

	var file_path = path.join(config.output_dir, id)

	var input_path = file_path + '.txt'
	var output_path = file_path + '.wav'

	fs.writeFileSync(input_path, text);

	exec('text2wave {path}.txt -eval {lang} -o {path}.wav'.format({

		input: input_path,
		output: output_path,
		lang: languages[lang] || ''

	}), function (err, stdout){

		if(err){
			callback(new Error({err: err, output: stdout}))
		} else {
			callback(null, fs.createReadStream(output))
		}
	});

};


String.prototype.format = function() {

	var formatted = this

    if(typeof arguments[0] == 'object'){
    	var object = arguments[0]
    	for (key in object){
    		var regexp = new RegExp('\\{'+key+'\\}', 'gi')
	        formatted = formatted.replace(regexp, object[key])
    	}
    } else{
	    for (var i = 0; i < arguments.length; i++) {
	        var regexp = new RegExp('\\{'+i+'\\}', 'gi')
	        formatted = formatted.replace(regexp, arguments[i])
	    }
    }

    return formatted

};