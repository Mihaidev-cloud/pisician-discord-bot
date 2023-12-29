const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('catfunfact')
		.setDescription('Random fun fact about cats'),
	async execute(interaction) {
		try {
			// Make a request to the cat API
			const response = await axios.get('https://catfact.ninja/fact');
			const catsData = response.data;

			// Extract information from the JSON response
			const catsFact = catsData.fact;


			const embed = new EmbedBuilder()
				.setTitle('Random fun fact about cats!')
				.setDescription(`${catsFact}`)
				.setTimestamp()
				.setColor('#1F1F22');


			await interaction.reply({ embeds: [embed] });

		}
		catch (error) {
			console.error(error);
			await interaction.reply('An error occurred while fetching a random cats name.');
		}
	},
};