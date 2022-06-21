const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = process.env.MONGO_URL || "mongodb://localhost/events";
db.events = require("./event.model.js")(mongoose);
db.categories = require("./category.model.js")(mongoose);

module.exports = db;
