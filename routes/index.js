module.exports = function(app, db) {
  var routes = {
    db: require('../controllers/db')(db),
    site: require('../controllers/site')
  };

  app.get('/', routes.db.loadProject, routes.site.editor);
  app.get('/project/:id/edit', routes.db.loadProject, routes.site.editor);
  app.get('/project/:id', routes.db.loadProject, routes.site.output);
  app.get('/console', routes.site.page('console'));

  app.get('/all', routes.db.all);
  app.get('/id/:id', routes.db.get);

  app.post('/create', routes.db.create);
  app.post('/update', routes.db.update);
  app.post('/delete', routes.db.destroy);

};
