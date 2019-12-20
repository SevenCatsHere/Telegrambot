const fetch = require('node-fetch');
const server = "http://localhost:4000";
const apiGetKarma = "/api/bot/getUserKarma";

class Karma {
    constructor(context) {
        this.context = context;
        this.user = context.message.from.username;
        this.message = context.message.text;
        this.giveKarma = this.giveKarma.bind(this);
        this.takeKarma = this.takeKarma.bind(this);
        this.checkKarma = this.checkKarma.bind(this);
    }

    giveKarma() {
        let kReciever = this.message.substring(1, this.message.indexOf('++'));
        let query = server+apiGetKarma+kReciever;
        fetch(query)
            .then(res => res.json())
            .then(body => {
                this.context.reply(kReciever+" now has "+body.karma+" karma");
            });
    }

    takeKarma() {
        let reciever = this.message.substring(1, this.message.indexOf('—'));
        let reply =  this.user+" takes karma from "+reciever;
        this.context.reply(reply);
    }

    checkKarma() {
        let reply =  this.user+" is fishing for karma!";
        this.context.reply(reply);
    }
}

module.exports = Karma;