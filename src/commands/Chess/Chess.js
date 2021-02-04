const Command = require("../command");
const axios = require("axios");

getUserAccount = (user) => {
	return axios.get(`https://api.chess.com/pub/player/${user}`);
};
getUserStats = (user) => {
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

				result.map((word) => {
					console.log(word);
				});

				const pattern = "chess_";
				const result = Object.keys(stats).filter((str) => {
					return str.includes(pattern);
				});

				console.log(result);
				message.channel.send("coco");
				console.log(messagePush);
			})
			.catch(() => {
				message.reply(`Désolé, je ne connais pas le joueur ${args[1]}`);
			});
	}
};
