
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ContextProvider as AuthContextProvider } from './context/AuthContext.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'



const queryClient = new QueryClient();
createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>   <AuthContextProvider> <App />   </AuthContextProvider> </QueryClientProvider></BrowserRouter>

)
