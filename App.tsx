import { ThemeProvider } from "@/shared/lib/theme/ThemeProvider";
import { NavigationProvider } from "./src/app/providers/NavigationProvider";

import { GestureHandlerRootView } from 'react-native-gesture-handler';

  export default function App() {
    
    return (
    <GestureHandlerRootView>
      <ThemeProvider>
          <NavigationProvider />
      </ThemeProvider>
    </GestureHandlerRootView>
    )
  }