const mongoose = require("mongoose"),
  modelSchema = mongoose.Schema({
    id: String,
    Name: String,
    Authorname: String,
    Description: String,
    Bookimage: String
  });
module.exports = mongoose.model("model_schema", modelSchema);