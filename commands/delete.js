const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { whiteList } = require('../config.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('delete')
    .setDescription('Delete all custom links in the whiteList')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    // Delete all custom links in the whiteList
    whiteList.splice(2, whiteList.length);

    await interaction.reply('Custom links deleted from the whiteList !');
  },
};
