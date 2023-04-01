const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('contact')
    .setDescription('to contact the author of the bot'),
  async execute(interaction) {
    await interaction.reply(
      'You can contact the author of the bot on this discord account : ixiLod#7879'
    );
  },
};
