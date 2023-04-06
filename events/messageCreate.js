const { createClient } = require('@supabase/supabase-js');
const { whiteList, supabaseKey, supabaseUrl } = require('../config.json');
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = {
  name: 'messageCreate',
  async execute(message) {
    // Check if message is a link ans store it in a variable
    const linkMatch = message.content.match(/\b(http(s?)):\/\/\S+/gi);
    if (linkMatch) {
      const link = linkMatch[0];
      // Return if message includes a whitelisted link
      if (whiteList.some((item) => link.includes(item))) return;
      // Check if link is already in Supabase table
      const { data, error } = await supabase
        .from('liens')
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
        // Delete sent message after 3 minutes
        setTimeout(() => {
          sentMessage.delete();
        }, 180000);
      } else {
        // Insert link into Supabase table
        const { data, error } = await supabase.from('liens').insert([
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
