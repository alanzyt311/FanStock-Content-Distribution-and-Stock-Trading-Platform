const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
  // all the tables follow determined table name
  define: {
    freezeTableName: true,
  },
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tutorial = require("./tutorial.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);
db.stock = require("./stock.model.js")(sequelize, Sequelize);
db.post = require("./post.model.js")(sequelize, Sequelize);
db.userStock = require("./user-stock.model.js")(sequelize, Sequelize);
db.searchHistory = require("./search-history.model.js")(sequelize, Sequelize);
db.like = require("./like.model.js")(sequelize, Sequelize);
db.transaction = require("./transaction.model.js")(sequelize, Sequelize);
db.postStock = require("./post-stock.model.js")(sequelize, Sequelize);
db.view = require("./view.model.js")(sequelize, Sequelize);

// Relatioships
// user-post : many-to-one
db.user.hasMany(db.post);
db.post.belongsTo(db.user);

// user-searchHistory : one-to-many
db.user.hasMany(db.searchHistory);
db.searchHistory.belongsTo(db.user);

// user-stock: many-to-many
db.user.belongsToMany(db.stock, { through: db.userStock });
db.stock.belongsToMany(db.user, { through: db.userStock });
db.user.hasMany(db.userStock);
db.userStock.belongsTo(db.user);
db.stock.hasMany(db.userStock);
db.userStock.belongsTo(db.stock);

// user-like-post : many-to-many
db.user.belongsToMany(db.post, { through: db.like });
db.post.belongsToMany(db.user, { through: db.like });
db.user.hasMany(db.like);
db.like.belongsTo(db.user);
db.post.hasMany(db.like);
db.like.belongsTo(db.post);

// user-view-post : many-to-many
db.user.belongsToMany(db.post, { through: db.view });
db.post.belongsToMany(db.user, { through: db.view });
db.user.hasMany(db.view);
db.view.belongsTo(db.user);
db.post.hasMany(db.view);
db.view.belongsTo(db.post);

// user-transaction-stock : many-to-many
db.user.belongsToMany(db.stock, { through: db.transaction });
db.stock.belongsToMany(db.user, { through: db.transaction });
db.user.hasMany(db.transaction);
db.transaction.belongsTo(db.user);
db.stock.hasMany(db.transaction);
db.transaction.belongsTo(db.stock);

// post-stock : many-to-may
db.user.belongsToMany(db.stock, { through: db.postStock });
db.stock.belongsToMany(db.user, { through: db.postStock });
db.user.hasMany(db.postStock);
db.postStock.belongsTo(db.user);
db.stock.hasMany(db.postStock);
db.postStock.belongsTo(db.stock);

// db.post.belongsToMany(db.stock, { through: db.postStock });
// db.stock.belongsToMany(db.post, { through: db.postStock });
// db.post.hasMany(db.postStock);
// db.postStock.belongsTo(db.post);
// db.stock.hasMany(db.postStock);
// db.postStock.belongsTo(db.stock);

module.exports = db;
