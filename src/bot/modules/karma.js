const fetch = require('node-fetch');
const server = "http://139.162.242.97";
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

    async giveKarma() {
        let kReciever = this.message.substring(1, this.message.indexOf('++'));
        let query = server+apiGetKarma+":"+kReciever;
        try {
            await fetch(query)
                .then(res => {
                    return res.json()
                })
                .then(body => {
                    let karma = body.karma === undefined? 1 : body.karma;
                    this.context.reply(kReciever+" now has "+karma+" karma");
                });
        }catch (error) {
            console.error(error);
        }
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
