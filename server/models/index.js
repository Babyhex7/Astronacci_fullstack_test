// Inisialisasi semua model dan relasi
const { sequelize } = require("../config/database");
const User = require("./User");
const Membership = require("./Membership");
const Article = require("./Article");
const Video = require("./Video");
const UserContentHistory = require("./UserContentHistory");

// === RELASI ANTAR MODEL ===

// Membership 1:N User (Satu membership punya banyak user)
Membership.hasMany(User, { foreignKey: "membership_id", as: "users" });
User.belongsTo(Membership, { foreignKey: "membership_id", as: "membership" });

// User 1:N UserContentHistory (Satu user punya banyak history)
User.hasMany(UserContentHistory, {
  foreignKey: "user_id",
  as: "contentHistory",
});
UserContentHistory.belongsTo(User, { foreignKey: "user_id", as: "user" });

module.exports = {
  sequelize,
  User,
  Membership,
  Article,
  Video,
  UserContentHistory,
};
