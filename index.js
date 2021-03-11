require('dotenv').config();

const Discord = require('discord.js');
const bot = new Discord.Client();
require('discord.js-slash-command')(bot);

const events = require('./events');

bot.on('ready', events.ready);
bot.on('interactionCreate', events.interactionCreate);

bot.login(process.env.DISCORD_BOT_TOKEN);
