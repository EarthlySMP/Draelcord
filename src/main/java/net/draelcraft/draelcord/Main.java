package net.draelcraft.draelcord;

import net.dv8tion.jda.api.JDA;
import net.dv8tion.jda.api.JDABuilder;
import net.dv8tion.jda.api.entities.Activity;
import net.dv8tion.jda.api.entities.Guild;
import net.dv8tion.jda.api.events.interaction.SlashCommandEvent;
import net.dv8tion.jda.api.hooks.ListenerAdapter;
import net.dv8tion.jda.api.requests.GatewayIntent;

import javax.security.auth.login.LoginException;

public final class Main extends ListenerAdapter {
    public static void main(String[] args) throws InterruptedException {
        System.out.println("A");
        JDA jda = null;
        try {
            jda = JDABuilder.createLight(args[0], GatewayIntent.GUILD_MESSAGES, GatewayIntent.DIRECT_MESSAGES)
                    .addEventListeners(new Main())
                    .setActivity(Activity.playing("Type !ping"))
                    .build();
        } catch (LoginException e) {
            e.printStackTrace();
        }
        assert jda != null;
        jda.awaitReady();
        Guild guild = jda.getGuildById("821448518949929030");
        assert guild != null;
        guild.upsertCommand("ping","test").queue();
    }

    @Override
    public void onSlashCommand(SlashCommandEvent event) {
        if (!event.getName().equals("ping")) return; // make sure we handle the right command
        long time = System.currentTimeMillis();
        event.reply("Pong!").setEphemeral(true) // reply or acknowledge
                .flatMap(v ->
                        event.getHook().editOriginalFormat("Pong: %d ms", System.currentTimeMillis() - time) // then edit original
                ).queue(); // Queue both reply and edit
    }
}
