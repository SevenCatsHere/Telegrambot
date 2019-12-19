const Telegraf = require('telegraf')
const Karma = require('./modules/karma.js');


class Bot {
    constructor(config) {
        this.bot = new Telegraf(config.BotApiKey);

        this.bot.on('text', (ctx) => {
            let message = ctx.message.text;
            if(message.includes("++")) {
                let karma = new Karma(ctx);
                karma.giveKarma();
            };
        });

        this.launch = this.launch.bind(this);
    }

    launch() {
        this.bot.launch();

    }
}

module.exports = Bot;