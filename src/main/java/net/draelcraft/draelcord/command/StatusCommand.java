package net.draelcraft.draelcord.command;

import net.dv8tion.jda.api.events.interaction.SlashCommandEvent;

public class StatusCommand {
    public StatusCommand(SlashCommandEvent event) {
        onSlashEvent(event);
    }
    private void onSlashEvent(SlashCommandEvent e) {
        e.reply("Pretend this is a status embed i cba to do it right now").queue();
    }
}
