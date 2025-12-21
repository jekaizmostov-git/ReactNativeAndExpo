import { RootStackParamList } from "@/app/navigation/RootNavigator";
import { OnBoarding } from "@/features/onboarding/OnBoarding";
import { preloadImage } from "@/shared/lib/preloadImage/preloadImage";
import { StackActions } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";


type Props = NativeStackScreenProps<RootStackParamList, 'PreAuth'>

export function PreAuthPage({navigation}:Props){

  function finishHandler(){
    navigation.dispatch(
      StackActions.replace('MainTabs')
    );
  }
  preloadImage([require('@/shared/assets/home/home.png')]);

  return (
    <OnBoarding finishHandler={finishHandler} />
  )
  
}