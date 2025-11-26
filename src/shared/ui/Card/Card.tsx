import React from 'react';

import { makeStyles } from '@/shared/lib/theme/makeStyles';
import { useStyles } from '@/shared/lib/theme/useStyles';
import { View, LayoutChangeEvent } from 'react-native';

interface CardProps {
  children: React.ReactNode;
  fixedHeight?: number;
  onLayout?: (dimensions: { width: number; height: number }) => void;
  style?: any;
}

export const Card: React.FC<CardProps> = ({
  children,
  fixedHeight,
  onLayout,
  style,
}) => {
  const styles = useStyles(s);
  
  const handleLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    onLayout?.({ width, height });
  };

  return (
    <View
      style={[
        styles.card,
        fixedHeight && { height: fixedHeight },
        style,
      ]}
      onLayout={onLayout ? handleLayout : undefined}
    >
      {children}
    </View>
  );
};

const s = makeStyles((theme) => ({
  card: {
    padding: theme.spacing.md,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.bg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
}));