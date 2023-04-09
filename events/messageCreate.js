const { createClient } = require('@supabase/supabase-js');
const { whiteList, excludedChannels } = require('../config.json');
const supabase = createClient(process.env.SUPABASEURL, process.env.SUPABASEKEY);

module.exports = {
  name: 'messageCreate',
  async execute(message) {
    // Check if message is a link and store it in a variable
    const linkMatch = message.content.match(/\b(http(s?)):\/\/\S+/gi);
    if (linkMatch) {
      const link = linkMatch[0];
      // Switch serverName and tableName depending on server
      let serverName;
      let tableName;
      switch (message.guild.id) {
        case process.env.SERVER1:
          serverName = 'Server 1';
          tableName = 'liens';
          break;
        case process.env.SERVER2:
          serverName = 'Server 2';
          tableName = 'liens2';
          break;
        default:
          message.channel.send(
            "Le bot n'est pas censé fonctionner sur ce serveur ! Si vous voulez débloquer toutes les fonctionnalités du bot, contactez ixiLod#7879"
          );
          return;
      }
      // Return if message channel is excluded
      if (excludedChannels.includes(message.channel.id)) return;
      // Return if message includes a whitelisted link
      if (whiteList.some((item) => link.includes(item))) return;
      // Check if link is already in Supabase table
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .eq('url', link);
      if (error) {
        console.error(error);
        return;
      }
      // Check If link is already in Supabase table
      if (data.length > 0) {
        const user = data[0].user;
        const date = new Date(data[0].created_at);
        const dateGlobal = date.toLocaleDateString('fr-FR', {
          day: 'numeric',
          month: 'numeric',
          year: 'numeric',
        });
        const dateHour = date.toLocaleTimeString('fr-FR', {
          hour: 'numeric',
          minute: 'numeric',
        });
        const positionLink = data[0].link_position;

        // Delete message and send error message to channel
        message.delete();
        const sentMessage = await message.channel.send(
          `${message.author} ce lien a déjà été posté par ${user} le ${dateGlobal} à ${dateHour} ! \nTu peux retrouver le lien original ici => ${positionLink}`
        );
      } else {
        // Insert link into Supabase table
        const { data, error } = await supabase.from(tableName).insert([
          {
            url: link,
            user: message.author.username,
            created_at: message.createdAt,
            link_position: message.url,
          },
        ]);
        if (error) {
          console.error(error);
        }
      }
    }
  },
};
