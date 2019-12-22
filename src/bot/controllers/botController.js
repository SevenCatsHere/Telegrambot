const KarmaController = require('./karmaController.js');

class BotController {
    constructor(context, server) {
        this.context = context;
        this.server = server;
        this.launchCommand = this.launchCommand.bind(this);
    }

    launchCommand(message) {
        if(message.includes("++") || message.includes("—") || message.includes("karma")) {
            console.log("botController passes "+this.server+" as server to karma.js");
            let kC = new KarmaController(this.context, this.server);
            let cmd = kC.getCommand();
            kC.runCommand(cmd);
        }
    }
}

module.exports = BotController;