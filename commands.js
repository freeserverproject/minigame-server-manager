module.exports = {
	start: {
		runCommand: 'start',
		defaultCommand: './start.sh',
		onSuccess: server => `${server.label}を起動しました`,
		onError: server => `${server.label}の起動に失敗しました`,
		inProgress: server => `現在処理中です`
	},
	stop: {
		runCommand: 'stop',
		defaultCommand: './stop.sh',
		onSuccess: server => `${server.label}を停止しました`,
		onError: server => `${server.label}の停止に失敗しました`,
		inProgress: server => `現在処理中です`
	}
}