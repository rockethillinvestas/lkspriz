var EventEmitter = require('events').EventEmitter;
var emitter = new EventEmitter();

var userInterface = {
	tableVisible: false,
	graphVisible: false
};

module.exports = {
	getInterface: () => {
		return userInterface;
	},

	subscribe: (callback) => {
		emitter.on('update', callback);
	},

	unsubscribe:  (callback) => {
		emitter.removeListener('update', callback);
	},

	updateInterface: (data) => {
		userInterface = {...userInterface, [data.name]: data.value };
		emitter.emit('update');
	}
};