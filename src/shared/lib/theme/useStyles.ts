import { useContext, useMemo } from "react";
import { ThemeContext } from "./ThemeContext";
import { baseTheme } from "@/shared/config/theme";

export function useStyles<T>(
  styleFn: (theme: any) => T
): T {
  const { theme } = useContext(ThemeContext);

  const merged = useMemo(
    () => styleFn({ ...baseTheme, ...theme }),
    [theme, styleFn]
  );

  return merged;
}