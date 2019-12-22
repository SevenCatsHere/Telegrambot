'use strict';

const Karma = require('../modules/karma.js');

class KarmaController {
	constructor(context, server) {
		this.context = context;
		this.karma = new Karma(context, server);
	}

	getCommand() {
		const message = this.context.message.text;
		if (message.includes('++')) return 1;
		if (message.includes('—')) return -1;
		if (message.includes('/karma')) return 0;
		return null;
	}

	runCommand(command) {
		if (command === 1) this.karma.giveKarma();
		else if (command === -1) this.karma.takeKarma();
		else this.karma.checkKarma();
	}
}

module.exports = KarmaController;
