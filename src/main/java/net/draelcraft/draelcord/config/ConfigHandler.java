package net.draelcraft.draelcord.config;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

public class ConfigHandler {
  public final static List<String> guildIds = Arrays.asList(
    "745668581085413557","821448518949929030");
  public final static Map<String,String> commands = Map.of(
    "test","Test Command",
    "status", "View the status of Draelcraft in real time."
  );
}
