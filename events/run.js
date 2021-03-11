const setting = require('../setting');
const scripts = require('../scripts');
const child_process = require('child_process');

module.exports = function (interaction) {
	if (interaction.data.name !== 'run') return;
	const { member, data } = interaction;
	if (!setting.allowUsers.includes(member.user.id)) return;
	const { options } = data;
	const { value } = options.find(a => a.name === 'script名');
	
	const script = scripts.find(script => script.name === value);
	child_process.exec(script.script, {
		cwd: script.cwd
	}, function (error, stdout, stderr) {
		if (error) {
			this.api.interactions(interaction.id, interaction.token).callback.post({data: {
				type: 4,
				data: {
					content: '失敗しました'
				}
			}});
		} else if (stderr) {
			this.api.interactions(interaction.id, interaction.token).callback.post({data: {
				type: 4,
				data: {
					content: `\`${stderr}\``
				}
			}});
		} else {
			this.api.interactions(interaction.id, interaction.token).callback.post({data: {
				type: 4,
				data: {
					content: `\`${stdout}\``
				}
			}});
		}
	})
}