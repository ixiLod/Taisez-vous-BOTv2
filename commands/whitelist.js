const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { whiteList } = require('../config.json');

module.exports = {
  data: new SlashCommandBuilder()
    // Set the name and description of the command
    .setName('whitelist')
    .setDescription('Ajouter un lien dans la liste blanche')
    // .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption((option) =>
      option
        .setName('link')
        .setDescription('Le lien à ajouter dans la liste blanche')
        .setRequired(true)
    ),

  async execute(interaction) {
    // Add new Link in the whiteList
    whiteList.push(interaction.options.getString('link'));
    await interaction.reply(
      `${interaction.user}, le lien a été ajouté à la liste blanche !`
      // ephemeral: true,
    );
  },
};
