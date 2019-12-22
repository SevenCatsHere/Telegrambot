const fetch = require('node-fetch');

const apiGetKarma = '/api/bot/addKarma';

class Karma {
	constructor(context, server) {
		this.context = context;
		this.server = server;
		this.user = context.message.from.username;
		this.message = context.message.text;
	}

	async handleKarmaCall(method) {
		let karmaPerson; let
			query;
		switch (method) {
		case 'add':
		case 'take':
			const mSubstring = method === 'add' ? '++' : '—';
			karmaPerson = this.message.substring(1, this.message.indexOf(mSubstring));
			break;
		case 'get':
			karmaPerson = this.message.replace('/karma', '').trim();
			break;
		}
		query = `${this.server + apiGetKarma}/?name=${karmaPerson}&method=${method}`;
		try {
			await fetch(query)
				.then((res) => res.json())
				.then((body) => {
					const karma = body.karma === undefined ? 1 : body.karma;
					const replyBody = method === 'get' ? ' has ' : ' now has ';
					this.context.reply(`${karmaPerson + replyBody + karma} karma`);
				});
		} catch (error) {
			console.error(error);
		}
	}

	async giveKarma() {
		this.handleKarmaCall('add');
	}

	async takeKarma() {
		this.handleKarmaCall('take');
	}

	checkKarma() {
		this.handleKarmaCall('get');
	}
}

module.exports = Karma;
