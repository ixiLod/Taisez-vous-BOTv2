const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { whiteList } = require('../config.json');

module.exports = {
  data: new SlashCommandBuilder()
    // Set the name and description of the command
    .setName('whitelist')
    .setDescription('Add new Link in the whiteList')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption((option) =>
      option
        .setName('link')
        .setDescription('Link to add in the whiteList')
        .setRequired(true)
    ),

  async execute(interaction) {
    // Add new Link in the whiteList
    whiteList.push(interaction.options.getString('link'));
    await interaction.reply('Link added to the whiteList !');
  },
};
