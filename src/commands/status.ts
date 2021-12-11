import { SlashCommand } from "onion-lasers";
import { footer } from "../commons/embed";
import { bloomapi } from "../commons/bloom";
import { usercommons } from "../commons/user";
import { MessageEmbed } from "discord.js";
const axios = require("axios");
const fetch = require("node-fetch");

const editInteraction = async (client:any, interaction:any, response:any) => {
  // Set the data as embed if reponse is an embed object else as content
  const data = typeof response === 'object' ? { embeds: [ response ] } : { content: response };
  // Get the channel object by channel id:
  const channel = await client.channels.resolve(interaction.channel_id);
  // Edit the original interaction response:
  return axios
      .patch(`https://discord.com/api/v8/webhooks/${interaction.message.webhookId}/${interaction.token}/messages/@original`, data)
      .then((answer: { data: { id: any; }; }) => {
          // Return the message object:
          return channel.messages.fetch(answer.data.id)
      })
};

export default new SlashCommand({
  description: "Shows current status of Draelcraft",
  options: [
    {
      name: "server",
      description: "Use the server argument if you want to see specific information about a single server.",
      type: "STRING",
      required: false,
    }
  ],
  run: async (interaction: any) => {
    let api = new bloomapi
    let ucommons = new usercommons;

    let has_selected_specific_server = interaction.options.getString('server') !== null;

    if(has_selected_specific_server) {
      
      let selected_server = interaction.options.getString('server');
      
      let all_servers = await api.getAllServers();

      let response_success = false;

      let all_servers_string = "";
      for(let server in all_servers) {
        if(all_servers_string == "") {
          all_servers_string += server;
        } else {
          all_servers_string += ", "+server;
        }
        if(selected_server === server) {
          response_success = true;
        
          let identifier = all_servers[selected_server]
          const resource_data = await api.getSpecificServerResource(identifier)
      
          const server_data = await api.getSpecificServer(identifier)
          
          let color;
          if(resource_data.attributes.current_state === "running") {
            color = 0x00FF00;
          } else {
            color = 0xFF0000;
          }
          
          const embed = {
            color: color,
            author: {
              name: `Status for \"${server_data.attributes.name}\"`,
            },
            fields: [
              {
                name: "RAM",
                value: ucommons.humanFileSize(resource_data.attributes.resources.memory_bytes,true,2),
              },
              {
                name: "CPU",
                value: resource_data.attributes.resources.cpu_absolute + "%"
              }
            ],
            footer: footer,
          };
          interaction.reply({embeds: [embed]});
          break;
        }
      }

      if(!response_success) interaction.reply(`You did not select a valid server, Available servers: \`${all_servers_string}\``)
    } else {
      interaction.reply("Fetching data...")
      
      let all_servers = await api.getAllServers();
      let status:any = {}
      for(let server in all_servers) { 
        let resource_data = await api.getSpecificServerResource(all_servers[server])
        if(resource_data.attributes.current_state === "running") status[server] = "online"
        if(resource_data.attributes.current_state !== "running") status[server] = "offline"
      }
      
      const embed = new MessageEmbed()
        .setColor('#000000')
        .setAuthor('Draelcraft Status')
        .setDescription('View the status of the Draelcraft Network.\nPowered by Draelcord')
        .setFooter(footer.text, footer.icon_url);
      
      let all_servers_online = true;
      let no_servers_online = false;
      let inline_amount = 0

      let status_amount = 0
      let offline_amount = 0
      for(let s in status) {
        status_amount += 1;
        let value;
        if(status[s] === "online") {
          value = "🟢";
        } else {
          offline_amount += 1
          value = "🔴";
          all_servers_online = false;
        }
        inline_amount += 1;
        if(inline_amount <= 1) {  
          embed.addField(s,value,true);
        } else {
          inline_amount = 0;
          embed.addField(s,value,false);        
        }
      }
      if(offline_amount === status_amount) no_servers_online = true;
      embed.setTitle("All services operational.");
      if(!all_servers_online) embed.setTitle("Services partly operational.");
      if(no_servers_online) embed.setTitle("Services fully not operational.")
      
      interaction.client.channels.cache.get(`898293870469709834`).send({embeds: [embed]});
    }
    
  }
}
);