module.exports = function( sequelize, DataTypes) {
  return sequelize.define('Document', {
    title: DataTypes.STRING,
    slug: DataTypes.STRING,
    content: DataTypes.TEXT,
    makeID: DataTypes.STRING
  });
};
