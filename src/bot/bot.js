const Telegraf = require('telegraf')
const BotController = require('./controllers/botController.js');


class Bot {
    constructor(config) {
        this.bot = new Telegraf(config.BotApiKey);

        this.bot.on('text', (context) => {
            let message = context.message.text;
            let bC = new BotController(context, config.Server);
            bC.launchCommand(message);
        });

        this.launch = this.launch.bind(this);
    }

    launch() {
        this.bot.launch();

    }
}

module.exports = Bot;