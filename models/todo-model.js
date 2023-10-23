const mongoose = require("mongoose");
const { Schema } = mongoose;

const todoSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Todo", todoSchema, "todos");
