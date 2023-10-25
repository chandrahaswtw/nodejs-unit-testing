const { expect } = require("chai");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/verifyToken");
const sinon = require("sinon");

// NOTE:
// - Place return infront of next() as while testing it will not end there just like in node.js.
// - It doesn't understand what next() is.

describe("Test cases of verify token", () => {
  it("Should fail if there is no authorization header", () => {
    const req = { get: () => {} };

    // We cannot compare objects directly, it always return false. So just comparing error messages.
    let error;

    // Faking next and we are assigning the error to e.
    const next = sinon.fake((e) => {
      error = e;
    });

    verifyToken(req, () => {}, next);

    // Using the API on spies as fake is built on spies.
    expect(next.called).to.be.true;
    expect(error.message).to.equal("Not authenticated");
  });

  it("Should fail if id is not present in the decoded token", () => {
    const req = { get: () => "Auth header" };

    // We cannot compare objects directly, it always return false. So just comparing error messages
    let error;

    // Faking next and we are assigning the error to e.
    const next = sinon.fake((e) => {
      error = e;
    });

    // We replaced the verify from jwt with a custom function.
    sinon.replace(jwt, "verify", () => {
      return { idd: "No id" };
    });
    verifyToken(req, () => {}, next);

    // Restores everything
    sinon.restore();

    // Using the API on spies as fake is built on spies.
    expect(next.called).to.be.true;
    expect(error.message).to.equal("id is not found in the token");
  });
});
