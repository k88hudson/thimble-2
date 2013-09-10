module.exports = function (db) {
  var controller = {};

  controller.all = function (req, res) {
    db.all(function (err, result) {
      if (err) {
        return res.json({
          error: err
        });
      }
      res.json({
        data: result
      });
    });
  };

  controller.create = function (req, res) {
    var data = req.body;
    console.log(req.body);
    db.create(data, function (err, result) {
      if (err) {
        return res.json({
          message: "Oops, we have a problem.",
          error: err
        });
      }
      res.json({
        data: result
      });
    });
  };

  controller.get = function (req, res) {
    var id = req.params.id;
    db.id(id, function (err, result) {
      if (err) {
        return res.json({
          message: 'There was a database error',
          error: err
        });
      }
      res.json({
        data: result
      });
    });
  };

  controller.update = function (req, res) {
    var data = req.body;
    var id = req.body.id;
    db.update(id, data, function (err, result) {
      console.log(err, result);
      if (err) {
        return res.json({
          message: 'There was a database error',
          error: err
        });
      }
      res.json({
        data: result
      });
    });
  };

  controller.destroy = function (req, res) {
    var id = req.body.id;
    db.destroy(id, function (err, result) {
      if (err) {
        return res.json({
          message: 'There was a database error',
          error: err
        });
      }
      res.json({
        data: result
      });
    });
  };

  controller.loadProject = function (req, res, next) {
    var id = req.params.id;
    if (!id) {
      return next();
    }
    db.id(id, function (err, result) {
      if (err || !result) {
        return next(err);
      } else {
        req.project = result.values;
        next();
      }
    });
  };

  return controller;

};
