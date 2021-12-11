import { SlashCommand } from "onion-lasers";
import "../commons/embed";
import { footer } from "../commons/embed";
const fetch = require('node-fetch');

/**
 * Format bytes as human-readable text.
 * 
 * @param bytes Number of bytes.
 * @param si True to use metric (SI) units, aka powers of 1000. False to use 
 *           binary (IEC), aka powers of 1024.
 * @param dp Number of decimal places to display.
 * 
 * @return Formatted string.
 */
 function humanFileSize(bytes: number, si=false, dp=1) {
    const thresh = si ? 1000 : 1024;

    if (Math.abs(bytes) < thresh) {
      return bytes + ' B';
    }

    const units = si 
      ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'] 
      : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    let u = -1;
    const r = 10**dp;

    do {
      bytes /= thresh;
      ++u;
    } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);


    return bytes.toFixed(dp) + ' ' + units[u];
}

async function getSpecificServer(identifier:string) {
  let response = await fetch("https://mc.bloom.host/api/client/servers/"+identifier,{
        method: "GET",
        headers: {
          "Accept": 'application/json',
          "Content-Type": 'application/json',
          "Authorization": 'Bearer '+process.env.PTERODACTYL_AUTH
        }
      }
    );
  return await response.json()
}

async function getSpecificServerResource(identifier:string) {
  let response = await fetch("https://mc.bloom.host/api/client/servers/"+identifier+"/resources",{
        method: "GET",
        headers: {
          "Accept": 'application/json',
          "Content-Type": 'application/json',
          "Authorization": 'Bearer '+process.env.PTERODACTYL_AUTH
        }
      }
    );
  return await response.json()
}

async function getAllServers() {
  let response = await fetch("https://mc.bloom.host/api/client",{
          method: "GET",
          headers: {
            "Accept": 'application/json',
            "Content-Type": 'application/json',
            "Authorization": 'Bearer '+process.env.PTERODACTYL_AUTH
          }
        }
      );
  
  let available_servers:any = {}
  let data = await response.json()
  
  for(let result of data.data) {
    available_servers[result.attributes.name] = result.attributes.identifier
  }
  
  
  return available_servers;
}

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
    let has_selected_specific_server = interaction.options.getString('server') !== null;
    console.log(has_selected_specific_server);
    

    if(has_selected_specific_server) {
      
      let selected_server = interaction.options.getString('server');
      
      let all_servers = await getAllServers();

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
          const resource_data = await getSpecificServerResource(identifier)
      
          const server_data = await getSpecificServer(identifier)
          
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
                value: humanFileSize(resource_data.attributes.resources.memory_bytes,true,2),
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