const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { whiteList } = require('../config.json');

module.exports = {
  data: new SlashCommandBuilder()
    // Set the name and description of the command
    .setName('whitelist')
    .setDescription('Ajouter un lien dans la whiteList')
    // .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption((option) =>
      option
        .setName('link')
        .setDescription('Le lien à ajouter dans la whiteList')
        .setRequired(true)
    ),

  async execute(interaction) {
    // Add new Link in the whiteList
    whiteList.push(interaction.options.getString('link'));
    await interaction.reply({
      content: 'Le lien a été ajouté à la whiteList !',
      // ephemeral: true,
    });
  },
};
