# Taisez-vous-BOTv2 

<img width="128px" src="https://user-images.githubusercontent.com/51421090/235319413-bd5b5c47-e5f8-452b-951c-95a4fb48a74e.png">


Taisez-vous is a Discord bot that removes duplicate links on a server. When a user posts a new link, the bot checks if the link has already been posted, and if so, it is removed.

<h2>How to Use</h2>

To use Taisez-vous, add the following environment variables to your `.env` file :
<ul>
<li>TOKEN: Your Discord bot's token</li>
<li>CLIENTID: Your Discord bot's client ID</li>
<li>GUILDID: The ID of your Discord server</li>
<li>SUPABASEURL: The URL of your Supabase project</li>
<li>SUPABASEKEY: The API key of your Supabase project</li>
<li>SERVER1: The ID of your Discord server<br>
(server1 is the same of guildID, it's new name because this bot use multiple discord servers)</li>
<li>SERVER2...</li>
</ul> 

or you can use `config.json` if you want<br>
<br>

To start the bot, run the command `npm start index.js` <br> 
To deploy the slash commands, use the command `node deploy-commands.js`  

Also supports docker, you need to run this command and replace all tokens and IDs with your own :  

`docker run -e TOKEN=<DISCORD_TOKEN> -e SUPABASEURL=<SUPABASE_URL> -e SUPABASEKEY=<SUPABASE_TOKEN> -e SERVER1=<YOUR_SERVER1_ID>  -e SERVER2=<YOUR_SERVER2_ID> <YOUR_DOCKER_IMAGE>` 


<h2>Slash Commands</h2>

this bot uses slash commands here are the commands currently available :
<ul>
<li><b>/user</b> => <i>user account informations</i></li>
<li><b>/server</b> => <i>actual discord server informations</i></li>
<li><b>/introduction</b> => <i>introduction video</i></li>
<li><b>/whitelist</b> => <i>add link to the whitelist</i></li>
<li><b>/deletewhitelist</b> => <i>delete custom links to the whitelist</i></li>
<li><b>/excludechannel</b> => <i>add excludes channel</i></li>
<li><b>/deleteexclude</b> => <i>delete custom excludes channel</i></li>
<li><b>/donate</b> => <i>for support the bot author</i></li>
<li><b>/contact</b> => <i>for contact the bot author</i></li>
</ul>
<h2>Dependencies</h2>

Taisez-vous uses the following dependencies :  

[discord.js](https://discord.js.org/#/) : A library for interacting with the Discord API<br> 
[supabase.js](https://supabase.com/) : A library for interacting with the Supabase API<br> 

Be sure to install these dependencies before using the bot.
