const { createClient } = require('@supabase/supabase-js');
const { whiteList, supabaseKey, supabaseUrl } = require('../config.json');
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = {
  name: 'messageCreate',
  async execute(message) {
    // Check if message is a link
    if (message.content.match(/\b(http(s?)):\/\/\S+/gi)) {
      const link = message.content.match(/\b(http(s?)):\/\/\S+/gi)[0];
      // Return if message includes a whitelisted link
      if (whiteList.some((item) => link.includes(item))) return;
      // Check if link is already in Supabase table
      const { data, error } = await supabase
        .from('liens')
        .select('*')
        .eq('url', link);
      if (error) {
        console.error(error);
        return message.reply("Une erreur s'est produite");
      }
      // If link is already in Supabase table, delete message and send error message to channel
      if (data.length > 0) {
        const user = data[0].user;
        const date = new Date(data[0].created_at).toLocaleDateString('fr-FR', {
          day: 'numeric',
          month: 'numeric',
          year: 'numeric',
        });
        message.delete();
        message.channel.send(
          `${message.author} ce lien a déjà été posté par ${user} le ${date} !`
        );
      } else {
        // Insert link into Supabase table
        const { data: insertedData, insertError } = await supabase
          .from('liens')
          .insert([
            {
              url: link,
              user: message.author.username,
              created_at: new Date(),
            },
          ]);
        if (insertError) {
          console.error(insertError);
          return message.reply("Une erreur s'est produite");
        }
      }
    }
  },
};
