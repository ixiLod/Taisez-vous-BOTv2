const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASEURL, process.env.SUPABASEKEY);

module.exports = {
  name: 'messageDelete',
  async execute(message) {
    // Check if message was deleted by a bot
    if (message.author.client) return;
    // Check if message was deleted by a user
    if (message.author) {
      // Check if message is a link and store it in a variable
      if (message.content.match(/\b(http(s?)):\/\/\S+/gi)) {
        const linkDeleted = message.content.match(/\b(http(s?)):\/\/\S+/gi)[0];
        // Check if link is in Supabase table
        const { data, error } = await supabase
          .from('links')
          .select()
          .eq('url', linkDeleted);
        if (error) {
          console.error(error);
          return;
        }
        // Delete equivalent link in Supabase table
        if (data.length > 0) {
          const { error } = await supabase
            .from('links')
            .delete()
            .eq('url', linkDeleted);
          if (error) {
            console.error(error);
            return;
          }
          console.log(
            `Link ${linkDeleted} has been deleted from the Supabase table.`
          );
        }
      }
    }
  },
};
