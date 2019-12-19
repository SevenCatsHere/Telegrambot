const KarmaController = require('./karmaController.js');

class BotController {
    constructor(context) {
        this.context = context;
        this.launchCommand = this.launchCommand.bind(this);
    }

    launchCommand(message) {
        if(message.includes("++") || message.includes("—") || message.includes("karma")) {
            let kC = new KarmaController(this.context);
            let cmd = kC.getCommand();
            kC.runCommand(cmd);
        }
    }
}

module.exports = BotController;