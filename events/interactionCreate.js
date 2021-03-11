const setting = require('../setting');
const servers = require('../servers');
const child_process = require('child_process');

module.exports = function (interaction) {
	const { member, data } = interaction;
	const { options } = data;
	const serverValue = options.find(a => a.name === 'サーバー名').value;
	const server = servers.find(server => server.name === serverValue);

	if (data.name === 'start') {
		if (setting.allowUsers.includes(member.user.id)) {
			child_process.exec(server.run, {
				cwd: server.wd
			},  (error, stdout, stderr) => {
				if (error) {
					this.api.interactions(interaction.id, interaction.token).callback.post({data: {
						type: 4,
						data: {
							content: `${server.label}の起動に失敗しました`
						}
					}});
				} else {
					this.api.interactions(interaction.id, interaction.token).callback.post({data: {
						type: 4,
						data: {
							content: `${server.label}を起動しました`
						}
					}});
				}
			});
		} else {
			this.api.interactions(interaction.id, interaction.token).callback.post({data: {
				type: 4,
				data: {
					content: `${server.label}の起動に失敗しました`
				}
			}});
		}
	}
}