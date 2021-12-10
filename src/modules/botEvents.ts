import {client} from "../index";
import {TextChannel} from "discord.js";


client.once("ready", () => {
    if (client.user) {
client.user.setActivity({
    type: "COMPETING",
    name: `-help | ${client.users.cache.size} users`,
});
}});