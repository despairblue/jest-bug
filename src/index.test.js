const foo = require(".");

describe("foo", () => {
  test("bar", done => {
    process.removeAllListeners("unhandledRejection");
    process.on("unhandledRejection", function(error) {
      process.removeAllListeners("unhandledRejection");
      expect(error).toBeInstanceOf(Error);
      done();
    });

    foo();
  });
});
