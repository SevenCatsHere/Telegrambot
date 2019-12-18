'use strict'
 
const Telegram = require('telegram-node-bot')
const TelegramBaseController = Telegram.TelegramBaseController
const TextCommand = Telegram.TextCommand
const tg = new Telegram.Telegram('802030311:AAHZT6zsE0WThQvwbu8XIdW_6VCvSY4dbDE')
 
class PingController extends TelegramBaseController {
    /**
     * @param {Scope} $ 
     */
    pingHandler($) {
        $.sendMessage('pong')
    }
 
    get routes() {
        return {
            'pingCommand': 'pingHandler'
        }
    }
}
 
tg.router
    .when(
        new TextCommand('ping', 'pingCommand'),
        new PingController()
    )