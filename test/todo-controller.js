const { expect } = require("chai");
const sinon = require("sinon");
const mongoose = require("mongoose");
const Todo = require("./../models/todo-model");
const { getTodos } = require("./../controllers/todo-controller");
require("dotenv").config();

describe("Testing todo-controller", () => {
  const userId = "507f1f77bcf86cd799439011";

  before(function (done) {
    mongoose
      .connect(
        `${process.env.MONGO_URI}/todos-testing?retryWrites=true&w=majority`
      )
      .then(() => {
        console.log("DB connected");
        done();
      })
      .catch((e) => {
        console.log("Connection to DB failed");
      });
  });

  // Testing for one function is shown. We can write similar tests for other controllers.

  it("should get all todos", (done) => {
    const req = {
      user: {
        _id: userId,
      },
    };

    // We get status and json alone. But we are sending more values for easy retrieval.
    const res = {
      statusCode: 500,
      todos: null,
      status: function (code) {
        this.statusCode = code;
      },
      json: function (data) {
        this.todos = data.todos;
      },
    };

    getTodos(req, res, () => {})
      .then(() => {
        expect(res.statusCode).to.be.equal(200);
        expect(res.todos.length).to.be.equal(0);
        done();
      })
      .catch((e) => {
        console.log("error ", e);
      });
  });

  after((done) => {
    Todo.deleteMany({})
      .then(() => {
        return mongoose.disconnect();
      })
      .then(() => {
        done();
      })
      .catch((e) => {
        console.log(e);
      });
  });
});
