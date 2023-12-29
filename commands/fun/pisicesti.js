const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pisicesti')
		.setDescription('The history of pisicesti'),
	async execute(interaction) {
		const embed = new EmbedBuilder()
			.setTitle('Pisicesti')
			.setDescription('Pisicesti is a place from romania, where the studies showed that every cat that has been born, has been borned in pisicesti, which also the village where population itself is format from cats, even the president is a cat!')
			.setImage('https://cdn.discordapp.com/attachments/1056594596471263232/1190386503361253427/image.png?ex=65a19cd2&is=658f27d2&hm=9f26f1a8a94540d219a92edd3e6e43356bf7877ba86cab6e869e622372a9c88e&')
			.setTimestamp()
			.setColor('#1F1F22');


		await interaction.reply({ embeds: [embed] });
	},
};