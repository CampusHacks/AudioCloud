
/*

8b    d8  dP"Yb  8888b.  88   88 88     888888 .dP"Y8 
88b  d88 dP   Yb  8I  Yb 88   88 88     88__   `Ybo." 
88YbdP88 Yb   dP  8I  dY Y8   8P 88  .o 88""   o.`Y8b 
88 YY 88  YbodP  8888Y"  `YbodP' 88ood8 888888 8bodP' 

*/

var express = require('express'),
	app = express(),
	tts = require('./text2wave')

/*

8b    d8 88 8888b.  8888b.  88     888888 Yb        dP    db    88""Yb 888888 .dP"Y8 
88b  d88 88  8I  Yb  8I  Yb 88     88__    Yb  db  dP    dPYb   88__dP 88__   `Ybo." 
88YbdP88 88  8I  dY  8I  dY 88  .o 88""     YbdPYbdP    dP__Yb  88"Yb  88""   o.`Y8b 
88 YY 88 88 8888Y"  8888Y"  88ood8 888888    YP  YP    dP""""Yb 88  Yb 888888 8bodP' 

*/

// JSON/FormEncoded post parser
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded
app.use(bodyParser.json()) // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })) // parse application/vnd.api+json as json

// Multipart forms and upload handler
var multipart = require('connect-multiparty');
app.use(multipart())

/*

88""Yb  dP"Yb  88   88 888888 888888 88""Yb 
88__dP dP   Yb 88   88   88   88__   88__dP 
88"Yb  Yb   dP Y8   8P   88   88""   88"Yb  
88  Yb  YbodP  `YbodP'   88   888888 88  Yb 

*/

app.post('/tts/v1', function (req, res){

	if(req.body && req.body.text){
		var lang = req.body.lang ? req.body.lang : 'en'
		var text = req.body.text

		tts(text, lang, function (err, stream){

			if(err || !stream){
				return res.status(500).send({error: 'Failed to translate input'})
			}

			stream.pipe(res)

		});

	} else {
		res.status(404).send({error: 'Text was not sent'})
	}

});

module.exports = app