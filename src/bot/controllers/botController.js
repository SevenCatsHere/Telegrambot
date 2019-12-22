'use strict';

const KarmaController = require('./karmaController.js');

class BotController {
	constructor(context, server) {
		this.context = context;
		this.server = server;
		this.launchCommand = this.launchCommand.bind(this);
	}

	launchCommand(message) {
		if (['++', '-', 'karma'].some((a) => message.includes(a))) {
			console.log(`botController passes ${this.server} as server to karma.js`);
			const kC = new KarmaController(this.context, this.server);
			const cmd = kC.getCommand();
			kC.runCommand(cmd);
		}
	}
}

module.exports = BotController;
