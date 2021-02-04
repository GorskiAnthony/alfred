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

		/** Vérifie si la personne ayant l'uns des rôles si dessous puisse envoyer le message  */
		let isAdmin = message.guild.roles.cache.find((role) =>
			["Formateur", "Formateurs", "Admin"].includes(role.name)
		);

		/** Get le role pour les pings */
		let roleStudent = message.guild.roles.cache.find((role) =>
			["Etudiant", "Etudiants", "everyone"].includes(role.name)
		);

		/** Je gère la date > 60 min */
		if (dateStart.getMinutes() + 10 >= 60) {
			dateEnd = `0${dateStart.getMinutes() + 10 - 60}`;
		} else {
			dateEnd = dateStart.getMinutes() + 10;
		}

		/** Si admin différent de undefined */
		if (isAdmin !== undefined) {
			/** J'envoi le 1er message */
			message.channel.send(`
        🚀\r\n🚀🚀\r\n🚀🚀🚀\r\nC'est la récré les ami(e)s ! Il est ${dateStart.getHours()}h${
				(dateStart.getMinutes() < 10 ? "0" : "") +
				dateStart.getMinutes()
			}, \r\n On revient à ${dateEnd}\r\n🚀🚀🚀\r\n🚀🚀\r\n🚀`);

			/** Au bout de 10 minutes, je renvoi le message de retour */
			setTimeout(() => {
				message.channel.send(`
        🚀\r\n🚀🚀\r\n🚀🚀🚀\r\n Hey ${roleStudent}, la récré est fini ! \r\n🚀🚀🚀\r\n🚀🚀\r\n🚀`);
			}, fiveSeconds);
		} else {
			message.reply(
				`Hey, tu n'as pas le droit d'envoyer cette commande :smile:`
			);
		}
	}
};
