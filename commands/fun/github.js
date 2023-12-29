const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('github')
		.setDescription('Check the source of the bot!'),
	async execute(interaction) {
		const embed = new EmbedBuilder()
			.setTitle('Github')
			.setDescription('Check the source of the bot and contribute by adding your own commands!')
			.addFields(
				{ name: 'Repository Github', value: '[Link](https://github.com/Mihaidev-cloud/pisician-discord-bot)' },
			)
			.setTimestamp()
			.setColor('#1F1F22');


		await interaction.reply({ embeds: [embed] });
	},
};