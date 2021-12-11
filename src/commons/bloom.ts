const fetch = require('node-fetch');

export class bloomapi {
    async getSpecificServer(identifier:string) {
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
      
    async getSpecificServerResource(identifier: any) {
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
    
      async getAllServers() {
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
}