const Telegraf = require('telegraf')


class Bot {
    constructor(config) {
        this.bot = new Telegraf(config.BotApiKey);

        this.bot.on('text', (ctx) => {
            console.log(ctx.message);
        });
    }
}

module.exports = Bot;