var EventEmitter = require("events").EventEmitter;
var emitter = new EventEmitter();

var userInterface = {
  tableVisible: false,
  salmonType: 0,
  timespan: 365
};

module.exports = {
  getInterface: () => {
    return userInterface;
  },

  subscribe: callback => {
    emitter.on("update", callback);
  },

  unsubscribe: callback => {
    emitter.removeListener("update", callback);
  },

  updateInterface: data => {
    userInterface = { ...userInterface, [data.name]: data.value };
    emitter.emit("update");
  }
};
