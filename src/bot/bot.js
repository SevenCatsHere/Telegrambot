const Telegraf = require('telegraf');
const BotController = require('./controllers/botController.js');


class Bot {
	constructor(config) {
		this.bot = new Telegraf(config.BotApiKey);

		this.bot.on('text', (context) => {
			const message = context.message.text;
			const bC = new BotController(context, config.Server);
			bC.launchCommand(message);
		});

		this.launch = this.launch.bind(this);
	}

	launch() {
		this.bot.launch();
	}
}

module.exports = Bot;
