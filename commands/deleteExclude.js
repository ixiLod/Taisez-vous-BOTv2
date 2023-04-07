const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { excludedChannels } = require('../config.json');

module.exports = {
  data: new SlashCommandBuilder()
    // Set the name and description of the command
    .setName('deleteexclude')
    .setDescription("Supprimer tous les salons ajouté pour s'exclure du bot")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    // Delete all ID in the excludedChannels
    excludedChannels.splice(1, excludedChannels.length);
    // Reply that the ID have been deleted
    await interaction.reply({
      content: `Les salons ne sont plus exclus du bot !`,
      ephemeral: true,
    });
  },
};
