package net.draelcraft.draelcord.command;

import net.dv8tion.jda.api.events.interaction.SlashCommandEvent;
import net.dv8tion.jda.core.EmbedBuilder;
import net.draelcraft.draelcord.Draelcord;
import java.lang.management.ManagementFactory;
import java.lang.*;

public class StatusCommand {
    public StatusCommand(SlashCommandEvent event) {
        onSlashEvent(event);
    }
    private void onSlashEvent(SlashCommandEvent e) {
        // e.reply("Pretend this is a status embed i cba to do it right now").queue();
        EmbedBuilder em = new EmbedBuilder();
        em.setTitle("Draelcraft Bot Status");
        em.setColor(new Color(210, 55, 44));
        em.addField("🌎 API Latency:", String.valueOf(e.getJDA().getGatewayPing()) + "ms", true);
        em.addField("📡 Uptime:", String.valueOf(convertTime(ManagementFactory.getRuntimeMXBean().getUptime())) + "ms", true);
        em.addField("📜 Running:", "v" + String.valueOf(getVersion()), true);
        
        e.getChannel.sendMessageEmbeds(em);
    }
    
    private String convertTime(long time) {     
        String seconds = String.valueOf(Math.floor((time / 1000) % 60));
        String minutes = String.valueOf(Math.floor((time / (1000 * 60) % 60));
        String hours = String.valueOf(Math.floor((time / (1000 * 60 * 60) % 24));
        
        hours = Integer.parseInt(hours) < 10 ? "0" + hours : hours;
        minutes = Integer.parseInt(minutes) < 10 ? "0" + minutes : minutes;
        seconds = Integer.parseInt(seconds) < 10 ? "0" + seconds : seconds;
        return hours + ":" + minutes + " minutes";      
    }
    
    private synchronized String getVersion() {
        String version = null;

        try {
            Properties p = new Properties();
            InputStream is = getClass().getResourceAsStream("/META-INF/maven/net.draelcraft/draelcord/pom.properties");
            if (is != null) {
                p.load(is);
                version = p.getProperty("version", "");
            }
        } catch (Exception e) {
            // ignore output
        }

        // fallback to using Java API
        if (version == null) {
            Package aPackage = getClass().getPackage();
            if (aPackage != null) {
                version = aPackage.getImplementationVersion();
                if (version == null) {
                    version = aPackage.getSpecificationVersion();
                }
            }
        }

        if (version == null) {
            // version could not be computed, return blank string
            version = "";
        }

        return version;
    } 
}
