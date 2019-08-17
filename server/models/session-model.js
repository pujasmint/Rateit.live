const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = require("mongodb").ObjectID;

const sessionSchema = new Schema(
{ name: String,
  invitekey: String,
  status: String,
  creator: {type: ObjectId, ref: "users"}  
}, {
    timestamps: true
 }
);

const Session = mongoose.model("session", sessionSchema);
module.exports = Session;

