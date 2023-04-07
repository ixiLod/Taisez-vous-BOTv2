const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { excludedChannels } = require('../config.json');

module.exports = {
  data: new SlashCommandBuilder()
    // Set the name and description of the command
    .setName('excludechannel')
    .setDescription('Exclure un salon du bot')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption((option) =>
      option
        .setName('id')
        .setDescription("L'ID du salon à exclure du bot")
        .setRequired(true)
    ),

  async execute(interaction) {
    // Add new channel in the excludedChannels
    excludedChannels.push(interaction.options.getString('id'));
    await interaction.reply({
      content: `L'ID du salon a bien été ajouté !`,
      ephemeral: true,
    });
  },
};
