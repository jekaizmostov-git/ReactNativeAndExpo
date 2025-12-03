import { RootStackParamList } from "@/app/navigation/RootNavigator";
import { OnBoarding } from "@/features/onboarding/OnBoarding";
import { StackActions } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<RootStackParamList, 'PreAuth'>

export function PreAuthPage({navigation}:Props){

  function finishHandler(){
    navigation.dispatch(
      StackActions.replace('MainTabs')
    );
  }

  return (
    <OnBoarding finishHandler={finishHandler} />
  )
  
}