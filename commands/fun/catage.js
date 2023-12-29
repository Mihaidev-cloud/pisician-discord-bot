const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('catage')
		.setDescription('Calculate a cat\'s age in cat years based on its age in human years')
		.addIntegerOption(option =>
			option.setName('human_age')
				.setDescription('The cat\'s age in human years')
				.setRequired(true)),
	execute(interaction) {
		// Get the cat's age in human years from the user's input
		const humanAge = interaction.options.getInteger('human_age');

		// Calculate the cat's age in cat years (an approximation)
		const catAge = humanAge * 7;


		const embed = new EmbedBuilder()
			.setTitle('Cat Age Calculator')
			.addFields(
				{ name: 'Human Age', value: `${humanAge} years`, inline: true },
				{ name: 'Cat Age', value: `${catAge} years`, inline: true },
			)
			.setColor('#1F1F22');

		// Respond to the interaction with the embed
		interaction.reply({ embeds: [embed] });
	},
};