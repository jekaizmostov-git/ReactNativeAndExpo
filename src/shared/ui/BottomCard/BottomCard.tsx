import React from 'react';

import { makeStyles } from '@/shared/lib/theme/makeStyles';
import { useStyles } from '@/shared/lib/theme/useStyles';

import { View } from 'react-native';

interface CardProps {
  children: React.ReactNode;
  style?: any;
}

export const BottomCard: React.FC<CardProps> = ({
  children, style}: CardProps) => {
    const styles = useStyles(s);
    return (
      <View style={[styles.card, style]}>
        {children}
      </View>
    )
}

const s = makeStyles((theme) => ({
  card: {
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
    paddingHorizontal: theme.spacing.lg,
    borderTopRightRadius: theme.radius.lg,
    borderTopLeftRadius: theme.radius.lg,
    gap: theme.spacing.md,
    backgroundColor: theme.name === 'dark'?'#1E293B' : '#FFFFFF',
    shadowColor: theme.name === 'dark' ? '#000' : '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: theme.name === 'dark' ? 0.25 : 0.1,
    shadowRadius: theme.name === 'dark' ? 10 : 4,
    elevation: theme.name === 'dark' ? 5 : 3,
    borderWidth: theme.name === 'dark' ? 1 : 0,
  }
}))