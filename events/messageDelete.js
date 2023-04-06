const { createClient } = require('@supabase/supabase-js');
const { supabaseKey, supabaseUrl } = require('../config.json');
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = {
  name: 'messageDelete',
  async execute(message) {
    // Check if message was deleted by a bot
    if (message.author.bot) return;
    // Check if message was deleted by a user
    if (message.author) {
      // Check if message is a link
      if (message.content.match(/\b(http(s?)):\/\/\S+/gi)) {
        const link = message.content.match(/\b(http(s?)):\/\/\S+/gi)[0];
        // Delete link from Supabase table
        const { data, error } = await supabase
          .from('liens')
          .delete()
          .eq('url', link);
        if (error) {
          console.error(error);
          return message.reply("Une erreur s'est produite");
        }
      }
    }
  },
};
