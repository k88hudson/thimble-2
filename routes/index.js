module.exports = function(app, db) {
  var routes = {
    db: require('../controllers/db')(db),
    site: require('../controllers/site')
  };

  app.get('/', routes.db.loadProject, routes.site.main);
  app.get('/project/:id', routes.db.loadProject, routes.site.main);
  app.get('/console', routes.site.page('console'));

  app.get('/all', routes.db.all);
  app.get('/id/:id', routes.db.get);

  app.post('/create', routes.db.create);
  app.post('/update', routes.db.update);

};
