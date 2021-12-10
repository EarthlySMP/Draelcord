import { SlashCommand } from "onion-lasers";
import { probe } from "@network-utils/tcp-ping";
const EMBED_COLOR = 0x62499c;
export default new SlashCommand({
  description: "Shows current status of Minecraft Server",
  run: async (interaction: any) => {
    const user = interaction.user;
    
    const hostReachable = await probe(25565, "play.draelcraft.net", 500);


    if (hostReachable) var status = "Online :green_circle:";
    else var status = "Offline :red_circle:";
    const websiteReachable = await probe(443, "draelcraft.net", 500);
    if (websiteReachable) var website = "Online :green_circle:";
    else var website = "Offline :red_circle:";
    //ignoring the shit code ^^^^
    const embed = {
        color: EMBED_COLOR,
        author: {
          name: user.username,
          icon_url: user.displayAvatarURL({
            format: "png",
            dynamic: true,
          }),
        },
        fields: [
          {
            name: "Minecraft Server:",
            value: status,
          },
          {
            name: "Website:",
            value: website,
          },
        ],
    }; //deprecated way of doing embeds but it works so whatever
    interaction.reply({embeds: [embed]});
  }}
);