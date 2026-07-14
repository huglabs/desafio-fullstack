import AppRoutes from "./routes/AppRouter"
import { AuthProvider } from "./contexts/AuthContext"

export default function App(){
  return(
    <AuthProvider>
      <AppRoutes/>
    </AuthProvider>
  )
}

