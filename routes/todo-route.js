const express = require("express");
const authMiddleware = require("./../middleware/verifyToken");
const {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todo-controller");
const Router = express.Router();

Router.get("/getAllTodos", authMiddleware, getTodos);
Router.post("/createTodo", authMiddleware, createTodo);
Router.put("/updateTodo", authMiddleware, updateTodo);
Router.delete("/deleteTodo", authMiddleware, deleteTodo);

module.exports = Router;
