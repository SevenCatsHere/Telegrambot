const Telegraf = require('telegraf')


class Karma {
    constructor(context) {
        this.context = context;
        this.user = context.message.from.username;
        this.room = context.message.chat.title;
        this.message = context.message.text;
        this.reciever = this.message.substring(1, this.message.indexOf('++'));
        this.giveKarma = this.giveKarma.bind(this);
    }

    giveKarma = () => {
        console.log("Karma attempt recieved");
        let reply =  this.user+" sends karma to "+this.reciever+" in the "+this.room+" channel!";
        this.context.reply(reply);
    }
}

module.exports = Karma;