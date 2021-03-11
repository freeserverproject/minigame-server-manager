const Discord = require('discord.js');
const bot = new Discord.Client();
require('discord.js-slash-command')(bot);

const events = require('./events');

bot