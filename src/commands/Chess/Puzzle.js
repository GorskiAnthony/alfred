const Discord = require("discord.js");
const Command = require("../command");
const axios = require("axios");

module.exports = class Puzzle extends (
	Command
) {
	static match(message) {
		return message.content.startsWith("!puzzle");
	}

	static action(message) {
		axios.get("https://api.chess.com/pub/puzzle").then(function (results) {
			const puzzle = results.data;
			// Create the attachment using MessageAttachment
			const attachment = new Discord.MessageAttachment(puzzle.image);
			message.channel.send(
				`Le puzzle du jour : ${puzzle.title}
        Si vous souhaitez le faire c'est par là => (${puzzle.url})`,
				attachment
			);
		});
	}
};
