const setting = require('../setting');
const servers = require('../servers');
const child_process = require('child_process');
const commands = require('../commands');

module.exports = function (interaction) {
	const { member, data } = interaction;
	const { options } = data;
	const command = commands[data.name];
	if (!command) return;

	const serverValue = options.find(a => a.name === 'サーバー名').value;
	const server = servers.find(server => server.name === serverValue);
	if (setting.allowUsers.includes(member.user.id)) {
		this.api.interactions(interaction.id, interaction.token).callback.post({data: {
			type: 4,
			data: {
				content: command.onSuccess(server)
			}
		}});
		child_process.exec(server[command.runCommand] || command.defaultCommand, {
			cwd: server.wd
		},  (error, stdout, stderr) => {
			if (error) {
				console.log(error);
			}
		});
	} else {
		this.api.interactions(interaction.id, interaction.token).callback.post({data: {
			type: 4,
			data: {
				content: command.onError(server)
			}
		}});
	}
}