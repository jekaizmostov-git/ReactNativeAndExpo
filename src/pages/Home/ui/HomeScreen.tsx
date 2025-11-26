
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/app/navigation/RootNavigator';

import { OnBoarding } from "@/features/onboarding/OnBoarding";



type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;


export const HomeScreen = ({ navigation }: Props) => {
  return (
      <OnBoarding finishHandler={() => navigation.navigate("Profile", { userId: "123" })}/>
  );
};


