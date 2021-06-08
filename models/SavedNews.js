const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class SavedNews extends Model {}

SavedNews.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    urlnews:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    title:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    description:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'saved_article',
  }
);

module.exports = SavedNews;
