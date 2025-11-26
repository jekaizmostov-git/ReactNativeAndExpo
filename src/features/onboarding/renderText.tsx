import { HightLightText } from "@/shared/ui/HightLightText";
import { View } from "react-native";
import { AppText } from "@/shared/ui/Text";
import { makeStyles } from "@/shared/lib/theme/makeStyles";
import { useStyles } from "@/shared/lib/theme/useStyles";

type renderTextProps = {
  id: string;
  width: number;
  title: string;
  highlight: string;
  description: string;
}

export function RenderText({
  id, 
  width,
  title, 
  highlight, 
  description, 
} : renderTextProps){
  const styles = useStyles(s);
  return (
    <View style={[styles.container, {width: width}]}>
      <HightLightText 
        title={title} 
        highlight={highlight} 
        size="title"
        weight="bold"  
        style={styles.title}
      />
      <AppText style={styles.description} >{description}</AppText>
    </View>
  )
}

const s = makeStyles((theme) => ({
  container:{
    gap: 10,
    //backgroundColor: 'green',
  },
  title:{
    textAlign: 'center',
    lineHeight: theme.typography.title * 1.3,
  },
  description:{
    textAlign: 'center',
    lineHeight: theme.typography.body * 1.2,
  }
}))