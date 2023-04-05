const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { whiteList } = require('../config.json');

module.exports = {
  data: new SlashCommandBuilder()
    // Set the name and description of the command
    .setName('delete')
    .setDescription('Supprimer tous les liens personnalisés de la whiteList')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    // Delete all custom links in the whiteList
    whiteList.splice(4, whiteList.length);

    await interaction.reply('Les liens personnalisés ont été supprimés !', {
      ephemeral: true,
    });
  },
};
