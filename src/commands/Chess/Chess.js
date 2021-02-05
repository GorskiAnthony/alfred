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
				const finalResult = [];

				/** l'api donne pour chaque partie le prefix chess_ */
				const pattern = "chess_";
				/** Je filtre le pattern et je récupère les infos  */
				const result = Object.keys(stats).filter((str) => {
					return str.includes(pattern);
				});

				/** boucle qui permet de push les infos des parties */
				for (let i = 0; i < result.length; i++) {
					let message = `> Partie ${result[i].split("_")[1]} 
- Gagnant = ${stats[result[i]].record.win}
- Perdant = ${stats[result[i]].record.loss}
- Null = ${stats[result[i]].record.draw} \r\n`;
					/** Je push chaque message dans mon array finalResult */
					finalResult.push(message);
				}

				message.channel.send(
					`Voici les stats pour le joueur **${
						acct.username
					}** (joueur ${acct.status}) \r\n${finalResult.join(" ")}`
				);
			})
			.catch((err) => {
				console.log(err);
				message.reply(
					`Désolé, je ne connais pas le joueur **${args[1]}**`
				);
			});
	}
};
