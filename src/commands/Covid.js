const Command = require("./command");
const axios = require("axios");

module.exports = class Covid extends (
	Command
) {
	static match(message) {
		return message.content.startsWith("!covid");
	}

	static action(message) {
		function numberFR(number) {
			return number.toLocaleString("fr-FR");
		}
		const API_COVID = "https://disease.sh/v3/covid-19/countries";

		const args = message.content.split(" ");
		args.shift().toLowerCase();

		axios
			.get(`${API_COVID}/${args}`)
			.then(function (response) {
				const data = response.data;
				// handle success
				message.channel.send(
					`les stats concernant le coronavirus en **${args}** : \r\n Nombres de cas : ${numberFR(
						data.cases
					)} \r\n Nombres de morts : ${numberFR(
						data.deaths
					)} \r\n Nombres de guérisons : ${numberFR(data.recovered)}`
				);
			})
			.catch(function (error) {
				// handle error
				console.log(error);
				message.reply(
					`Désolé, je ne connais pas le pays. Essai de l'écrire autrement`
				);
			});
	}
};
