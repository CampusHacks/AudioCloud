var config = require('./config.json')

require('./lib/server').listen(config.server.port);