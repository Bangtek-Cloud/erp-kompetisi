import AppRouter from "./appRouter";
import { ThemeProvider } from "./components/theme-provider";

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AppRouter />
    </ThemeProvider>
  )
}