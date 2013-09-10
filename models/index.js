var Sequelize = require('sequelize');

module.exports = function () {
  var sequelize = new Sequelize('db', 'username', 'password', {
    dialect: 'sqlite',
    storage: 'db.sqlite',
    logging: false
  });

  var model = sequelize.import(__dirname + '/document.js');

  sequelize.sync().complete(function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('Successfully synced.')
    }
  });

  return {
    all: function (callback) {
      model.findAll().complete(callback);
    },
    id: function (id, callback) {
      model.find(id).complete(callback);
    },
    create: function (data, callback) {
      if (!data) {
        return callback('No data was received');
      }
      var doc = model.build(data);
      doc.save().complete(callback);
    },
    update: function (id, data, callback) {
      model.find(id).complete(function (err, document) {
        if (!document) {
          return callback('No entry found for id #' + id);
        }
        document.updateAttributes(data).complete(callback);
      });
    },
    delete: function (id, callback) {
      model.find(id).success(function (document) {
        document.destroy().complete(callback);
      });
    }
  };

};
