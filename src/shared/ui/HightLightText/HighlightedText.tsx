import React from "react";
import { Text } from "react-native";
import { AppText } from "@/shared/ui/Text";
import { useTheme } from "@/shared/lib/theme/useTheme";
import { AppTextProps } from "../Text/AppText";
import { highlightText } from "./highlightText ";

type Props = AppTextProps & {
  title: string;
  highlight: string;
  style?: any;
};

export function HightLightText({
  title,
  highlight,
  size,
  weight,
  style
}:Props) {
  const { theme } = useTheme();

  const parts = highlightText(title, highlight);

  return (
    <AppText size={size} weight={weight}>
      {parts.map((part, index) => (
        <Text
          key={index}
          style={[part.highlight ? { color: theme.colors.highlight } : { color: theme.colors.text }, style]}
        >
          {part.text}
        </Text>
      ))}
    </AppText>
  )
}
