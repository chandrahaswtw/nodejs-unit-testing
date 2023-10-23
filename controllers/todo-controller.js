const Todo = require("./../models/todo-model");

const getTodos = async (req, res, err) => {
  try {
    const todos = await Todo.find({ userId: req.user._id });
    return res.json({ todos });
  } catch (err) {
    next(err);
  }
};

const createTodo = async (req, res, next) => {
  try {
    const { name } = req.body;
    const todo = new Todo({ name, userId: req.user._id });
    await todo.save();
    return res.status(200).json({ message: `${name} is saved` });
  } catch (err) {
    next(err);
  }
};

const updateTodo = async (req, res, next) => {
  try {
    const { id, name } = req.body;
    await Todo.findByIdAndUpdate(id, { name });
    return res.status(200).json({ message: `${name} is updated` });
  } catch (err) {
    next(err);
  }
};

const deleteTodo = async (req, res, next) => {
  try {
    const { id } = req.body;
    await Todo.findByIdAndRemove(id);
    return res.status(200).json({ message: `Todo is deleted` });
  } catch (err) {
    next(err);
  }
};

module.exports = { getTodos, createTodo, updateTodo, deleteTodo };
