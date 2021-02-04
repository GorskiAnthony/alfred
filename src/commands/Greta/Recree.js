const Command = require("../command");

module.exports = class Recree extends (
	Command
) {
	static match(message) {
		return message.content.startsWith("!recree");
	}

	static action(message) {
		/** get l'author du message */
		/** init la date */
		let dateStart = new Date();
		let dateEnd;
		const tenMinutes = 1000 * 60 * 10;
		/** Pour le test */
		const fiveSeconds = 1000 * 5;

		/** Vérifie si la personne peut envoyer le message  */

		let isAdmin = message.guild.roles.cache.find((role) =>
			role.name.toLowerCase() === "formateur"
				? true
				: role.name === "Admin"
				? true
				: role.name === "Formateurs"
				? true
				: false
		);
		/** Get le role pour les pings */
		let roleName = message.guild.roles.cache.find((role) =>
			role.name === "Etudiants"
				? "Etudiants"
				: role.name === "Etudiant"
				? "Etudiant"
				: "everyone"
		);

		/** Je gère la date > 60 min */
		if (dateStart.getMinutes() + 10 >= 60) {
			dateEnd = `0${dateStart.getMinutes() + 10 - 60}`;
		} else {
			dateEnd = dateStart.getMinutes() + 10;
		}

		if (isAdmin) {
			console.log("je suis admin");
			/** J'envoi le 1er message */
			message.channel.send(`
        🚀\r\n🚀🚀\r\n🚀🚀🚀\r\nC'est la récré les ami(e)s ! Il est ${dateStart.getHours()}h${
				(dateStart.getMinutes() < 10 ? "0" : "") +
				dateStart.getMinutes()
			}, \r\n On revient à ${dateEnd}\r\n🚀🚀🚀\r\n🚀🚀\r\n🚀`);

			/** Au bout de 10 minutes, je renvoi un message */
			setTimeout(() => {
				message.channel.send(`
        🚀\r\n🚀🚀\r\n🚀🚀🚀\r\n Hey ${roleName}, la récré est fini ! \r\n🚀🚀🚀\r\n🚀🚀\r\n🚀`);
			}, fiveSeconds);
		} else {
			message.reply(
				`Tu n'as pas le droit d'envoyer cette commande :smile:`
			);
		}
	}
};
