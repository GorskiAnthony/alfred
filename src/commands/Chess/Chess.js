const Command = require("../command");
const axios = require("axios");

getUserAccount = (user) => {
	console.log(`https://api.chess.com/pub/player/${user}`);
	return axios.get(`https://api.chess.com/pub/player/${user}`);
};
getUserStats = (user) => {
	console.log(`https://api.chess.com/pub/player/${user}/stats`);
	return axios.get(`https://api.chess.com/pub/player/${user}/stats`);
};

module.exports = class Btc extends (
	Command
) {
	static match(message) {
		return message.content.startsWith("!chess");
	}

	static action(message) {
		const args = message.content.split(" ");
		const user = args[1].toLowerCase();
		Promise.all([getUserAccount(user), getUserStats(user)])
			.then(function (results) {
				const acct = results[0].data;
				const stats = results[1].data;

				if (stats.chess_rapid === undefined && stats.chess_blitz) {
					message.channel.send(
						`Pour le joueur **${acct.username}** voici ses stats
	
	> Partie blitz. 
	- Gagnant : ${stats.chess_blitz.record.win}.
	- Perdant : ${stats.chess_blitz.record.loss}.
	- Null : ${stats.chess_blitz.record.draw}`
					);
				} else if (
					stats.chess_blitz === undefined &&
					stats.chess_rapid
				) {
					message.channel.send(
						`Pour le joueur **${acct.username}** voici ses stats
	
	> Partie rapide.
	- Gagnant : ${stats.chess_rapid.record.win}.
	- Perdant : ${stats.chess_rapid.record.loss}.
	- Null : ${stats.chess_rapid.record.draw}`
					);
				} else if (stats.chess_rapid && stats.chess_blitz) {
					message.channel.send(
						`Pour le joueur **${acct.username}** voici ses stats
	
	> Partie rapide.
	- Gagnant : ${stats.chess_rapid.record.win}.
	- Perdant : ${stats.chess_rapid.record.loss}.
	- Null : ${stats.chess_rapid.record.draw}
	
	> Partie blitz. 
	- Gagnant : ${stats.chess_blitz.record.win}.
	- Perdant : ${stats.chess_blitz.record.loss}.
	- Null : ${stats.chess_blitz.record.draw}`
					);
				} else {
					message.reply(
						`${args[1]} ce joueur n'a pas fait de partie publique`
					);
				}
			})
			.catch(() => {
				message.reply(`Désolé, je ne connais pas le joueur ${args[1]}`);
			});
	}
};
