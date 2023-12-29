const { Events, Collection } = require('discord.js');


// Map to store command cooldowns
const cooldowns = new Collection();

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		console.log('Interaction received');

		if (interaction.isCommand()) {
			console.log('Handling command interaction');
			await handleCommandInteraction(interaction);
		}
	},
};

async function handleCommandInteraction(interaction) {
	const command = interaction.client.commands.get(interaction.commandName);

	if (command) {
		await handleCommandCooldowns(interaction, command);

		try {
			console.log('Executing command');
			await command.execute(interaction);
		}
		catch (error) {
			console.error(error);
			const errorMessage = 'There was an error while executing this command!';
			return sendResponse(interaction, errorMessage);
		}
	}
}

async function handleCommandCooldowns(interaction, command) {
	if (command.cooldown) {
		const key = interaction.guild ? `${interaction.guild.id}-${interaction.user.id}` : interaction.user.id;

		if (cooldowns.has(key)) {
			const expirationTime = cooldowns.get(key);
			if (Date.now() < expirationTime) {
				const remainingTime = (expirationTime - Date.now()) / 1000;
				const cooldownMessage = `Please wait ${remainingTime.toFixed(1)} more seconds before using this command again.`;
				return sendResponse(interaction, cooldownMessage, true);
			}
		}

		const cooldownTime = command.cooldown * 1000;
		cooldowns.set(key, Date.now() + cooldownTime);
		setTimeout(() => cooldowns.delete(key), cooldownTime);
	}
}

function sendResponse(interaction, content, ephemeral = false) {
	if (interaction.deferred) {
		return interaction.followUp({ content, ephemeral });
	}
	else {
		return interaction.reply({ content, ephemeral });
	}
}
