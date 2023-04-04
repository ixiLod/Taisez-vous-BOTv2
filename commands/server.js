const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    // Set the name and description of the command
    .setName('server')
    .setDescription('Informations sur le serveur'),
  async execute(interaction) {
    // Reply with the server name and member count
    await interaction.reply(
      `Le serveur ${interaction.guild.name} contient ${interaction.guild.memberCount} membres.`
    );
  },
};
