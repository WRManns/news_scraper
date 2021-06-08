const User = require('./User');
const SavedNews = require('./SavedNews');

User.hasMany(SavedNews, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

SavedNews.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, SavedNews };
