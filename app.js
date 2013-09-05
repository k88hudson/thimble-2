var express = require('express');
var Habitat = require('habitat');

Habitat.load();

var app = express();
var env = new Habitat();
var optimize = env.get('OPTIMIZE');
var db = require('./models')();
var routes = require('./routes');

var cacheSettings = optimize ? { maxAge: '31556952000' } : undefined; // one year;

app.locals({
  OPTIMIZE: env.get('OPTIMIZE')
});

app.set('view engine', 'jade');
app.set('views', __dirname + '/src');
app.use(express.logger( env.get('OPTIMIZE') ? '' : 'dev'));
app.use(express.compress());
app.use(express.bodyParser());
app.use(express.static(__dirname + '/dist', cacheSettings));
app.use(express.static(__dirname + '/public', cacheSettings));
app.use('/bower_components', express.static(__dirname + '/bower_components', cacheSettings));

app.use(app.router);
routes(app, db);

app.listen(env.get('PORT'), function () {
  console.log('Now listening on http://localhost:%d', env.get('PORT'));
});
