const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { whiteList } = require('../config.json');

module.exports = {
  data: new SlashCommandBuilder()
    // Set the name and description of the command
    .setName('deletewhitelist')
    .setDescription('Supprimer tous les liens personnalisés de la whiteList'),
  // .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    // Delete all custom links in the whiteList
    whiteList.splice(5, whiteList.length);
    // Reply that the custom links have been deleted
    await interaction.reply(
      `${interaction.user}, les liens personnalisés ont été supprimés de la whiteList !`
      // ephemeral: true,
    );
  },
};
