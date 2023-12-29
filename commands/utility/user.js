const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Provides Information about the user.'),
	async execute(interaction) {
		const embed = new EmbedBuilder()
			.setTitle('InfoUser')
			.setDescription(`This command was run by <@${interaction.user.id}>, who joined on ${interaction.member.joinedAt}, but clearly we know that this user is a fanatic of cats :3`)
			.setTimestamp()
			.setColor('#1F1F22');


		await interaction.reply({ embeds: [embed] });

	},
};