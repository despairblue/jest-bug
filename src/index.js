const delay = require("delay");

module.exports = function() {
  async function run() {
    let i = 0;

    while (true) {
      if (i === 3) {
        throw new Error();
      } else {
        i++;
        await delay(1000);
      }
    }
  }

  run();
};
