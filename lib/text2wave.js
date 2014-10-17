
var config = require('../config.json');

var exec = require('child_process').exec,
	fs   = require('fs'),
	uuid = require('node-uuid'),
	path = require('path');

var languages = {
	'es': '(language_castillian_spanish)',
}


module.exports = function (text, lang, callback){

	var id = uuid.v4()

	var file_path = path.join(config.output_dir, id)

	var input_path = file_path + '.txt'
	var output_path = file_path + '.wav'

    var conversion = '&& lame -h -b 92 {output} {file}.mp3'

	fs.writeFile(input_path, text, function (err) {
		if (err) return callback(err);
		var command = 'text2wave {input} -o {output}'
		var command_full = 'text2wave {input} -eval \"{lang}\" -o {output}'

		command = languages[lang] ? command_full : command
        command += conversion

        var cmd = command.format({

            input: input_path,
            output: output_path,
            file: file_path,
            lang: languages[lang] || ''

        });

		exec(cmd, function (err, stdout){
            console.log(err);
			if(err){
				callback(new Error({err: err, output: stdout}))
			} else {
				callback(null, fs.createReadStream(file_path + '.mp3'))
			}
		});

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