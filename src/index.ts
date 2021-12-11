import * as dotenv from 'dotenv';
import {launch} from "onion-lasers";
import {Client, Intents} from "discord.js"; 
import path from "path";


console.log("Starting...");

//initiliaze dotenv
dotenv.config();

export const client = new Client({
  intents: [
      
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MEMBERS,
      Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
      Intents.FLAGS.GUILD_VOICE_STATES,
      Intents.FLAGS.GUILD_PRESENCES,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
      Intents.FLAGS.DIRECT_MESSAGES
  ]
});

client.login(process.env.TOKEN);

launch(client, path.join(__dirname, "commands"), {
  getPrefix: () => "-",
  slashCommandDevServers: ["821448518949929030"],
});
//peeing and feeling cute ;-;

console.log(`Welcome to Draelcord ${process.env.npm_package_version}`);
// Initialize Modules
import "./modules/botEvents"
import "./modules/presenceHack"
console.log("All modules have been initialized.")