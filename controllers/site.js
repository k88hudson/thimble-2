module.exports = {
  editor: function(req, res) {
    var defaultProject = {
      id: '',
      title: 'This is my project',
      slug: 'my-project',
      content: 'Hi...'
    };
    var projectData = req.project || defaultProject;
    res.render('index', {
      project: projectData
    });
  },
  output: function(req, res) {
    if (!req.project ) {
      return res.send('Oops, no project found for this ID.');
    }
    res.render('output', {
      project: req.project
    });
  },
  page: function(view) {
    return function (req, res) {
      return res.render(view);
    };
  }
};
