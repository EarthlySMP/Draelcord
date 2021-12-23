package net.draelcraft.draelcord;

import net.draelcraft.draelcord.command.StatusCommand;
import net.draelcraft.draelcord.command.TestCommand;
import net.draelcraft.draelcord.config.ConfigHandler;
import net.draelcraft.draelcord.util.MapUtils;
import net.dv8tion.jda.api.JDA;
import net.dv8tion.jda.api.JDABuilder;
import net.dv8tion.jda.api.entities.Guild;
import net.dv8tion.jda.api.events.interaction.SlashCommandEvent;
import net.dv8tion.jda.api.hooks.ListenerAdapter;
import net.dv8tion.jda.api.requests.GatewayIntent;

import javax.security.auth.login.LoginException;
import java.util.Objects;

public final class Draelcord extends ListenerAdapter {
    private static String token;
    private static JDA api = null;

    public static void main(String[] args) throws InterruptedException {
        if(args.length == 0) {
          System.out.println("Draelcord is configured to have the first argument as the bot token, If this is missing, Execution cannot continue.");
          System.out.println("Exiting Draelcord...");
          System.exit(13);
        } else {
            token = args[0];
            System.out.println("Welcome to Draelcord");
        }

        try {
            jda = JDABuilder.createLight(args[0], GatewayIntent.GUILD_MESSAGES, GatewayIntent.DIRECT_MESSAGES)
                    .addEventListeners(new Draelcord())
                    .build();
        } catch (LoginException e) {
            e.printStackTrace();
        }
        assert jda != null;
        jda.awaitReady();

        // Command Initialization
        for(String guildId: ConfigHandler.guildIds) {
          // Get the guild
          Guild guild = jda.getGuildById(guildId);
          if(guild != null) {
            // Get the commands
            for(String commandDescription: ConfigHandler.commands.values()) {
                String commandName = MapUtils
                    .getKeyByValue(ConfigHandler.commands,commandDescription);
                // Upsert the commands to all guilds
                guild.upsertCommand(commandName,commandDescription).queue();
                }
            }
        }
    }

    @Override
    public void onSlashCommand(SlashCommandEvent event) {
        // [SlashEvent] Event Name: user Username (User ID), channel Channel Name (Channel ID), server Server Name (Server ID).
        System.out.printf("[SlashEvent] %s: user %s (%s), channel %s (%s), server %s (%s).\n",
                event.getName(),event.getUser().getName(),event.getUser().getId(),
                event.getChannel().getName(),event.getChannel().getId(), Objects.requireNonNull(event.getGuild()).getName(), event.getGuild().getId());
        switch (event.getName()) {
            case "test":
                new TestCommand(event);
            case "status":
                new StatusCommand(event);
        }
    }
    
    public JDA getDiscordAPI() {
        return this.api;
    }
}
