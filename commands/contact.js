const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    // Set the name and description of the command
    .setName('contact')
    .setDescription('to contact the author of the bot'),
  async execute(interaction) {
    await interaction.reply(
      // Reply the name of the author of the bot
      'You can contact the author of the bot on this discord account : ixiLod#7879'
    );
  },
};
