const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('getacat')
		.setDescription('Get a random cat image.'),
	async execute(interaction) {
		try {
			const response = await axios.get('https://api.thecatapi.com/v1/images/search');
			const catImageUrl = response.data[0].url;

			await interaction.reply({ content: 'Here is a random cat:', files: [catImageUrl] });
		}
		catch (error) {
			console.error(error);
			await interaction.reply({ content: 'An error occurred while fetching the cat image.', ephemeral: true });
		}
	},
};