  import { ThemeProvider } from "@/shared/lib/theme/ThemeProvider";
import { NavigationProvider } from "./src/app/providers/NavigationProvider";

  export default function App() {
    
    return (
      <ThemeProvider>
        <NavigationProvider />
      </ThemeProvider>
    )
  }