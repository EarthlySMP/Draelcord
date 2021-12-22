package net.draelcraft.draelcord.command;

import net.dv8tion.jda.api.events.interaction.SlashCommandEvent;

public class TestCommand {
  public TestCommand(SlashCommandEvent event) {
    onSlashCommand(event);
  }
  private void onSlashCommand(SlashCommandEvent e) {
    e.reply("https://media.discordapp.net/attachments/785527415970594827/918980785283932250/unknown.png").queue();
  }
}
