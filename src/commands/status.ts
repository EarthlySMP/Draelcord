import { SlashCommand } from "onion-lasers";
import "../commons/embed";
import { footer } from "../commons/embed";
import { bloomapi } from "../commons/bloom";
import { usercommons } from "../commons/user";

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
      interaction.reply('soon')
    }
    
  }
}
);