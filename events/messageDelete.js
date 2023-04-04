const { createClient } = require('@supabase/supabase-js');
const { supabaseKey, supabaseUrl } = require('../config.json');
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = {
  name: 'messageDelete',
  async execute(message) {
    // Return if message was deleted by a bot
    if (message.author.client) return;
    // Check if message is a link
    if (message.content.match(/\b(http(s?)):\/\/\S+/gi)) {
      const link = message.content.match(/\b(http(s?)):\/\/\S+/gi)[0];
      // Delete link from Supabase database
      const { data, error } = await supabase
        .from('liens')
        .delete()
        .match({ url: link });
      if (error) {
        console.error(error);
      } else {
        console.log(data);
      }
    }
  },
};
