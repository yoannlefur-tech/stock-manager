import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import Layout from './components/Layout'
import ProfilPage from './pages/ProfilPage'

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/home" element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        } />
        <Route path="/profil" element={
          <PrivateRoute>
            <ProfilPage />
          </PrivateRoute>
        } />
      </Route>
    </Routes>
  )
}

export default App
