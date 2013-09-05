module.exports = {
  main: function(req, res) {
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
  page: function(view) {
    return function (req, res) {
      return res.render(view);
    };
  }
};
