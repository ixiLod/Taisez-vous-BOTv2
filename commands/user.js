const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    // Set the name and description of the command
    .setName('user')
    .setDescription("Informations sur l'utilisateur"),
  async execute(interaction) {
    // Reply the name of the user who run the command and the date of his join
    await interaction.reply({
      content: `Cette commande est exécutée par ${interaction.user.username}, qui a rejoint le serveur le ${interaction.member.joinedAt}.`,
      ephemeral: true,
    });
  },
};
