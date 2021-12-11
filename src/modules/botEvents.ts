import {client} from "../index";

client.once("ready", () => {
    if (client.user) {
client.user.setActivity({
    type: "PLAYING",
    name: `with ${client.users.cache.size} users :flushed:`,
});
}});