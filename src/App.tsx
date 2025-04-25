import AppRouter from "./appRouter";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "@/components/ui/sonner"
import { AuthProvider } from "./context/authContext";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { useEffect } from "react";
import { toast } from "sonner";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity
    }
  }
})


export default function App() {

  useEffect(() => {
    const handleAuthError = (event: Event) => {
      if (event instanceof CustomEvent && event.detail?.message) {
        toast.error(event.detail.message); 
      }
    };
    window.addEventListener('authError', handleAuthError);
    return () => {
      window.removeEventListener('authError', handleAuthError);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={import.meta.env.NODE_ENV !== 'production' ? true : false} />
      <AuthProvider>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Toaster />
          <AppRouter />
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}