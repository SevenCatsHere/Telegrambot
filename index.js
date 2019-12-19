const Bot = require('./src/bot/bot.js');
const config = require('./config.js');

Bot_Instance = new Bot(config);

Bot_Instance.launch()