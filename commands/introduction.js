const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    // Set the name and description of the command
    .setName('introduction')
    .setDescription('Video de présentation du bot et de son utilisation !'),
  async execute(interaction) {
    await interaction.reply(
      // Reply the name of the author of the bot
      {
        content:
          'Voici la vidéo de présentation : https://odysee.com/@taisezvous:6/taisezvousbot:4',
        ephemeral: true,
      }
    );
  },
};
