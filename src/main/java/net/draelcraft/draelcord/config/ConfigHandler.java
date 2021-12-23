package net.draelcraft.draelcord.config;

import net.dv8tion.jda.api.interactions.commands.OptionType;
import net.dv8tion.jda.api.interactions.commands.build.OptionData;
import org.jetbrains.annotations.Nullable;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class ConfigHandler {
  public final static List<String> guildIds = Arrays.asList(
    "745668581085413557","821448518949929030");
  public static List<Command> commands = new ArrayList<>();
  public static void initCommands() {
    commands.add(
            new Command(
                    "status",
                    "Check the status of the Draelcraft Network",
                    new OptionData(OptionType.STRING,"server",
                            "View Information for a specific server.")
            )
    );
  }
  public static class Command {
    private String name;
    private String description;
    @Nullable
    private OptionData optionData;

    public Command(String name, String description, @Nullable OptionData optionData) {
      this.name = name;
      this.description = description;
      this.optionData = optionData;
    }

    public String getName() {return this.name;}
    public String getDescription() {return this.description;}
    public @Nullable OptionData getOptionData() {return this.optionData;}

  }
}
