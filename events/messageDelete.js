const { createClient } = require('@supabase/supabase-js');
const { whiteList, excludedChannels } = require('../config.json');
const supabase = createClient(process.env.SUPABASEURL, process.env.SUPABASEKEY);

module.exports = {
  name: 'messageDelete',
  async execute(message) {
    //  ADD MULTISERVER SUPPORT, BUT NOT FONCTIONNAL FOR NOW

    // Ignore delete from bots
    if (message.author.client) return; // FONCTIONNAL WITH (message.author.bot) FOR USER DELETE, BUT BOT STILL DELETE DATABASE LINKS

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
      // Select from database
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .eq('url', link);
      if (error) {
        console.error(error);
        return;
      }
      // Check if link is in Supabase table and delete it
      if (data.length > 0) {
        const { error } = await supabase
          .from(tableName)
          .delete()
          .eq('url', link);
        if (error) {
          console.error(error);
        }
      }
    }
  },
};
