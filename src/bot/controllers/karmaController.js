const Karma = require('../modules/karma.js');

class KarmaController {
    constructor(context) {
        this.context = context;
        this.karma = new Karma(context);
    }

    getCommand() {
        let message = this.context.message.text;
        if(message.includes("++")){
            return 1;
        }
        else if(message.includes("—")) {
            console.log("minus");
            return -1;
        }
        else if(message.includes("karma")) {
            return 0;
        }
        return null;
    }

    runCommand(command) {
        switch(command) {
            case 1: {
                this.karma.giveKarma();
                break;
            }
            case -1: {
                this.karma.takeKarma();
                break;
            }
            case 0: {
                this.karma.checkKarma();
                break;
            }
        }
    }
}

module.exports = KarmaController;