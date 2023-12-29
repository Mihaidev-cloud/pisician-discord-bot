const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('animeinfo')
		.setDescription('Get information about a specific anime.')
		.addStringOption(option =>
			option.setName('anime')
				.setDescription('The name of the anime')
				.setRequired(true)),
	async execute(interaction) {
		try {
			const animeName = interaction.options.getString('anime');
			const response = await axios.get(`https://kitsu.io/api/edge/anime?filter[text]=${encodeURIComponent(animeName)}`);

			// eslint-disable-next-line no-inline-comments
			console.log(response.data);

			const animeList = response.data.data;

			if (!animeList || animeList.length === 0) {
				return interaction.reply({ content: 'Anime not found.', ephemeral: true });
			}

			const anime = animeList[0].attributes;

			const embed = new EmbedBuilder()
				.setTitle(anime.canonicalTitle)
				.setDescription(anime.synopsis)
				.setThumbnail(anime.posterImage.original)
				.addFields(
					{ name: 'Type', value: anime.showType, inline: true },
					{ name: 'Episodes', value: anime.episodeCount.toString(), inline: true },
					{ name: 'Average Rating', value: anime.averageRating.toString(), inline: true },
					{ name: 'Kitsu Link', value: `[Link](https://kitsu.io/anime/${anime.slug})` },
				)
				.setTimestamp()
				.setColor('#1F1F22');

			await interaction.reply({ embeds: [embed] });
		}
		catch (error) {
			console.error(error);
			await interaction.reply({ content: 'An error occurred while fetching anime information.', ephemeral: true });
		}
	},
};
