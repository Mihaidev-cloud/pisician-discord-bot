const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Check the bot\'s ping and API latency'),
	async execute(interaction) {
		try {
			// Get the current timestamp for calculating the bot's latency
			const startTime = Date.now();

			// Check if the interaction has already been replied to or deferred
			if (interaction.deferred || interaction.replied) {
				return;
			}

			// Respond to the interaction with a temporary "Pinging..." message
			const pingMessage = await interaction.reply({ content: 'Pinging...', ephemeral: true });

			// Calculate the bot's latency (ping)
			const botLatency = Date.now() - startTime;

			// Calculate the API latency
			const apiLatency = interaction.client.ws.ping;

			// Create an EmbedBuilder with the final ping information
			const pingEmbed = new EmbedBuilder()
				.setTitle('Ping Pong!')
				.addFields(
					{ name: 'Bot Latency', value: `${botLatency} ms`, inline: true },
					{ name: 'API Latency', value: `${apiLatency} ms`, inline: true },
				)
				.setColor('#1F1F22')
				.setTimestamp()
				.setFooter({ text: 'Requested by ' + interaction.user.tag, iconURL: interaction.user.displayAvatarURL() });

			// Edit the original message with the final ping information in an embed
			await pingMessage.edit({ content: null, embeds: [pingEmbed] });
		}
		catch (error) {
			console.error('Error processing ping command:', error);
			await interaction.reply('An error occurred while processing the ping command.');
		}
	},
};
