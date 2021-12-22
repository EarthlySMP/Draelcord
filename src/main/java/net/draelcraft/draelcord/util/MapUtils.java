package net.draelcraft.draelcord.util;

import org.jetbrains.annotations.Nullable;

import java.util.Map;
import java.util.Objects;

public class MapUtils {
  public static <T, E> @Nullable T getKeyByValue(Map<T, E> map, E value) {
    for (Map.Entry<T, E> entry : map.entrySet()) {
      if (Objects.equals(value, entry.getValue())) {
        return entry.getKey();
      }
    }
    return null;
  }
}
