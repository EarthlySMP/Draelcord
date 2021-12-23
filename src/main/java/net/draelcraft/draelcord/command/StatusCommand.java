package net.draelcraft.draelcord.command;

import com.mattmalec.pterodactyl4j.application.entities.PteroApplication;
import net.dv8tion.jda.api.EmbedBuilder;
import net.dv8tion.jda.api.entities.Message;
import net.dv8tion.jda.api.events.interaction.SlashCommandEvent;
import net.draelcraft.draelcord.util.EmbedUtils;
public class StatusCommand {
    public StatusCommand(SlashCommandEvent event, PteroApplication api) {
        onSlashEvent(event, api);
    }
    private void onSlashEvent(SlashCommandEvent e, PteroApplication api) {
        EmbedBuilder eb = new EmbedBuilder();
        eb.setColor(000000)
        .setAuthor("Draelcraft Status")
        .setDescription("View the status of the Draelcraft Network.\nPowered by Draelcord")
        .setFooter(EmbedUtils.footerText,EmbedUtils.footerIcon);
        System.out.println(e.getOption("server").getAsString());
        e.replyEmbeds(eb.build()).queue();
    }
}
