const setting = require('../setting');
const servers = require('../servers');
const scripts = require('../scripts');

module.exports = async function () {
	await this.registerCommandToGuild(setting.targetGuildId, {
		name: 'start',
		description: 'ミニゲーム鯖を起動します',
		options: [
			{
				name: 'サーバー名',
				description: '起動したいサーバー名を指定してください',
				type: 3,
				required: true,
				choices: servers.map(server => ({
					name: server.label,
					value: server.name
				}))
			}
		]
	});
	await this.registerCommandToGuild(setting.targetGuildId, {
		name: 'stop',
		description: 'ミニゲーム鯖を停止します',
		options: [
			{
				name: 'サーバー名',
				description: '停止したいサーバー名を指定してください',
				type: 3,
				required: true,
				choices: servers.map(server => ({
					name: server.label,
					value: server.name
				}))
			}
		]
	});
	await this.registerCommandToGuild(setting.targetGuildId, {
		name: 'run',
		description: 'scriptを走らせます',
		options: [
			{
				name: 'script名',
				description: '指定されたscriptを実行し結果を返します',
				type: 3,
				required: true,
				choices: scripts.map(script => ({
					name: script.name,
					value: script.name
				}))
			}
		]
	});
}