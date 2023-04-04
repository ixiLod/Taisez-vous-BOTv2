const { Collection } = require('discord.js');
const { whiteList } = require('../config.json');

const links = new Collection();

module.exports = {
  name: 'messageCreate',
  execute(message) {
    // Check if message is a link
    if (message.content.match(/\b(http(s?)):\/\/\S+/gi)) {
      const link = message.content.match(/\b(http(s?)):\/\/\S+/gi)[0];
      // Return if message includes a whitelisted link
      if (whiteList.some((item) => link.includes(item))) return;
      // Check if link is in collection and delete message if it is
      if (links.has(link)) {
        message.delete();
        message.channel.send(`${message.author} ce lien a déjà était posté !`);
        console.log(links);
      } else {
        // Add link to collection
        links.set(link, message.author.id);
      }
    }
  },
};
