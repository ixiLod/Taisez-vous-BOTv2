const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    // Set the name and description of the command
    .setName('user')
    .setDescription('Provides information about the user.'),
  async execute(interaction) {
    // Reply the name of the user who run the command and the date of his join
    await interaction.reply(
      `This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`
    );
  },
};
