import {Pressable} from 'react-native';
import { makeStyles } from '@/shared/lib/theme/makeStyles';
import { useStyles } from '@/shared/lib/theme/useStyles';
import { AppText } from '../Text';

type Props = {
  title: string;
  onPress: () => void;
};

export function Button({title, onPress}:Props){
  const styles = useStyles(s);
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <AppText style={styles.title}>{title}</AppText>
    </Pressable>
  );
}

const s = makeStyles((theme) => ({
  button: {
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
  },
  title: {
    fontSize: theme.typography.body,
    color: theme.colors.buttonText,
    fontWeight: '600',
  },
}))


