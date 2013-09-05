var Sequelize = require('sequelize');

function errHandler(err) {
  console.log(err);
}

function successHandler() {
  console.log('success');
}

module.exports = function () {
  var sequelize = new Sequelize('db', 'username', 'password', {
    dialect: 'sqlite',
    storage: 'db.sqlite',
    logging: false
  });

  var model = sequelize.import(__dirname + '/model.js');

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
        return callback({
          err: 'No data was received'
        });
      }
      var doc = model.build(data);
      // var err = doc.validate();
      // console.log(err);
      // if (err) {
      //   return callback(err);
      // }
      doc.save().complete(callback);
    },
    update: function (id, data, callback) {

    },
    delete: function (id, callback) {

    }
  };

};
